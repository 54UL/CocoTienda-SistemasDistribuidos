//aqui se amarra la api de low level con la comunicacion http de express (agregar endpoints)
var  bodyParser = require('body-parser')
var  express   = require('express')
var  app       = express()
var  mwApi     = require('./BDMiddleWareApi.js')
var  bdApi     = require('./BDServerApi.js')

//init low level api
bdApi.init();

//La implementacion de low level es de mysql
var mysql= mwApi.globalApiManager.getApi("lowlevel");
 mysql.config()
 mysql.connect()


const colorCodes = require("./colorCodes");
const colors = colorCodes.colors;

// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});

app.get("/db/connect",(req,res) =>
{
    console.log(colors.green + "[BD]" + colors.yellow + "->" + colors.green + "connecting to the db");
    mysql.connect()
   
});

app.get("/db/config",(req,res) =>
{
    console.log("configuring db");

    if(mysql.config())
    {
        console.log("something went wrong");
    }

});

app.use(bodyParser.json());
app.post("/db/fetch/",async (req,res) =>
{
   var query = req.body.query;
 //  console.log(colors.green + "[BD]" + colors.yellow + "->" + colors.green + " incoming QUERY: "+colors.magenta + query);
     
   console.log( "[BD QUERY]->"+query);//COMPATIBILIDAD CON POWERSHELL;

   try {

   var asyncRes = await mysql.query(query);
   //console.debug(asyncRes)
   res.json(asyncRes);
  
   } catch (error) {
        console.error(new Error(colors.yellow+ "BDServer.js-> "+colors.red + error));
   }
});

app.listen(3001,()=>
{
console.log(colors.blue + "DATA BASE SERVER MANAGER(node js:mySql) ON 3001");
})
