const mongoose = require('mongoose');
const mongo = require('mongodb');

/**
 * @author :Digvijay Jaiswar
 * @date : 20/12/2019
 * @description : Database connection eg('MongoDb')
 */
module.exports.database=function(){
   return mongoose.connect('mongodb://localhost:27017/myproject', {useNewUrlParser: true})
          .then(()=>{
              console.log('Mongodb connected successfully!!!');
          }).catch(()=>{
              console.log('Error Occurred!!!');
          })

}

