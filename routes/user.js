const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User Registered' });
        }
    })
});
// Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });

            } else {
                return res.json({ success: false, msg: 'Invalid Password' });
            }
        })
    })
});
// Get All Users
router.get('/user', exports.findAll = (req, res) => {
    User.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
});


// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user })
});


router.put('/deleteUser', (req, res) => {
    User.DeleteUser(req.body, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        } else {
            return res.json({ success: true, msg: 'User found' });
        }
    })
})

// Update a User based on ID
router.put('/updateUser', (req, res) => {
    User.updateUserById(req.body, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        if (user) {
            return res.json({ success: true, msg: 'User Found' })
        }
    })
})

module.exports = router;