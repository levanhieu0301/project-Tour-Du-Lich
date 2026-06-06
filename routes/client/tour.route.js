const router = require("express").Router()
const tourListController = require("../../controllers/client/tour.controller")

router.get('/detail/:slug', tourListController.tourDetail)

module.exports = router;