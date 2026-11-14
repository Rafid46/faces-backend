export function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
}

export function errorHandler(err, req, res, next) {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON request body',
      },
    });
  }

  const status = err?.status || 500;
  return res.status(status).json({
    success: false,
    error: {
      code: err?.code || 'INTERNAL_SERVER_ERROR',
      message: err?.message || 'Unexpected server error',
    },
  });
}
