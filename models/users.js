const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const constant = require('../constants/constant');
const usersSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50,
        trim:true
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true,
        dropDups: true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:255,
        trim:true  
    },
    course:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true  
    },
    phoneno:{
        type:Number,
        required:true,
        minlength:10,
        trim:true  
    },
    isAdmin : Boolean
})

usersSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id ,isAdmin : this.isAdmin },constant.auth.jwt.secret,{expiresIn:'4h'});
    return token;
}

const User = mongoose.model('User',usersSchema);

function validateUser(user){
    const schema = {
        firstname : Joi.string().min(2).max(50).required(),
        lastname : Joi.string().min(2).max(50).required(),
        email : Joi.string().max(50).required().email(),
        password : Joi.string().min(8).max(255).required(),
        course : Joi.string().min(5).max(255).required(),
        phoneno:Joi.number().min(10).required()
    }
  return  Joi.validate(user,schema)
}

exports.User = User;
exports.validate  = validateUser;