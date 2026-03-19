const router = require('express').Router();
const accountController = require('../../controllers/admin/account.controller');
const validate = require('../../validates/account.validate');
const authMiddleware = require('../../middlewares/auth.middlewares');

router.get('/login',accountController.login )
router.post('/logout',accountController.logoutPost )
router.post('/login', validate.loginPostValidate, accountController.loginPost)
router.get('/forgot-password',accountController.forgotPassword )
router.post('/forgot-password',validate.forgotPasswordPostValidate, accountController.forgotPasswordPost)
router.get('/register',accountController.register )
router.post('/register', validate.registerPostValidate, accountController.registerPost)
router.get('/otp-password',accountController.otpPassword )
router.post('/otp-password',accountController.otpPasswordPost)

router.get('/reset-password',accountController.resetPassword)
router.post('/reset-password',authMiddleware.verifyToken, accountController.resetPasswordPost)

module.exports = router;