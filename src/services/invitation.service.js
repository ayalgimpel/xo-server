const InvitationModel = require("../libs/invitation/model/invitation.model");
const publisher = require('../../src/core/redis');
const eventTypes = require('../../src/enums/event-types');
const gameService = require('../services/game.service');

module.exports = {
    create: async ({ invitingUser, toUser }) => {
        const ceratedInvitation = await InvitationModel.create({ invitingUser, toUser, createdDate: new Date() });
        const eventData = {
            _id: ceratedInvitation._id,
            from: ceratedInvitation.invitingUser,
            to: ceratedInvitation.toUser,
            createdDate: ceratedInvitation.createdDate
        };

        publisher.publish(eventTypes.ON_INVITATION_CREATED, eventData);

        return ceratedInvitation;
    },
    cancel: async (invitationId) => {
        await InvitationModel.remove({ _id: invitationId });
    },
    acceptAndCreateGame: async (invitationId) => {
        const invitation = await InvitationModel.findById(invitationId);
        const users = [invitation.invitingUser, invitation.toUser];
        const createdGame = await gameService.create({
            users,
            createdBy: invitation.invitingUser
        });

        await InvitationModel.remove({ _id: invitationId });
        return createdGame;
    }
}