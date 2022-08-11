const messageService = require("../../../services/message.service");

const controller = {
    getAll: async (req, res) => {
        const user = req.user;
        const from = req.params.from;
        const messagesToMe = await messageService.getAll({ to: user.userId, from: from });
        const messagesFromMe = await messageService.getAll({ to: from, from: user.userId });
        res.json([].concat(messagesFromMe, messagesToMe).sort(message => message.createdDate));
    },
    create: async (req, res) => {
        const { content, to } = req.body;
        const user = req.user;
        const createdMessage = await messageService.create({ content, to, from: user.userId });
        res.json(createdMessage);
    }
}

module.exports = controller