
import {globalApiManager} from "BDMiddleWareApi.js";
import {logIn} from "Usuarios.js";

var bdApi = globalApiManager.getApi("highlevel");

var express = require('express')
var app = express()


app.post("/Login/Authenticate/:usuario/:pass",function(req,res,next)
{
   var usuario = req.param.usuario;
   var pass = req.param.pass;
   logIn(usuario,pass);
   next();
});

//AQUI VAN LAS RUTAS QUE LLEGEN DEL FRONT 
app.get('/', function (req, res) {
    res.setHeader("holaxd",Math.random()*100);
    res.send('hello world');
  })
  
  
  





