//implementacion de alto nivel (usada unicamente en el backend)
var mwApi = require('./BDMiddleWareApi.js');
var http  = require('http');
var config = require("./DeployConfig.js")

//ctxApi : context api : Ambito local solo para miembros no delegados.
var ctxApi;

function init()
{
    console.log("initializing high level bd driver api");
    //AÑADIMOS LA API QUE FUNCIONA DE LADO DE LA APLICACION DE NODE
        mwApi.globalApiManager.addApi(new mwApi.BDMiddleWareAPI(
        this.apiName =   "highlevel",
        this.bdenpoint = "192.168.1.108",
        this.user =      "root",
        this.pass =      "",
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

async function bdQueryH(Query)
{
  return new Promise((resolve,reject)=>
  {
    var recivedData ='';
    console.log("query sended: "+Query);
    const data = JSON.stringify({
        query: Query
        })
  

    //TO DO : DES-HARDCODEAR ESTO:
  const options = {
    hostname: config.BD_SERVER_IP,
    port: 3001,
    path: '/db/fetch/',
    method: 'POST',
    headers: {
      'Content-Type'  : 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, res => {
      //Configuracion de la señales, data-> cada que llega un dato, end-> se llama al final del request
        res.on('data', d => {
            recivedData += d;
            //console.log(d.toString());
        }).on('end',()=>
        {
          resolve(JSON.parse(recivedData));
        });
      })
      req.on('error', error => {
      reject(error);
    })
  req.write(data)
  req.end()
  })
}

function bdConnectH()
{
   return true;
}

function bdConfigureParametersH()
{

}

module.exports.init = init;
