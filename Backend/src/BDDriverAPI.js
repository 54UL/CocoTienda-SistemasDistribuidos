//IMPLEMENTACION de la api que usa el backend (Usada en todos lados probablemente)

var globalApiManager = require('./BDMiddleWareApi.js.js');
var BDMiddleWareAPI  = require('./BDMiddleWareApi.js.js');



function initHighLevelAPI()
{
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
    addApi(new BDMiddleWareAPI(
        this.apiName = "highlevel",
        this.bdenpoint = "localhost",
        this.user = "null",
        this.pass = "null",
        this.bdqueryDelagate = bdQueryH,
        this.bdConfigDelegate = bdConfigureParametersH,
        this.bdConnectDeleagte = bdConnectH
    )); 

    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
    addApi(new BDMiddleWareAPI(
        this.apiName = "dummyAPI",
        this.bdenpoint = "",
        this.user = "",
        this.pass = "",
        this.bdqueryDelagate = dummyQuery,
        this.bdConfigDelegate = dummyConfig,
        this.bdConnectDeleagte = dummyConnect
    )); 


    api = globalApiManager.getApi("highlevel")
}


function dummyQuery(query)
{
  console.log("DUMMY QUERY"+query);
}

function dummyConfig()
{

}
function dummyConnect()
{

}



//HIGH LEVEL IMPLEMENTATION WITH EXPRESS HTTP REQUESTS THE LOW LEVEL API
// DENTRO DE CADA UNA DE ESTAS FUNCIONES SE DEFINEN LAS RUTAS QUE DIRIGEN HACIA EL SERVIDOR BD
// la api de http es todo por post
// las rutas que hay son unicamente las funciones de abajo (junto con sus argumentos)

function bdQueryH(query)
{
 return new Object; 

 
}

function bdConnectH()
{
   return true;
}

function bdConfigureParametersH()
{

}

