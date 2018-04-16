var mongoose = require('mongoose'),
    Rank = mongoose.model('Rank');

exports.create_rank = function (req, res) {
    var new_location = new Rank(req.body);
    new_location.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}
exports.get_all_ranks = function (req, res) {

    Rank.find({}, (err, ranks) => {
        if (err)
            res.send(err);
        res.json(ranks);
    });

}
exports.find_rank_by_id = function (req, res) {


    Rank.findById({ _id: req.params.id }, (err, rank) => {
        if (err)
            res.send(err);
        res.json(rank);
    })


}
exports.edit_a_rank = function (req, res) {

    Rank.findById({ _id: req.params.id }, (err, rank) => {
        if (err)
            res.send(err);
        Object.assign(rank, req.body).save((err, rank) => {
            if (err)
                res.send(err);
            res.json(rank);
        });
    });
}
exports.find_nearest_rank = function (req, res) {

    let coords = [req.query.lat, req.query.lng];
    Rank.find({ location: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: 1000, limit: 5 } } }, (err, ranks) => {
        if (err)
            res.send(err);
        res.json(ranks);
    });

}