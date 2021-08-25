const jwt = require('jsonwebtoken');
const jwtHelper = require('../../helpers/jwtHelper');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const refreshTokens = async (req, res, next) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
    if (payload.type !== 'refresh') {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid token!'
      });
      return;
    };
    const accessToken = jwtHelper.getAccessToken(user._id);
    await jwtHelper.getRefreshToken();

    res.status(HTTP_STATUS.OK).json({
      status: 'Success',
      code: HTTP_STATUS.OK,
      data: {
        token: accessToken.token,
        rToken: refreshToken.token,
        user: { email: user.email, name: user.name },
      },
    })
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Token expired!'
      });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid token!'
      });
      return;
    };
    next(error);
  }
}

module.exports = refreshTokens;