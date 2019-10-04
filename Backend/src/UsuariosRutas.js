var express  = require('express');
var usrApi = require('./Usuarios.js')

var usrRouter = express.Router();

usrRouter.get("/Login/:usuario/:pass",function(req,res)
{
   var usuario = req.params.usuario;
   var pass = req.params.pass;
   console.log("usr :"+usuario+" pass"+pass);
   usrApi.logIn(usuario,pass,(result)=>
   {
      console.debug(result);
   res.json(result);
   });
});


usrRouter.get("/Users/Register/:usr/:pass/:token",function(req,res)
{
  
});

module.exports.usrRouter = usrRouter;