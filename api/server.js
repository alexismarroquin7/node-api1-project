// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

server.use(express.json());

const User = require('./users/model.js');


// [GET] user by id
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        } else {
            res.status(200).json(user);
        }
    } catch {
        res.status(500).json({ message: 'The user information could not be retrieved' });
    }
});


// [GET] All users
server.get(`/api/users`, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch {
        res.status(500).json({ message: "The users information could not be retrieved" });
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
