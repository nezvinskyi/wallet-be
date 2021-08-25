const moment = require('moment');
const jwtHelper = require('../../helpers/jwtHelper')
const { user: service } = require('../../services');
const { sessions: sesService } = require('../../services')
const HTTP_STATUS = require('../../helpers/httpStatusCodes');

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log('{ name, email, password, confirmPassword } :>> ', { name, email, password, confirmPassword });
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

    const accessToken = jwtHelper.getAccessToken(user._id);
    const refreshToken = jwtHelper.getRefreshToken();

    const newUser = await service.addUser({ email, password, name });
    // await service.updateById(payload.id, { token });
    const { _id } = newUser;

    await sesService.addOne({
      userId: user._id,
      loginTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD'),
      tokenId: refreshToken.id,
      usedToken: refreshToken.token,
    });

    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        token: accessToken.token,
        rToken: refreshToken.token,
        user: { _id, email, name },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
