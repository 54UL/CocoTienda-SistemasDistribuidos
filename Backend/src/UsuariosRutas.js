var  bodyParser = require('body-parser')
var express  = require('express');
var usrApi = require('./Usuarios.js')

var usrRouter = express.Router();

usrRouter.get("/Login/:usuario/:pass",function(req,res)
{
   var usuario = req.params.usuario;
   var pass = req.params.pass;
   usrApi.logIn(usuario,pass,(qresult)=>
   {
   console.debug(qresult);
   res.json(qresult);
   });
});

// JSON MODEL (NewUserModel)
/*
 {
  "usr":"54ul",
  "email":"54ulxd@gmail.com",
  "pass":"somesecret"
 }
*/


usrRouter.use(bodyParser.json());
usrRouter.post("/Register",function(req,res)
{
    console.debug(req.body)
    usrApi.createUser(req.body,(qresult)=>
    { 
       res.json(qresult);
    })
});

module.exports.usrRouter = usrRouter;