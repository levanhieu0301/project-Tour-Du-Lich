const router = require("express").Router()
const homeRouter = require("./home.route")
const tourListRouter = require("./tour.route")
const cartRouter = require("./cart.route")
const contactRouter = require("./contact.route") 
const categoryRouter = require("./category.route")

const searchRoutes = require("./search.route");
const settingMiddleware = require("../../middlewares/client/setting.middleware")  
const categoryMiddleware = require("../../middlewares/client/category.middleware")  

router.use(settingMiddleware.settingInfo)
router.use(categoryMiddleware.categoryList)

router.use('/', homeRouter)
router.use('/tours', tourListRouter)
router.use('/cart', cartRouter)
router.use('/contact', contactRouter)
router.use("/category", categoryRouter)

router.use("/search", searchRoutes)


module.exports = router;