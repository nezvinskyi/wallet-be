const moment = require('moment');
const jwtHelper = require('../../helpers/jwtHelper');
const { user: service } = require('../../services');
const { sessions: sesService } = require('../../services');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await service.getOne({ email });

    if (user) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'Error',
        code: HTTP_STATUS.CONFLICT,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }

    const newUser = await service.addUser({ email, password, name });
    const { _id, avatarURL } = newUser;

    const accessToken = jwtHelper.getAccessToken(_id);
    const refreshToken = jwtHelper.getRefreshToken();

    // ===  add record of session ===
    await sesService.addOne({
      // userId: newUser._id,
      loginTime: moment(new Date()).format('HH-mm-ss, YYYY-MM-DD'),
      tokenId: refreshToken.id,
      usedToken: refreshToken.token,
      accessToken: accessToken.token,
    });

    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        token: accessToken.token,
        rToken: refreshToken.token,
        user: { _id, email, name, avatarURL },
      },
    });
  } catch (error) {
    console.log(error.response || error);
    next(error);
  }
};

module.exports = signup;
