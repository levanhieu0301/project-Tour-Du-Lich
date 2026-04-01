const router = require('express').Router();
const categoryController = require('../../controllers/admin/category.controller');
const multer = require('multer');
const cloudinary = require("../../helpers/cloudinary.helper")
const categoryValidate =  require("../../validates/category.validate")
const upload = multer({ storage: cloudinary.storage })

router.get('/list',categoryController.list)
router.get('/create',categoryController.create)
router.post('/create', upload.single('avatar'),categoryValidate.categoryValidate ,categoryController.createPost)
router.get('/edit/:id',categoryController.edit)
router.patch('/edit/:id', upload.single('avatar'), categoryValidate.categoryValidate, categoryController.editPatch)

module.exports = router; 