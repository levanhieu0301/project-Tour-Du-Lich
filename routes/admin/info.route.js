const router = require('express').Router();
const infoController = require('../../controllers/admin/info.controller');

const multer  = require('multer');

const cloudinaryHelper = require("../../helpers/cloudinary.helper");

const upload = multer({ storage: cloudinaryHelper.storage });
router.get('/edit',infoController.edit)

router.patch('/edit', upload.single('avatar'), infoController.editPatch)


module.exports = router; 