var express = require('express'),
     app = express();
    
app.get('/', function(req, res){
    res.send('Hello Word');
});

app.listen(3000, function(){
    console.log('Example app listennin on port 3000!');
});