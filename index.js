var express = require('express'),
     app = express(),
     bodyParser = require('body-parser'),
     mongoose = require('mongoose');
     location = require('./api/models/locationModel');

     mongoose.Promise = global.Promise;
     mongoose.connect('mongodb://localhost/after-robot');

     app.use(bodyParser.urlencoded({extended:true}));
     app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Hello Word');
});

var locationRoutes = require('./api/routes/locationRoutes');
locationRoutes(app);

app.listen(3000, function(){
    console.log('after-robot app listening on port 3000!');
});