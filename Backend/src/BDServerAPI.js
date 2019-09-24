//ESTE ES EL SERVIDOR TEMPORAL DE IMPLEMENTACION LOW LEVEL (MIGRAR A JAVA)
// Gestiona SQL UNICAMNTE
//to do's 
// definir interfas de http express, con estas implementaciones (van en bdServer.JS)
//VARIABLES
import {BDMiddleWareAPI, globalApiManager} from "BDMiddleWareApi.js";
var mysql      = require('mysql');

//se define esta variable para no tener que hacer get api todo el rato :v
var api; 

function initHighLevelAPI()
{
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
    globalApiManager.addApi(new BDMiddleWareAPI(
        this.apiName = "lowlevel",
        this.bdenpoint = "localhost",
        this.user = "dbuser",
        this.pass = "s3kreee7",
        this.bdqueryDelagate = bdQueryL,
        this.bdConfigDelegate = bdConfigureParametersH,
        this.bdConnectDeleagte = bdConnectH
    )); 

   api = globalApiManager.getApi(lowlevel);
}
var sql_connection;

function bdQueryL(query)
{ 
    var result;
    sql_connection.query(query, function(err, rows, fields) {
        result = rows;
      });
      return 
}

function bdConnectL(bdname,endpoint,usr,pass)
{
    sql_connection.connect();
}

function bdConfigureParametersL()
{
    sql_connection = mysql.createConnection({
        host     : api.endpoint,
        user     : api.user,
        password : api.password
      });
    
}









