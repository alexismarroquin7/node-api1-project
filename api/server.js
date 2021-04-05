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


// [POST] - Creates new user
server.post(`/api/users`, async (req, res) => {
    const user = req.body;
    try {
        if(!user.name || !user.bio){
            res.status(400).json({ message: 'Please provide name and bio for the user' });
        } else {
            const newUser = await User.insert(req.body);
            res.status(200).json(newUser);
        }
    } catch {
        res.status(500).json({ message: 'There was an error while saving the user to the database' });
    }
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
