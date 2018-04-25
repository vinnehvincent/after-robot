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

exports.get_all_users = function(req,res){
    User.find({}, (err, users)=>{
        if(err)
            res.send(err);
        res.json(users);
    });
};

exports.get_user_by_id = function(req,res){
    User.findById({_id:req.params.id},(err,user)=>{
        if(err)
            res.send(err);
        res.json(user);
    })
}