const moment = require('moment');
const { user: service } = require('../../services');
const { sessions: sesService } = require('../../services')
const jwtHelper = require('../../helpers/jwtHelper');
const HTTP_STATUS = require('../../helpers/httpStatusCodes');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email })
    if (!user || !user.comparePassword(password)) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: 'Error',
        code: HTTP_STATUS.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    };
    // const { JWT_SECRET } = process.env;
    // const payload = {
    //   id: user._id,
    //   type: 'acces',
    //   iat: Math.floor(Date.now() / 1000),
    // };

    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2m' });

    const accessToken = jwtHelper.getAccessToken(user._id)
    const refreshToken = jwtHelper.getRefreshToken()

    // await service.updateById(accessToken.id, { token: accessToken.token });

    await sesService.addOne({
      userId: user._id,
      loginTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD'),
      tokenId: refreshToken.id,
      usedToken: refreshToken.token,
    });

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
    next(error)
  }
};

module.exports = login;