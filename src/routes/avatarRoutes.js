import { Router } from "express";
import {
  handleDecodeFace,
  handleGetGallery,
  handleGetOptions,
  handleGetRandomFace,
  handleRenderFace,
  handleShuffleFace,
  handleValidateFace,
} from "../controllers/avatarController.js";

const router = Router();

router.get("/options", handleGetOptions);
router.get("/random", handleGetRandomFace);
router.post("/shuffle", handleShuffleFace);
router.get("/gallery", handleGetGallery);
router.post("/validate", handleValidateFace);
router.get("/decode", handleDecodeFace);
router.get("/render", handleRenderFace);
router.get("/render.:ext", handleRenderFace);
router.post("/render", handleRenderFace);

export default router;
