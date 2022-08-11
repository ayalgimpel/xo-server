//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    status: {
        type: String,
        enum: ['active', 'pending', 'close'],
        default: 'close'
    },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    createdDate: Date
});

// Compile model from schema
const RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;