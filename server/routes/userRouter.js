const router = require('express').Router();

const userCtrl = require('../controllers/userController');

router.post('/register', userCtrl.register);
router.get('/refresh_token', userCtrl.refreshToken);
router.post('/login', userCtrl.login);

module.exports = router;
