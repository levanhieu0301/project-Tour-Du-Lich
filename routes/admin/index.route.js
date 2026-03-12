const router = require('express').Router();
const accountLoginRoute = require('./account.route');

router.use('/account', accountLoginRoute);

module.exports = router;