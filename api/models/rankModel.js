

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RankSchema = new Schema({
    name:{type:String, required:true},
    location:{type:{lat:Number,lng:Number}}
});
module.exports=mongoose.model('Rank',RankSchema);