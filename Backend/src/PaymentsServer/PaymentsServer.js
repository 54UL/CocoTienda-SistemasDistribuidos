var express = require('express')
var app = express()

var PORT= 4269
// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});


//RUTAS DE PAYMENTS
app.get("/Payments/requestTransaction/:cantidad/:orgin/:dest",
    function(req,res)
    {
    var cantidad =  req.params.cantidad;
    var modeloPagos = {token:"",dinero:0,tdestino:""};
    res.json(modeloPagos);
    }
);


app.listen(PORT,()=>
{
    console.log("payments server running in "+PORT);
})