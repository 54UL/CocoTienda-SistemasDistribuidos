var express    = require('express')
var  app = express();

var IP_STRING = "192.168.0.0"

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  UserRoutes= require('./UsuariosRutas.js')
var  ProductsRoutes= require('./ProductsRutas.js')

//init high level api
dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");

app.use(express.static('../../FrontEnd'));


function corsPolicy(res)
{
   res.setHeader('Access-Control-Allow-Origin', '*');
}


// CORS HEADER SETUP
app.use(function (req, res, next) {
    
    corsPolicy(res);
    next();
});

//default route
app.get('/', function (req, res) {
   res.send('testing endpoint');

   //QUERY DE PRUEBA !!!!!
   bdApi.query("SELECT * FROM ALUMNOS",(result)=>
   {
      console.log("transaction ended!!");
      console.debug(result);
   });
  
});

//AQUI SE CENTRALIZAN TODAS LAS RUTAS
// CORS HEADER SETUP
app.use(function (req, res, next) {
    
   corsPolicy(res);
   next();
});
app.use('/Users',UserRoutes.usrRouter);
// CORS HEADER SETUP
app.use(function (req, res, next) {
    
   corsPolicy(res);
   next();
});
app.use('/ProductSelling',ProductsRoutes.productsRouter);
 
  var soap = require('soap');
  var url = 'http://localhost:8080/CocoWebService/UsuariosWebService?wsdl';
  var args = {nombre: 'COCO',email: "COCO"};
  soap.createClientAsync(url)
   .then(async (client) => {
      return client;
  }).then(async (res) => {
      await res.createNewUser(args, function(err, result, rawResponse, soapHeader, rawRequest) {
         console.log("=============================");
         console.log(result);
      })
  });


//RUN THE SERVER
app.listen(3000,function()
   {
   console.log("server ready in port 3000");
   console.log("Go to "+IP_STRING+":3000 to enter to this server");
   }
);



