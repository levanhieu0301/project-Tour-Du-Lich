const router = require('express').Router();
const settingController = require('../../controllers/admin/setting.controller');
const multer = require('multer');
const cloudinary = require("../../helpers/cloudinary.helper")
const upload = multer({ storage: cloudinary.storage })


router.get('/list',settingController.list)

router.get('/create-account-admin',settingController.createAccountAdmin)
router.get('/list-account-admin',settingController.listAccountAdmin)
router.get('/create-role',settingController.createRole)
router.get('/list-role',settingController.listRole)
router.get('/website-info',settingController.websiteInfo) 

router.post('/roleCreate',settingController.createRolePost) 
router.get('/edit/:id',settingController.edit)

router.patch('/role/edit/:id', settingController.roleEditPatch)

router.patch(
  '/website-info', 
  upload.fields([
    {
      name:'logo',
      maxCount: 1
    },
    {
      name:'favicon',
      maxCount: 1
    }
  ]),
  settingController.WebsiteInfoPatch)


module.exports = router;