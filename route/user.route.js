const express = require("express");
const UserModel = require('../model/user.model')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRouter = express.Router();

UserRouter.post('/register', async (req, res)=>{
    const {name, email, password,gender, age} = req.body;
    
    try {
        const reg_user = await UserModel.find({email});    //this reg_user for finding that the user is already registered to avoid repeatative registrations.
        if(reg_user.length !== 0){
            return res.send(`User has already registered..! `);
        }else{
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                return res.send(`Internal server error..${err}`);
            }
            const user = new UserModel({
                name,
                email,
                password:hash,
                gender,
                age
            });
            await user.save();
            res.send(`User registered successfully...`);
            // Store hash in your password DB.
        });
    }
    } catch (error) {
        res.status(500).json({
            message:`Error while registering user ${error}`
        });
    }
});



UserRouter.post('/login', async (req, res)=>{
const{ email, password} = req.body;

try {
    const user = await UserModel.findOne({email});
    if(!user){
        return res.send(`User not found...`);
    }
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.send(`Password is incorrect...`)
            }
            if(result){
                const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY);
                res.status(200).json({
                    message:`User login successfully...`,
                    token
                });
            }
        });
    }
    
} catch (error) {
    res.send(`Error while logging in user ${error}`);
}
});

module.exports = UserRouter


