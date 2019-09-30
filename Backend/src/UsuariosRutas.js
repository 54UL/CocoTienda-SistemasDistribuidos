var express  = require('express');
var usrApi = require('./Usuarios.js')

var usrRouter = express.Router();

usrRouter.get("/Login/:usuario/:pass",function(req,res)
{
   var usuario = req.params.usuario;
   var pass = req.params.pass;
   console.log("usr :"+usuario+" pass"+pass);
   result = usrApi.logIn(usuario,pass);
   res.json(result);
});



module.exports.usrRouter = usrRouter;