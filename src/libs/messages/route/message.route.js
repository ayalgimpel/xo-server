const express = require('express');
const router = express.Router();
const controller = require("../controller/message.controller");
const { authenticateToken } = require('../../../middlewares/auth.middleware');

router.get('/:from', authenticateToken, controller.getAll);
router.post('/', authenticateToken, controller.create);


module.exports = router;