const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/registrations');
var registrationModel = mongoose.model('Registrations');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constant = require('../constants/constant')


router.post('/',async (req,res)=>{
    var email = req.body.email;
    var password =req.body.password;
   const registration = new registrationModel({
    email:email,
    password:password
}) 
 const result = await registration.save();
 try{
    if(result){
        res.status(200).json({message:'Inserted successfully!!!'})
    }
 }
 catch(ex){
   res.status(500).json({message:'Internal server error.'});
 }
})


router.post('/authenticate',(req,res)=>{
    registrationModel.find({email:req.body.username},(err,result)=>{
        if(!result.length){
            res.status(401).json('Unauthorized user');
        }
        if(req.body.password!=result[0].password){
            res.json({status:401,
                   response :'Unauthorized user'});
        }

       const payload ={
       username:result[0].email,
       admin:'admin'
        };

        const token = jwt.sign(payload,constant.auth.jwt.secret,{expiresIn:'4h'})
        return res.json({
            message:'successfuly',
            token:token
        })
    })
})

module.exports=router;