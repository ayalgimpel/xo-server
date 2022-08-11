const gameService = require("../../../services/game.service");

const controller = {
    turn: async (req, res) => {
        const gameId = req.params.gameId;
        const user = req.user;
        const { index } = req.body;
        
        try {
            const updatedGame = await gameService.updateTrun({ index, user, gameId })
            res.json(updatedGame);
        } catch (error) {
            res.json({ error });
        }

    },
}

module.exports = controller