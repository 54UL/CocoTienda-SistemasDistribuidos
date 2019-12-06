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
  var url = 'http://localhost:8080/WebService/NewWebService?wsdl';
  var args = {name: 'value'};
  soap.createClientAsync(url)
   .then((client) => {
      return client.createNewUser(args, (err, result, rawResponse, soapHeader, rawRequest)=>{
         console.log(result);
      });
  }).then((result) => {
    console.log(result);
  });
// client.createNewUser({name: 'value'}, function(err, result, rawResponse, soapHeader, rawRequest) {
//    // result is a javascript object
//    // rawResponse is the raw xml response string
//    // soapHeader is the response soap header as a javascript object
//    // rawRequest is the raw xml request string
// })

//RUN THE SERVER
app.listen(3000,function()
   {
   console.log("server ready in port 3000");
   console.log("Go to "+IP_STRING+":3000 to enter to this server");
   }
);



