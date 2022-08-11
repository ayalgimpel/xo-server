const express = require('express');
const router = express.Router();
const controller = require("../controller/user.controller");
const { authenticateToken } = require('../../../middlewares/auth.middleware');

router.get('/', authenticateToken, controller.getAll);
router.post('/', controller.create);
router.delete('/:userId', controller.remove);

module.exports = router;