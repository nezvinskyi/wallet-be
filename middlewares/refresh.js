const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const refreshTokens = (res, req) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid token!' });
      return;
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token!' });
      return;
    };
  }
}

module.exports = {
  refreshTokens,
}