// [SECTION] Dependencies and Modules
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const auth = require("../auth"); 

const { errorHandler } = auth;

// The functions will be placed here

module.exports.registerUser = (req, res) => {
    if (!req.body.email.includes("@")) {
        return res.status(400).send({ message: 'Invalid email format' });
    } else if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password must be atleast 8 characters long' });
    }
    else {
        let newUser = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
            .then((result) => res.status(201).send({
                message: 'User registered successfully'
            }))
            .catch(error => errorHandler(error, req, res));
    }
};

module.exports.loginUser = (req, res) => {
    if (req.body.email.includes("@")) {
        return User.findOne({ email: req.body.email })
            .then(result => {
                if (result == null) {
                    return res.status(404).send({ message: 'No email found' });
                }
                else {
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                    if (isPasswordCorrect) {
                        return res.status(200).send({ 
                            access: auth.createAccessToken(result)
                        })
                    }
                    else {
                        return res.status(401).send({ message: 'Incorrect email or password' });
                    }
                }
            })
            .catch(error => errorHandler(error, req, res));
    }
    else {
        return res.status(400).send({ message: 'Invalid email format' });
    }
};

module.exports.getProfile = (req,res) => {

    // The "return" keyword ensures the end of the getProfile method.
    // Since getProfile is now used as a middleware it should have access to "req.user" if the "verify" method is used before it.
    // Order of middlewares is important. This is because the "getProfile" method is the "next" function to the "verify" method, it receives the updated request with the user id from it.
     return User.findById(req.user.id)
    .then(user => {

        if(!user){
            // if the user has invalid token, send a message 'invalid signature'.
            return res.status(403).send({ message: 'invalid signature' })
        }else {
            // if the user is found, return the user.
            user.password = "";
            return res.status(200).send(user);
        }  
    })
    .catch(error => errorHandler(error, req, res));
};