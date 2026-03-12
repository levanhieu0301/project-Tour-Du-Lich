const router = require('express').Router();
const errorController = require('../../controllers/admin/error.controller');

router.get('/',errorController.error)


module.exports = router;