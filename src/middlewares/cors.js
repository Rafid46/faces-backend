export function corsMiddleware(req, res, next) {
  const configured =
    process.env.CORS_ORIGIN ||
    (process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN_PROD
      : process.env.CORS_ORIGIN_DEV) ||
    '*';
  const requestOrigin = req.headers.origin;

  if (configured === '*') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    const allowed = configured.split(',').map((item) => item.trim());
    if (requestOrigin && allowed.includes(requestOrigin)) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      res.setHeader('Vary', 'Origin');
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
}
