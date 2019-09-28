var express = require('express')
var app = express()

//RUTAS DE PAYMENTS
app.get("/Payments/requestTransaction/:cantidad/:orgin/:dest",
    function(req,res)
    {
    var cantidad =  req.params.cantidad;
    var modeloPagos = {token:"",dinero:0,tdestino:""};
    res.json(modeloPagos);
    }
);