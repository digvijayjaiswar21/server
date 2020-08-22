
/**
 *@author :Digvijay Jaiswar
 *@date  :20/12/2019
 *@description  : Project name : shiksha
 */

const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseConnection = require('./db/database');
const users = require('./routes/users');
const auth = require('./routes/auth');
const courses = require('./routes/course');

const PORT = 3000;
const express = require('express');
const app = express();

databaseConnection.database();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(`/api/users`,users);
app.use(`/api/auth`,auth);
app.use(`/api/course`,courses);

app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})

