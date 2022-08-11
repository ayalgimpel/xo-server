const express = require('express');
const router = express.Router();
const controller = require("../controller/game.controller");
const { authenticateToken } = require('../../../middlewares/auth.middleware');

router.post('/:gameId/turn', authenticateToken, controller.turn);

module.exports = router;