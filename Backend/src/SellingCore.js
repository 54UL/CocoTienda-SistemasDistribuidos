var express    = require('express')
var  app = express();

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  UserRoutes= require('./UsuariosRutas.js')
var  ProductsRoutes= require('./ProductsRutas.js')

//init high level api
dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");



// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});

//default route
app.get('/', function (req, res) {
   res.send('esto no se supone que debe de suceder');
   //QUERY DE PRUEBA !!!!!
   bdApi.query("SELECT * FROM ALUMNOS",(result)=>
   {
      console.log("transaction ended!!");
      console.debug(result);
   });
  
});

//AQUI SE CENTRALIZAN TODAS LAS RUTAS
app.use('/Users',UserRoutes.usrRouter);
app.use('/ProductSelling',ProductsRoutes.productsRouter);

//RUN THE SERVER
app.listen(3000,function()
   {
   console.log("server ready in port 3000");
   console.log("Go to localhost:3000 to enter to this server");
   }
);



