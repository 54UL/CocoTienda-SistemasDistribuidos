var express = require('express')
//import { getApi } from './BDMiddleWareApi.js';
//import logIn from './Usuarios.js';
var  usrApi = require('./Usuarios.js')
var  mwApi  = require('./BDMiddleWareApi.js')



//GLOBAL INITIALIZATION CODE
var  app = express();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");

app.get("/Login/Authenticate/:usuario/:pass",function(req,res)
{
   var usuario = req.params.usuario;
   var pass = req.params.pass;
   console.log("usr :"+usuario+" pass"+pass);
   usrApi.logIn(usuario,pass);
   res.send({usuario,pass});
  
});

//AQUI VAN LAS RUTAS QUE LLEGEN DEL FRONT 
app.get('/', function (req, res) {
    res.setHeader("holaxd",Math.random()*100);
    res.send('hello world');
});
  
  



app.get('/ProductSelling/retrive/:category', function (req, res) 
{
   var category = req.params.category;
  
   var arregloJSONPrueba =
   {"productos":[{nombre:"taza2",precio:"$666.6"},{nombre:"taza2",precio:"$666.6"},{nombre:"taza3",precio:"$666.6"},{nombre:"taza4",precio:"$666.6"}]};

   res.json(arregloJSONPrueba);
});
 

//RUN THE SERVER
app.listen(3000,function()
{

   console.log("server ready in port 3000");
}
);



