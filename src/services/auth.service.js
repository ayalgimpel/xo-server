const RefreshTokenModel = require("../libs/auth/model/refresh-token.model");
const UserModel = require("../libs/user/model/user.model");

module.exports = {
    login: async ({ email, password }) => {
        const foundUser = await UserModel.findOne({ email });
        if (foundUser === null)
            throw new Error("User not found.");

        const isValid = foundUser.validPassword(password);
        if (!isValid)
            throw new Error("Wrong Password");

        return foundUser;
    },
    checkRefreshToken: async (refreshToken) => {
        if (refreshToken === null)
            throw new Error("Missing token");

        const foundRefreshToken = await RefreshTokenModel.findOne({ refreshToken });
        if (foundRefreshToken === null)
            throw new Error("Not found token");

        return foundRefreshToken;
    },
    createRefreshToken: async (user, refreshToken) => {
        return RefreshTokenModel.create({ user, refreshToken, createdDate: new Date() });
    }
}