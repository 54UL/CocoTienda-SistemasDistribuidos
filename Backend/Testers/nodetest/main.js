var express = require('express')
var app = express()


// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});



app.get('/', function (req, res) {
  res.setHeader("holaxd",Math.random()*100);
  res.send('pacheco es putolongo')
})


app.listen(3000,function()
{
    console.log('server ready on port : 3000');
})