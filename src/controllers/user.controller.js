const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res) => {
    
    try {
        const userName = await User.findOne({ username: req.body.username });
        const userEmail = await User.findOne({ email: req.body.email });

        if (userName) {
            return res.status(400).json({ message: 'username is taken!' });
        }

        if (userEmail) {
            return res.status(400).json({ message: 'user already exist!' });
        } 

        const {firstName, lastName, username, email, phone, password, role} = req.body;

        const newUser = new User({
            firstName, lastName, username, email, phone, password, role
        });

        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            return res.status(201).json({ user });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const authUser = (req, res) => {
    try {
        User.findOne({email: req.body.email})
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({ message: 'user not found!' });
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({id: user._id}, process.env.JWT_SCRT_KEY, {expiresIn: '30d'});
                    const {_id, firstName, lastName, username, email, phone, password, role} = user;
                    res.status(200).json({token, user: {_id, firstName, lastName, username, email, phone, password, role}});
                } else {
                    return res.status(400).json({message: 'Invalid password!'});
                }
            }
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { createUser, authUser };