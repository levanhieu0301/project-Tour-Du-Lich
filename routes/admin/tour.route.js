const multer = require('multer');
const router = require('express').Router();
const toursController = require('../../controllers/admin/tour.controller');
const cloudinary = require("../../helpers/cloudinary.helper")
const categoryValidate =  require("../../validates/category.validate")
const upload = multer({ storage: cloudinary.storage })
const tourValidate = require("../../validates/tour.validate")



router.get('/list',toursController.list)
router.get('/create',toursController.create)
router.get('/trash',toursController.trash)
router.post("/create",upload.single('avatar'),tourValidate.createPost,toursController.createPost)
router.patch("/change-multi",toursController.changeMulti)
router.get("/edit/:id",toursController.edit)
router.patch("/edit/:id",upload.single('avatar'),tourValidate.createPost,toursController.editPatch)
router.patch("/delete/:id",toursController.deletePatch)
router.patch("/undo/:id",toursController.undoPatch)
router.patch('/delete-destroy/:id', toursController.deleteDestroyPatch)


module.exports = router;