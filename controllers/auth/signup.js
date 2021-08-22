const { user: service } = require('../../services');
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

    // if({ password } !== { confirmPassword }) {
    //   return res.status(HTTP_STATUS.BAD_REQUEST).json({
    //     status: 'Error',
    //     code: HTTP_STATUS.BAD_REQUEST,
    //     message: 'Password and Confirm Password should be same',
    //     data: 'Passwords not match',
    //   });
    // }
    // delete { confirmPassword }

    const newUser = await service.addUser({ email, password, name });
    const { _id } = newUser;

    res.status(HTTP_STATUS.CREATED).json({
      status: 'Success',
      code: HTTP_STATUS.CREATED,
      data: {
        user: { _id, email, name },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
