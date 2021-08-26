const moment = require('moment');
const { user: service } = require('../../services');
const { sessions: sesService } = require('../../services');
const jwtHelper = require('../../helpers/jwtHelper');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email :>> ', email);
  console.log('password  :>> ', password);
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      // res.status(HTTP_STATUS.UNAUTHORIZED).json({
      //   status: 'Error',
      //   code: HTTP_STATUS.UNAUTHORIZED,
      //   message: 'Email or password is wrong',
      // });
      res.status(401);
      throw new Error('Email or password is wrong');
    }

    const accessToken = jwtHelper.getAccessToken(user._id);
    const refreshToken = jwtHelper.getRefreshToken();

    console.log('userId:>>', user._id)

    // ===  start black list, add record of session  !!!!!!!!
    await sesService.addOne({
      userId: user._id,
      loginTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD'),
      tokenId: refreshToken.id,
      usedToken: refreshToken.token,
      accessToken: accessToken.token,
    });

    res.status(HTTP_STATUS.OK).json({
      status: 'Success',
      code: HTTP_STATUS.OK,
      data: {
        token: accessToken.token,
        rToken: refreshToken.token,
        user: { email: user.email, name: user.name },
      },
    });
  } catch (error) {
    next(error);
    // res.status(error);
  }
};

module.exports = login;