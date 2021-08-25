const passport = require('passport');
const HTTP_STATUS = require('../helpers/httpStatusCodes');

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const token = req.get('Authorization');
    console.log('token bearer :>>', token)
    if (error || !user || !token/* !user.token */) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: 'Error',
        code: HTTP_STATUS.UNAUTHORIZED,
        message: 'Not authorized',
      })
      return
    };
    req.user = user
    next()
  })(req, res, next);
};

module.exports = authMiddleware;