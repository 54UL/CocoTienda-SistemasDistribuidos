//ESTE ES EL SERVIDOR TEMPORAL DE IMPLEMENTACION LOW LEVEL (MIGRAR A JAVA)
// Gestiona SQL UNICAMNTE
//to do's 
// definir interfas de http express, con estas implementaciones (van en bdServer.JS)
//VARIABLES
var mysql      = require('mysql2/promise');
var  mwApi     = require('./BDMiddleWareApi.js')
//se define esta variable para no tener que hacer get api todo el rato :v
var api; 

function init()
{
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
    mwApi.globalApiManager.addApi(new mwApi.BDMiddleWareAPI(
        this.apiName = "lowlevel",
        this.bdenpoint = "localhost:3306",
        this.user = "root",
        this.pass = "",
        this.query = bdQueryl,
        this.config = bdConfigureParametersl,
        this.connect = bdConnectl
    )); 
   api = mwApi.globalApiManager.getApi("lowlevel");
}

//SQL IMPLEMENTATION
var sql_connection;

async function bdQueryl(query)
{ 
   let [rows, fields] = await sql_connection.execute(query);
   return rows;
}

function bdConnectl()
{
   // sql_connection.connect();
}

async function bdConfigureParametersl()
{
     sql_connection = await mysql.createConnection({
        host     :"localhost",
        user     : "root",
        password : "",
        database : "prueba"
      });
      return sql_connection ? false:true;
}


module.exports.init = init;




