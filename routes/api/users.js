const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')

// Import User schema
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users work"}));

// Register a new user
router.post('/register', (req, res) => {
    // Check to see if there is a registered email
    User.findOne({ email: req.body.email })
        .then(user => {
            // If there is a user, return `Email exists`
            if(user) {
                return res.status(400).json({email: 'Email already exists'})
            } 
            // Else, register new user
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash
                        
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        });
});

// Login user and return JWT token
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Check to see if there is a registered email
    User.findOne({email})
        .then(user => {
            // If email is not registered, return `User not found`
            if(!user) {
                return res.status(404).json({email: 'User not found'})
            }
            // Else, decrypt password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // If password matches, return and sign token
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        jwt.sign(payload, keys.key, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } 
                    // Else, return `Incorrect password`
                    else {
                        return res.status(400).json({password: 'Incorrect password'});
                    }
                });
        });
});

module.exports = router;