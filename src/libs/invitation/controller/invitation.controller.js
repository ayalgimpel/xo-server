const invitationService = require("../../../services/invitation.service");


const controller = {
    create: async (req, res) => {
        const invitingUser = req.body.invitingUser;
        const toUser = req.body.to;
        // const createdRoom = await roomService.create({ users: [invitingUser, to] });
        // TODO: send event message - invitation
        const ceratedInvitation = await invitationService.create({ invitingUser, toUser });

        res.json(ceratedInvitation)
    },
    cancel: async (req, res) => {
        const invitationId = req.params.invitationId;
        await invitationService.cancel(invitationId);
    },
    accept: async (req, res) => {
        const invitationId = req.params.invitationId;
        const createdGame = await invitationService.acceptAndCreateGame(invitationId);
        res.json(createdGame);
    }
}

module.exports = controller