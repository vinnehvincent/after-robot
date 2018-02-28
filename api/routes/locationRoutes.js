module.exports = function(app){
    var location = require('../controllers/locationController');

    app.route('/location')
        .post(location.create_a_location);
        
    
    app.route('/location/:id')
        .get(location.find_location_by_id)
        .put(location.edit_a_location);
}