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


// CORS HEADER SETUP
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');
    // Pass to next layer of middleware
    next();
});

app.get("/db/connect",(req,res) =>
{
    console.log("connecting to the db");
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
app.post("/db/fetch/",(req,res) =>
{
  
   var query = req.body.query;
   console.debug(query);
   console.log("incoming QUERY: "+query);
   var asyncRes = mysql.query(query);
   asyncRes.then((result)=>
   {
    res.json(result);
    
   })
   //res.send(req.body);
});

app.listen(3001,()=>
{
console.log("DATA BASE SERVER MANAGER(mySql) ON 3001");
})
