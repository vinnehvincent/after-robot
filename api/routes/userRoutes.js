module.exports = function(app){
    var user = require('../controllers/userController');

    app.route('/user')
        .post(user.create_user)
        .get(user.get_all_users);

    app.route('/user/:id')
        .get(user.get_user_by_id)
}