const router = require('express').Router();
const uploadController = require('../../controllers/admin/upload.controller');
const multer = require('multer');
const cloudinary = require("../../helpers/cloudinary.helper")
const upload = multer({ storage: cloudinary.storage })


router.post('/image', upload.single('file'), uploadController.upload);

module.exports = router;