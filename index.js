//const config = require('./config')();
let express = require('express'),
     app = express(),
     bodyParser = require('body-parser'),
     mongoose = require('mongoose'),
     rank = require('./api/models/rankModel');


     mongoose.Promise = global.Promise;
     mongoose.connect('mongodb://localhost/after-robot');

     app.use(bodyParser.urlencoded({extended:true}));
     app.use(bodyParser.json());
     app.use(bodyParser.text());
     app.use(bodyParser.json({ type: 'application/json'})); 

app.get('/', function(req, res){
    res.send('Welcome to after-robot-app\n');
});

var rankRoutes = require('./api/routes/rankRoutes');
rankRoutes(app);

app.listen(3000, function(){
    console.log('after-robot app listening on port 3000!');
});

module.exports = app;