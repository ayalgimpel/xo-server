const service = require("../../../services/user.service");

const controller = {
    getAll: async (req, res) => {
        const users = await service.getAll();
        res.json(users)
    },
    create: async (req, res) => {
        const createdUser = await service.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        res.json(createdUser)
    },
    remove: async (req, res) => {
        const userId = req.params.userId;
        const deletedUser = await service.removeById(userId);

        res.json(deletedUser)
    }
}

module.exports = controller