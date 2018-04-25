let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create_user = function(req, res){
    let new_user = new User(req.body);
    new_user.save(function(err,user){
        if(err)
            res.send(err);
        res.json(user);
    });
};