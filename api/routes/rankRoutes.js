module.exports = function(app){
    var rank = require('../controllers/rankController');

    app.route('/rank')
        .post(rank.create_rank)
        .get(rank.get_all_ranks);
        
    
    app.route('/rank/:id')
        .get(rank.find_rank_by_id)
        .put(rank.edit_a_rank);
        
    app.route('/rank/nearest')
        .get(rank.find_nearest_rank);
}