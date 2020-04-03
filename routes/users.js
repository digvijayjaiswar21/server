const {User,validate}= require('../models/users');
const config = require('config');
var mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
require('../models/users');
const userModel = mongoose.model('User');

router.get('/me',auth,async (req,res)=>{
const currentUserDetails = await userModel.findById(req.user._id).select('-password');
res.send(currentUserDetails);
})

router.post('/',async (req,res)=>{
    console.log('req ',req.body);
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered');

    const users = new User(
        _.pick(
            req.body,
            ['firstname',
             'lastname',
             'email',
             'course',
             'password',
             'phoneno'
            ])
    );
    
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password,salt);
    await users.save();
    const token = users.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(users,['email','firstname'])
    );
})
module.exports = router;


        // _.pick(
        //     req.body,
        //     ['firstname',
        //      'lastname',
        //      'email',
        //      'course',
        //      'password',
        //      'phoneno'
        //     ])