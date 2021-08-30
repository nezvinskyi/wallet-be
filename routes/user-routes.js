const { Router } = require('express');
const router = Router();
const { authMiddleware, validateMiddleware, authRefreshMiddleware } = require('../middlewares');
const { registrationSchema, loginSchema } = require('../utils/validate');

const { user: ctrl } = require('../controllers');

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *    description: Use for user registration
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/signup', validateMiddleware(registrationSchema), ctrl.signup);

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    description: Use to login user
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', validateMiddleware(loginSchema), ctrl.login);

/**
 * @swagger
 * /api/v1/users/logout:
 *  get:
 *    description: Use to logout user
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/logout', authMiddleware, ctrl.logout);

/**
 * @swagger
 * /api/v1/users/current:
 *  get:
 *    description: Use to get current user information
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/current', authMiddleware, ctrl.getCurrentUser);

/**
 * @swagger
 * /api/v1/users:
 *  patch:
 *    description: Use to update user information (name)
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.patch('/', authMiddleware, ctrl.updateName);

/**
 * @swagger
 * /api/v1/users/refresh:
 *  patch:
 *    description: Use to update jwt tokens
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/refresh', authRefreshMiddleware, ctrl.refreshTokens);

module.exports = router;
