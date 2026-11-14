import {
  createRandomAvatar,
  decodeCharacter,
  getCatalog,
  getGallery,
  renderFace,
  validateCharacter,
} from "../services/avatarService.js";
import {
  parseGalleryQuery,
  parseRandomQuery,
  parseRenderRequest,
} from "../schemas/avatarSchema.js";

export function handleGetOptions(req, res) {
  return res.status(200).json({
    success: true,
    data: getCatalog(),
  });
}

export function handleGetRandomFace(req, res) {
  const { gender, locked, seed } = parseRandomQuery(req.query);
  const result = createRandomAvatar({ gender, locked, seed });

  return res.status(200).json({
    success: true,
    data: result,
  });
}

export function handleShuffleFace(req, res) {
  const { gender, locked, seed } = parseRandomQuery(req.query);
  const bodyLocked = Array.isArray(req.body?.locked) ? req.body.locked : locked;
  const bodySeed = typeof req.body?.seed === "string" ? req.body.seed : seed;
  const bodyGender = req.body?.gender ?? gender;

  const result = createRandomAvatar({
    gender: bodyGender,
    locked: bodyLocked,
    seed: bodySeed,
    base: req.body?.character,
  });

  return res.status(200).json({
    success: true,
    data: result,
  });
}

export function handleValidateFace(req, res) {
  const result = validateCharacter(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_CHARACTER",
        message: "Character validation failed",
        details: result.errors,
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      character: result.data,
    },
  });
}

export function handleDecodeFace(req, res) {
  const encoded = req.query.data ?? req.body?.data;
  if (typeof encoded !== "string" || encoded.trim() === "") {
    return res.status(400).json({
      success: false,
      error: {
        code: "MISSING_DATA",
        message: 'Query parameter or body field "data" is required',
      },
    });
  }

  const result = decodeCharacter(encoded);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_ENCODED_CHARACTER",
        message: "Could not decode character payload",
        details: result.errors,
      },
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      character: result.data,
    },
  });
}

export function handleGetGallery(req, res) {
  const query = parseGalleryQuery(req.query);
  const result = getGallery(query);

  return res.status(200).json({
    success: true,
    data: result,
  });
}

export async function handleRenderFace(req, res, next) {
  try {
    const parsed = parseRenderRequest(req);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error,
      });
    }

    const result = await renderFace(parsed.data);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    const { buffer, contentType, ext } = result.data;
    const disposition = parsed.data.download ? "attachment" : "inline";
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `${disposition}; filename="sugary-face.${ext}"`
    );
    return res.status(200).send(buffer);
  } catch (err) {
    return next(err);
  }
}
