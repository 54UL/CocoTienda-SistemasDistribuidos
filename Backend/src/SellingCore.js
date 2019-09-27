var express    = require('express')
var  app = express();

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  UserRoutes= require('./UsuariosRutas.js')
var  ProductsRoutes= require('./ProductsRutas.js')




//systemw initialization code
mwApi.globalApiManager.init();
dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");

//bdApi.query("hola");

// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});
//default
app.get('/', function (req, res) {
   res.send('esto no se supone que debe de suceder');
});


//AQUI SE CENTRALIZAN TODAS LAS RUTAS
app.use('/Users',UserRoutes.usrRouter);
app.use('/ProductSelling',ProductsRoutes.productsRouter);

//RUN THE SERVER
app.listen(3000,function()
{
   console.log("server ready in port 3000");
}
);



