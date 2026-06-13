const router = require('express').Router();
const accountLoginRoute = require('./account.route');
const dashboardRoute = require('./dashboard.route');
const categoryRoute = require('./category.route');
const toursRoute = require('./tour.route');
const orderRoute = require('./order.route');
const userRoute = require('./user.route');
const infoRoute = require('./info.route');
const contactRoute = require('./contact.route');
const settingRoute = require('./setting.route');
const uploadRoute = require('./upload.route');
const authMiddleware = require('../../middlewares/auth.middlewares');

router.use('/account', accountLoginRoute);
router.use('/dashboard',authMiddleware.verifyToken, dashboardRoute);
router.use('/category',authMiddleware.verifyToken, categoryRoute);
router.use('/tours',authMiddleware.verifyToken, toursRoute);
router.use('/order',authMiddleware.verifyToken, orderRoute);
router.use('/user',authMiddleware.verifyToken, userRoute);
router.use('/info',authMiddleware.verifyToken, infoRoute);
router.use('/contact',authMiddleware.verifyToken, contactRoute);
router.use('/setting',authMiddleware.verifyToken, settingRoute); 
router.use('/upload', authMiddleware.verifyToken, uploadRoute);


// router.get('/*', (req, res) => {
//     res.render('admin/pages/Error', {
//       pageTitle: "404 Not Found",
//     })
// })

router.use(authMiddleware.verifyToken, (req, res) => {
  res.status(404).render('admin/pages/Error', {
    pageTitle: "404 Not Found",
  });
});

module.exports = router;