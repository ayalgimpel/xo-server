const service = require("../../../services/room.service");

const controller = {
    create: async (req, res) => {
        const createdRoom = await service.create({
       
        });

        res.json(createdRoom)
    }
}

module.exports = controller