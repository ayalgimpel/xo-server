const express = require('express');
const router = express.Router();
const controller = require("../controller/auth.controller");
const { authenticateToken } = require('../../../middlewares/auth.middleware');

router.post('/login', controller.login);
router.post('/token', controller.auth);
router.post('/validate', controller.validateToken);
router.get('/me', authenticateToken, controller.me);


module.exports = router;