var  bodyParser = require('body-parser')
var express  = require('express');
var usrApi = require('./Usuarios.js')

var usrRouter = express.Router();
//import colorsCodes  from './colorCodes'
var colorCodes = require("./colorCodes");
var colors = colorCodes.colors;

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
usrRouter.post("/Register",async(req,res) =>
{
   try {
      console.debug(req.body)
      var responseFromCreateUser = await usrApi.createUser(req.body);
      res.json(responseFromCreateUser);      
   } catch (error) {
      console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
   }   
});

module.exports.usrRouter = usrRouter;