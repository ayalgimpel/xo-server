//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
    invitingUser: { type: mongoose.Types.ObjectId, ref: 'User' },
    toUser: { type: mongoose.Types.ObjectId, ref: 'User' },
    createdDate: Date
});

InvitationSchema.index({ createdDate: 1 }, { expireAfterSeconds: 1000 * 60 });

// Compile model from schema
const InvitationModel = mongoose.model('Invitation', InvitationSchema);

module.exports = InvitationModel;