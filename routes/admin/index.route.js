const router = require('express').Router();
const accountLoginRoute = require('./account.route');
const dashboardRoute = require('./dashboard.route');
const categoryRoute = require('./category.route');
const toursRoute = require('./tour.route');
const oderRoute = require('./oder.route');
const userRoute = require('./user.route');
const contactRoute = require('./contact.route');
const errorRoute = require('./error.route')
const settingRoute = require('./setting.route');

router.use('/account', accountLoginRoute);
router.use('/dashboard', dashboardRoute);
router.use('/category', categoryRoute);
router.use('/tours', toursRoute);
router.use('/oder', oderRoute);
router.use('/user', userRoute);
router.use('/contact', contactRoute);
router.use('/error', errorRoute);
router.use('/setting', settingRoute);

module.exports = router;