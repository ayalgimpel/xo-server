const messageModel = require("../libs/messages/model/message.model");
const publisher = require('../../src/core/redis');
const eventTypes = require('../../src/enums/event-types');

module.exports = {
    getAll: async ({ to, from }) => {
        return messageModel.find({ from, to });
    },
    create: async ({ content, from, to }) => {
        const createdMessage = await messageModel.create({ content, from, to, createdDate: new Date() });
        publisher.publish(eventTypes.ON_MESSAGE_CREATED, createdMessage);
    }
}