const router = require('express').Router();
const toursController = require('../../controllers/admin/tour.controller');


router.get('/list',toursController.list)
router.get('/create',toursController.create)
router.get('/trash',toursController.trash)

module.exports = router;