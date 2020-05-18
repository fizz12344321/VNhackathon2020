const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require("../models/user");

exports.signup = async (req,res) => {
    const userExists = await User.findOne({ email: req.body.mail})
    if(userExists)
         return res.status(403).json({
            error: "Email is taken"
         });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ user });     
}

exports.signin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email},(err, user) => {
        //If err or no user 
        if(err || !user){
            return res.status(401).json({
                error: "User with that email does not exist."
            })
        }

        // create authenticate method
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password not match"
            })
        }

        // generate token voi user idd and secret 
        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET)
        // t in cookie expiry date 
        res.cookie("t",token, {expire: new Date() + 9999})

        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success !"});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:"auth"
})