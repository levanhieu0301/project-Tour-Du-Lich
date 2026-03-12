const router = require('express').Router();
const settingController = require('../../controllers/admin/setting.controller');

router.get('/list',settingController.list)

router.get('/create-account-admin',settingController.createAccountAdmin)
router.get('/list-account-admin',settingController.listAccountAdmin)
router.get('/create-role',settingController.createRole)
router.get('/list-role',settingController.listRole)
router.get('/website-info',settingController.websiteInfo)


module.exports = router;