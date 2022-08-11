//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    board: [{
        index: String,
        symbol: {
            type: String,
            enum: ['X', 'O', 'EMPTY'],
            default: 'EMPTY'
        }
    }],
    symbols: {
        x: { type: mongoose.Types.ObjectId, ref: 'User' },
        o: { type: mongoose.Types.ObjectId, ref: 'User' }
    },
    userTurn: { type: mongoose.Types.ObjectId, ref: 'User' },
    winner: { type: mongoose.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    createdDate: Date,
    gameEndedDate: Date
});

// Compile model from schema
const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;