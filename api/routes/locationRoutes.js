module.exports = function(app){
    var location = require('../controllers/locationController');

    app.route('/location')
        .post(location.create_a_location);
}