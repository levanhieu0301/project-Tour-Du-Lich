const router = require("express").Router()
const tourListController = require("../../controllers/client/tour.controller")

router.get('/', tourListController.tourList)
router.get('/detail', tourListController.tourDetail)

module.exports = router;