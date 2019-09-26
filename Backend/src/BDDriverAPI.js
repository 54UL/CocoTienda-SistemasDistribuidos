//IMPLEMENTACION de la api que usa el backend (Usada en todos lados probablemente)
import {BDMiddleWareAPI, globalApiManager} from "BDMiddleWareApi.js";

var api;

function initHighLevelAPI()
{
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
    addApi(new BDMiddleWareAPI(
        this.apiName = "highlevel",
        this.bdenpoint = "",
        this.user = "",
        this.pass = "",
        this.bdqueryDelagate = bdQueryH,
        this.bdConfigDelegate = bdConfigureParametersH,
        this.bdConnectDeleagte = bdConnectH
    )); 
    api = globalApiManager.getApi("highlevel")
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
