

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RankSchema = new Schema({
    name:{type:String, required:true},
    location:{
        type:[Number],
        index:'2d',
        required:true
    }
});
module.exports=mongoose.model('Rank',RankSchema);