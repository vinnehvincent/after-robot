var mongoose = require('mongoose'),
    Location = mongoose.model('Location');

exports.create_a_location = function(req, res){
    var new_location = new Location (req.body);
    new_location.save(function(err,user){
        if(err)
            res.send(err);
        res.json(user);
    });
}
exports.find_location_by_id = function(req,res){
    Location.findById({_id:req.params.id},(err,location) =>{
        if(err)
            res.send(err);
        res.json(location);
    })
}