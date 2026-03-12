const router = require('express').Router();
const accountController = require('../../controllers/admin/account.controller');

router.get('/login',accountController.login )
router.get('/forgot-password',accountController.forgotPassword )
router.get('/register',accountController.register )

module.exports = router;