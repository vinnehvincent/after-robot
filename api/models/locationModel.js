

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name:{type:String, required:true},
    coOrdinates:{type:{lat:Number,lng:Number}}
});
module.exports=mongoose.model('Location',LocationSchema);