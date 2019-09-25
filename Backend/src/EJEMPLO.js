var express = require('express')
var app = express()


// codigo use -> request (), response  
// codigo get "ruta"
// codigo use 
// codigo use


// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    res.send("dasasd");
    next();
});



app.get('/', function (req, res) {
  res.setHeader("holaxd",Math.random()*100);
  res.send('hello world');
})


app.listen(3000,function()
{
    console.log('server ready on port : 3000');
})