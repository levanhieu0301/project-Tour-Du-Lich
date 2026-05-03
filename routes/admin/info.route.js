const router = require('express').Router();
const infoController = require('../../controllers/admin/info.controller');


router.get('/edit',infoController.edit)


module.exports = router; 