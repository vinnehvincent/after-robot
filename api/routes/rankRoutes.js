module.exports = function(app){
    var rank = require('../controllers/rankController');

    app.route('/rank')
        .post(rank.create_rank);
        
    
    app.route('/rank/:id')
        .get(rank.find_rank_by_id)
        .put(rank.edit_a_rank);
}