const mongoose = require('mongoose');
const _ = require('lodash');
require('../models/course');
const Courses = mongoose.model('Courses');

exports.addCourse = async (req,res) => {
  try{
    let courseParams = _.pick(req.body,['courseName','courseDescription']);
    const course = new Courses(courseParams);
    const courseCreated = await course.save();
    if(courseCreated) return res.status(201).json({
    resCode : 200,
    course_id  :  courseCreated._id,
    message :'Course created'
    });
  }
  catch(ex){
    res.status(400).send(ex.message);
  };
};

exports.getCourses = async (req,res) => {
    try{  
    const courses =  await Courses.find();
    if (courses) return res.status(200).json({
      resCode:200,
      courses:courses
    });
     }
   catch(ex){
    res.status(400).send('Bad request.');
    }
}

