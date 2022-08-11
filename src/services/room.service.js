const roomModel = require("../libs/room/model/room.model");

module.exports = {
    create: async ({ users }) => {
        return roomModel.create({ users, createdDate: new Date(), status: 'pending' });
    }
}