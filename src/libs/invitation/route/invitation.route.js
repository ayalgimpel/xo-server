const express = require('express');
const router = express.Router();
const controller = require("../controller/invitation.controller");
const { authenticateToken } = require('../../../middlewares/auth.middleware');

router.post('/', authenticateToken, controller.create);
router.post('/:invitationId/cancel', authenticateToken, controller.cancel);
router.post('/:invitationId/accept', authenticateToken, controller.accept);

module.exports = router;