const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const courses = require('../controllers/course');
const admin = require('../middlewares/admin');

router.route('/')
      .get([auth],courses.getCourses)
      .post([auth,admin],courses.addCourse);

module.exports = router;