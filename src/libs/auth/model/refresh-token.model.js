//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    refreshToken: String,
    createdDate: Date
});

// Compile model from schema
const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshTokenModel;