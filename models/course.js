const mongoose = require('mongoose');
const mongodb = require('mongodb');

const courseSchema = new mongoose.Schema({
    courseName :{
        type:String,
        minlength:2,
        maxlength:50,
        trim:true
    },
    courseDescription :{
        type:String,
        minlength:2,
        maxlength:50,
        trim:true
    }
})

mongoose.model('Courses',courseSchema);