//require('gejson');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RankSchema = new Schema({
    name: { type: String, required: true },
    location: {
        type: {type:String},
        coordinates: []
    }
});

RankSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Rank', RankSchema);