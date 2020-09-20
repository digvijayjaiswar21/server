const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const courses = require('../controllers/course');
const admin = require('../middlewares/admin');

router.get('/',[auth],courses.getCourses);
router.post('/createCourse',[auth,admin],courses.addCourse);

module.exports = router;