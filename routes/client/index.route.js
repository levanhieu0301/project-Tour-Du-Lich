const router = require("express").Router()
const homeRouter = require("./home.route")
const tourListRouter = require("./tour.route")
const cartRouter = require("./cart.route") 


router.use('/', homeRouter)
router.use('/tours', tourListRouter)
router.use('/cart', cartRouter)


module.exports = router;