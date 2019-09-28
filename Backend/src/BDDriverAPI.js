//implementacion de alto nivel (usada unicamente en el backend)
var mwApi = require('./BDMiddleWareApi.js');


//ctxApi : context api : Ambito local solo para miembros no delegados.
var ctxApi;

function init()
{
    console.log("initializing high level bd driver api");
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
        mwApi.globalApiManager.addApi(new mwApi.BDMiddleWareAPI(
        this.apiName =   "highlevel",
        this.bdenpoint = "localhost",
        this.user =      "null",
        this.pass =      "null",
        this.query =  bdQueryH,
        this.config = bdConfigureParametersH,
        this.connect = bdConnectH
    )); 
    ctxApi = mwApi.globalApiManager.getApi("highlevel")
}




//HIGH LEVEL IMPLEMENTATION WITH EXPRESS HTTP REQUESTS THE LOW LEVEL API
// DENTRO DE CADA UNA DE ESTAS FUNCIONES SE DEFINEN LAS RUTAS QUE DIRIGEN HACIA EL SERVIDOR BD
// la api de http es todo por post
// las rutas que hay son unicamente las funciones de abajo (junto con sus argumentos)

function bdQueryH(query)
{
    console.log("query testing");
  
    return new Object; 
}

function bdConnectH()
{
   return true;
}

function bdConfigureParametersH()
{

}

module.exports.init = init;
