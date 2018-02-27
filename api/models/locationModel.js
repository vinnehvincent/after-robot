

var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var LocationSchema = new Schema({
    name:{type:String, required:true},
    coOrdinates:{type:Set}
});
module.exports=mongoose.model('Location',LocationSchema);