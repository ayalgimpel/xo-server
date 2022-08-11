//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: String,
    createdDate: Date,
    from: { type: mongoose.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Types.ObjectId, ref: 'User' },
});

// Compile model from schema
const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;