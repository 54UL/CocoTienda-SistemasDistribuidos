var apiPagos = require('./Payments.js')
var express = require('express')
var app = express()

var PORT= 3007

// var colorCodes = require('Backend/src/colorCodes.js');
// var colors = colorCodes.colors;

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
        var orgin = req.params.origin;
        var dest = req.params.dest
        var modeloPagos = {token:"",dinero:0,tdestino:""};
        res.json(modeloPagos);
    }
);



//comprobar fondos y proceder
app.get("/Payments/getFounds/:usr", function(req, res){
    var fondos = {usr:"mycacapis",dinero:100}
    
    res.json(fondos);
});

app.get("/Payments/authTransaction/:cantidad/:origin/:dest", async function(req, res){
    try {
        var origin = req.params.origin;
        var cantidad = req.params.cantidad;
        var dest = req.params.dest;
    
        var result = await apiPagos.authTransaction(origin,dest,Number(cantidad));
        console.log("transaction! uwu")
        res.json(result);
    } catch (error) {
        console.log
    }
});



app.listen(PORT,()=>
{
    console.log("payments server running in "+PORT);
})