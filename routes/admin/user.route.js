const router = require('express').Router();
const userController = require('../../controllers/admin/user.controller');

router.get('/list',userController.list)
router.get('/changePassword',userController.changePassword)
router.get('/edit',userController.edit)

router.patch('/change-password', userController.changePasswordPatch)


module.exports = router; 