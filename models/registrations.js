var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registration = new Schema({
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

mongoose.model('Registrations',registration)