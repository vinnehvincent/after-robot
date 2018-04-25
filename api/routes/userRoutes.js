module.exports = function(app){
    var user = require('../controllers/userController');

    app.route('/user')
        .post(user.create_user);
}