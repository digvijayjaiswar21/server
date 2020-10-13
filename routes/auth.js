const {User}= require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const constant = require('../constants/constant');

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');
    const token = user.generateAuthToken();
    res.status(200).json({user:user ,token:token});
})

function validate(req){
    const schema = {
        email : Joi.string().max(50).required().email(),
        password : Joi.string().min(6).max(255).required(),
    }
  return  Joi.validate(req,schema)
}
module.exports = router;