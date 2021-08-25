const jwt = require('jsonwebtoken');
const { user: service } = require('../../services');
const jwtHelper = require('../../helpers/jwtHelper');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const refreshTokens = async (req, res, next) => {
  const { email } = req.body;
  const user = await service.getOne({ email })
  const refreshToken = req.get('Authorization');
  console.log(refreshToken)
  try {
    const payload = jwt.verify(refreshToken.replace(/^Bearer\s+/, ""), JWT_SECRET);
    console.log(payload)
    console.log(payload.type)
    if (!refreshToken || payload.type !== 'refresh') {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid token!'
      });
      return;
    };
    const accessToken = jwtHelper.getAccessToken(user._id);

    console.log(accessToken)
    res.status(HTTP_STATUS.OK).json({
      status: 'Success',
      code: HTTP_STATUS.OK,
      data: {
        token: accessToken.token,
        rToken: await jwtHelper.getRefreshToken().token,
        user: { email: user.email, name: user.name },
      },
    })
  } catch (error) {
    next(error);
  }
}

module.exports = refreshTokens;