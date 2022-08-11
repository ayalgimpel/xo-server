const GameModel = require("../libs/game/model/game.model");
const publisher = require('../../src/core/redis');
const eventTypes = require('../../src/enums/event-types');
const _ = require('lodash');
const Symbols = {
    X: 'X',
    O: 'O',
    EMPTY: 'EMPTY'
}

module.exports = {
    getById: async (gameId) => {
        return GameModel.findById(gameId);
    },
    create: async ({ createdBy, users }) => {
        const rndNumber = Math.floor((Math.random() * 2) + 1);
        const userTurn = users[rndNumber - 1];
        const secondUser = users.find(user => user._id !== userTurn);
        const board = [];
        _.forEach(_.range(0, 9), (index) => board.push({ index, symbol: 'EMPTY' }));
        let createdGame = await GameModel.create({
            users,
            symbols: {
                x: userTurn,
                o: secondUser
            },
            userTurn,
            board,
            createdBy,
            createdDate: new Date()
        });
        createdGame = createdGame.toObject();
        const createdGameObject = Object.assign(createdGame, {
            from: createdBy._id,
            to: users.find(user => user._id !== createdBy._id)
        })

        publisher.publish(eventTypes.ON_GAME_CREATED, createdGameObject);
        return createdGame;
    },
    updateTrun: async ({ index, user, gameId }) => {

        try {



            let game = await GameModel.findById(gameId);
            const symbol = _getSymbol({ userId: user.userId, symbols: game.symbols });
            const slot = game.board.find(slot => slot.index === index);

            if (slot.symbol !== 'EMPTY')
                throw new Error('slot not empty');

            slot.symbol = symbol;
            game.userTurn = _changeTurn({ userId: user.userId, users: game.users });
            let updatedGame = await game.save();

            updatedGame = updatedGame.toObject();

            let updatedGameObject = Object.assign(updatedGame, {
                from: game.userTurn,
                to: user.userId
            });

            const result = _checkWinner({ board: game.board, userTurn: user.userId, symbol });

            if (result !== null) {
                game.winner = result.winner;
                game.userTurn = undefined;
                game.gameEndedDate = new Date();
                updatedGameObject = Object.assign(updatedGameObject, { winner: result.winner, userTurn: undefined });
                updatedGame = await game.save();

                publisher.publish(eventTypes.ON_GAME_UPDATED, updatedGameObject);
                publisher.publish(eventTypes.ON_GAME_ENDED, updatedGameObject);
                return updatedGame;
            }
            else {

                publisher.publish(eventTypes.ON_GAME_UPDATED, updatedGameObject);
                return updatedGame;
            }
        } catch (error) {
            console.log(error);
        }

    }
}

function _getSymbol({ userId, symbols }) {
    return symbols.x.toString() === userId ? 'X' : 'O';
}

function _changeTurn({ userId, users }) {
    let aarr = users.find(user => user._id.toString() !== userId);
    return aarr;
}

function _checkWinner({ board, userTurn, symbol }) {

    const hasWinner = _checkPath(0, 1, 2, board)
        || _checkPath(3, 4, 5, board)
        || _checkPath(6, 7, 8, board)
        || _checkPath(0, 3, 6, board)
        || _checkPath(1, 4, 7, board)
        || _checkPath(2, 5, 8, board)
        || _checkPath(0, 4, 8, board)
        || _checkPath(2, 4, 6, board)

    if (hasWinner)
        return {
            winner: userTurn,
            symbol,
        };

    if (board.every(item => item.symbol != Symbols.EMPTY))
        return {
            winner: undefined,
            symbol
        };

    return null;
}

function _checkPath(index1, index2, index3, array) {
    if (array[index1].symbol == array[index2].symbol
        && array[index1].symbol == array[index3].symbol
        && array[index1].symbol != Symbols.EMPTY) {
        return true;
    }
    // else if (array.every(item => item.index != Symbols.EMPTY)) {
    //     return true;
    // }
    return false;
}
