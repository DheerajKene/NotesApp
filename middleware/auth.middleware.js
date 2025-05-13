const UserModel = require("../model/user.model");
const express = require("express");
const jwt = require("jsonwebtoken")

const auth = async (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    if(!token){
        return res.send(`token not found Pls login again...!`);
    }
    try {
        if(token){
            jwt.verify(token, process.env.SECRETE_KEY, async function(err, decoded) {
                if(err){
                    return res.send(`Invalid Token ${err}`);
                }
                if(decoded){
                    const userId = decoded.id;
                    const user = await UserModel.findById(userId);
                    if(!user){
                        return res.status(401).json({
                            message:`User not found`
                        });
                    }
                    req.user = user;
                    next();

                }
              });
        }
        
    } catch (error) {
        res.status(400).json({
            message:`user not found ${error.message}`
        });
    }
}

module.exports = auth