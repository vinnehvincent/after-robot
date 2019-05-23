const config = require('./config/_config');
let express = require('express'),
     app = express(),
     bodyParser = require('body-parser'),
     mongoose = require('mongoose'),
     rank = require('./api/models/rankModel');
     user = require('./api/models/userModel');

     mongoose.Promise = global.Promise;
     mongoose.connect(config.MongoURI[app.settings.env],function(err,res){
         if(err)
            console.log('Error conneccting to database.\n' + err);
        console.log('Connected to database: '+config.MongoURI[app.settings.env]);
     });

     app.use(bodyParser.urlencoded({extended:true}));
     app.use(bodyParser.json());
     app.use(bodyParser.text());
     app.use(bodyParser.json({ type: 'application/json'})); 

app.get('/', function(req, res){
    res.send('Welcome to after-robot-app\n');
});

var rankRoutes = require('./api/routes/rankRoutes');
rankRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

app.listen(3000, function(){
    console.log('after-robot app listening on port 3000!');
});

module.exports = app;