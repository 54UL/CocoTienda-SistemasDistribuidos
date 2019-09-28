//aqui se amarra la api de low level con la comunicacion http de express (agregar endpoints)

var  express   = require('express')
var  app       = express()
var  mwApi     = require('./BDMiddleWareApi.js')
var  bdApi     = require('./BDServerApi.js')

//init low level api
bdApi.init();

//La implementacion de low level es de mysql
var mysql= mwApi.globalApiManager.getApi("lowlevel");

console.debug(mysql);

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

app.get("/db/fetch/:query",(req,res) =>
{
   var query=  req.params.query;
   var results = mysql.query(query);
   res.json(results);
});

app.listen(3001,()=>
{
console.log("DATA BASE SERVER MANAGER(mySql) ON 3001");
})
