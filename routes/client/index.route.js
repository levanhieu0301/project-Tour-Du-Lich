const router = require("express").Router()
const homeRouter = require("./home.route")

router.use('/', homeRouter)


module.exports = router;