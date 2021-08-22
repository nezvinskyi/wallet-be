const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth');

const { user: ctrl } = require('../controllers');

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *    description: Use for user registration
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/signup', ctrl.signup);

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    description: Use to login user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', ctrl.login);

/**
 * @swagger
 * /api/v1/users/logout:
 *  get:
 *    description: Use to logout user
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
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/current', authMiddleware, ctrl.getCurrentUser);

/**
 * @swagger
 * /api/v1/users:
 *  patch:
 *    description: Use to update user information (name, password, email)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.patch('/', authMiddleware, ctrl.updateName);

module.exports = router;
