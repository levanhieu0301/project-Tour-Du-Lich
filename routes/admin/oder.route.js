const router = require('express').Router();
const oderController = require('../../controllers/admin/oder.controller');

router.get('/list',oderController.list)
router.get('/edit',oderController.edit)


module.exports = router;