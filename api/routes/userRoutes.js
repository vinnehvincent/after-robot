module.exports = function(app){
    var user = require('../controllers/userController');

    app.route('/user')
        .post(user.create_user)
        .get(user.get_all_users);
}