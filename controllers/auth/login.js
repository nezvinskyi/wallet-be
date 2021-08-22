const jwt = require('jsonwebtoken');
require('dotenv').config();
const { user: service } = require('../../services');
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
    const { JWT_SECRET } = process.env;
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    await service.updateById(payload.id, { token });

    res.status(HTTP_STATUS.OK).json({
      status: 'Success',
      code: HTTP_STATUS.OK,
      data: {
        token,
        user: { email: user.email, name: user.name },
      },
    })
  } catch (error) {
    next(error)
  }
};

module.exports = login;