const moment = require('moment');
const jwt = require('jsonwebtoken');
const { user: service } = require('../../services');
const { sessions: sesService } = require('../../services');
const jwtHelper = require('../../helpers/jwtHelper');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');
const sessionEnd = require('../../helpers/sessionEndHelper');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const refreshTokens = async (req, res, next) => {
  const { email } = req.body;
  const user = await service.getOne({ email })
  const token = req.get('Authorization').replace(/^Bearer\s+/, "");

  await sessionEnd(token);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!token || payload.type !== 'refresh') {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: 'Missing or invalid token!'
      });
      return;
    };


    const accessToken = jwtHelper.getAccessToken(user._id);

    // === record new session ===
    await sesService.addOne({
      userId: user._id,
      loginTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD'),
      tokenId: await jwtHelper.getRefreshToken().id,
      usedToken: await jwtHelper.getRefreshToken().token,
      accessToken: accessToken.token,
    });

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