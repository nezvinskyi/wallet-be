const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth');

const { user: ctrl } = require('../controllers')

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.get('/logout', authMiddleware, ctrl.logout);
router.get('/current', authMiddleware, ctrl.getCurrentUser);
router.patch('/', authMiddleware, ctrl.updateName);

module.exports = router;