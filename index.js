require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors');

const db = require("./src/db-connent");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const path = require('path');
//console.log(require('dotenv').config({path: path.resolve(__dirname, '.env')}));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/users', require('./src/libs/user'));
app.use('/invitations', require('./src/libs/invitation'));
app.use('/auth', require('./src/libs/auth'));
app.use('/message', require('./src/libs/messages'));
app.use('/games', require('./src/libs/game'));

app.listen(port, () => {
    console.log(`Server is up and running on http://localhost:${port} ...`);
});