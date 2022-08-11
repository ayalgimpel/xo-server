
const jwt = require('jsonwebtoken');
const authService = require('../../../services/auth.service');
const userService = require('../../../services/user.service');
const _ = require('lodash');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 2 });
}

const controller = {
    login: async (req, res) => {

        try {
            console.log(req.body);
            const { email, password } = req.body;
            const loggedInUser = await authService.login({ email, password });
            const jwtuser = { email: loggedInUser.email, userId: loggedInUser._id };

            const accessToken = generateAccessToken(jwtuser);
            const refreshToken = jwt.sign(jwtuser, process.env.REFRESH_TOKEN_SECRET);

            await authService.createRefreshToken(jwtuser.userId, refreshToken);

            res.json({ accessToken, refreshToken });

        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    },
    auth: async (req, res) => {
        const refreshToken = req.body.token;
        const foundRefreshToken = await authService.checkRefreshToken(refreshToken);
        jwt.verify(foundRefreshToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            const jwtuser = { email: user.email, user: user._id };
            const accessToken = generateAccessToken(jwtuser);
            res.json({ accessToken });
        })
    },
    validateToken: async (req, res) => {
        const accessToken = req.body.token;

    },
    me: async (req, res) => {
        const { userId } = req.user;
        const user = await userService.getById(userId);
        res.json(_.pick(user, ['createdDate', 'name', 'email', '_id']));
    }
}

module.exports = controller