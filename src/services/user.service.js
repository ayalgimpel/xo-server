const db = require("../db-connent");
const _ = require('lodash');
const UserModel = require("../libs/user/model/user.model");

module.exports = {
    getAll: async () => {
        const users = await UserModel.find().exec();
        return users.map(user => _.pick(user, ['createdDate', 'name', 'email', '_id']))
    },
    create: async ({ name, email, password }) => {

        let newUser = new UserModel();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.createdDate = new Date()

        // Call setPassword function to hash password 
        newUser.setPassword(password);
        const createdUser = await newUser.save();
        return createdUser;
    },
    removeById: async (userId) => {
        return UserModel.remove({ _id: userId });
    },
    getById: async (userId) => {
        return UserModel.findOne({ _id: userId });
    }
}