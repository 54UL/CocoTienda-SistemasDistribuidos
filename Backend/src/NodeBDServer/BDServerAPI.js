//ESTE ES EL SERVIDOR TEMPORAL DE IMPLEMENTACION LOW LEVEL (MIGRAR A JAVA)
// Gestiona SQL UNICAMNTE
//to do's 
// definir interfas de http express, con estas implementaciones (van en bdServer.JS)
//VARIABLES
var mysql      = require('mysql2/promise');
var  mwApi     = require('../BDMiddleWareApi.js')
var config = require("../DeployConfig.js")

//import colorsCodes  from './colorCodes'
var colorCodes = require("../colorCodes");
var colors = colorCodes.colors;

function init()
{
   try {
      //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
      mwApi.globalApiManager.addApi(new mwApi.BDMiddleWareAPI(
          this.apiName = "lowlevel",
          this.bdenpoint = "",
          this.user = "",
          this.pass = "",
          this.query = bdQueryl,
          this.config = bdConfigureParametersl,
          this.connect = bdConnectl,
          this.close = closel
      )); 
     api = mwApi.globalApiManager.getApi("lowlevel");
      
   } catch (error) {
      console.error(new Error(colors.yellow+ "BDServerApi -> "+colors.red + error));
   }
}

//SQL IMPLEMENTATION
var sql_connection;

 async function bdQueryl(query)
{ 
   try 
   {
      let [rows, fields] =  await sql_connection.execute(query);
      return rows;
   } 
   catch (error) {
      console.error(new Error(colors.yellow+ "BDServerApi -> "+colors.red + error));
      return null;
   }
}

async function bdConnectl()
{
   // sql_connection.connect();
}

async function bdConfigureParametersl()
{
   try {
      sql_connection = await mysql.createConnection({
         host     :config.SQL_SERVER_IP,
         user     :config.SQL_USER,
         password :config.SQL_PASS,
         database :config.SQL_DBName 
       });
     
       return sql_connection ? false:true;
      
   } catch (error) {
      console.error(new Error(colors.yellow+ "BDServerApi -> "+colors.red + error));
      console.log(colors.blue + "Is mysql closed?");
   }
}

function closel()
{
   sql_connection.close();
}
module.exports.init = init;




