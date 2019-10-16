var apiPagos = require('./Payments.js')
var express = require('express')
var app = express()

var PORT= 3007

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

app.get("/Payments/authTransaction/:cantidad/:origin/:dest", function(req, res){
    var origin = req.params.origin;
    var cantidad = req.params.cantidad;
    var dest = req.params.dest;
   
    apiPagos.authTransaction(origin,dest,Number(cantidad),(result)=>
    {
        console.log("transaction! uwu")
        res.json(result);
    });
});



app.listen(PORT,()=>
{
    console.log("payments server running in "+PORT);
})