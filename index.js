const express = require('express');
const server = express();
const PORT = 8000;
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const cors = require('cors');

server.use(express.json());
server.use(cors());

const authenticate = async (req, res, next) => {
    const credentials = req.body;
    console.log(credentials);
    const foundUser = await db('users').where('username', credentials.username).first();
    const userHash = foundUser.password;
    req.session.validated = bcrypt.compareSync(credentials.password, userHash);
    next();
  };

server.get('/api/users', (req, res) => {
    const users = db('users')
    .then(response => {
        res.status(500).json(response);
    }).catch(error => {
        res.status(500).json(`${error}`);
    });

});
  
server.listen(PORT, () => console.log(`App is listening on ${PORT}`))