//var express = require('express');

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')

//AQUI HAY UN BUG CON EL GESTIONADOR DE LAS API'S
dbDriver.init();
var  bdApi =    mwApi.globalApiManager.getApi("highlevel");
//Members of user sys
var MAX_ELEMENTS=400;

var colorCodes = require("./colorCodes");
var colors = colorCodes.colors;


//arguments -> trivial, returns an auth token ( used by everything)
function logIn (user,pass,callback)
{
  var queryStr =  "SELECT * from Usuario where nombre ='"+user+"'"+" AND "+"contrasenia ='"+pass+"'";
  
  bdApi.query(queryStr,(result)=>
  {
    console.debug(result)
    var message ="bienvenido =)";
    var asignedToken=0;
    var firstOf  =result[0];
    var userType = 1;
    if(firstOf==undefined)
    {
      message = "usuario o clave incorrectos";
      callback({asignedToken,message});
      return;
    }
  
    if(user === firstOf.nombre)
    {
      if(pass === firstOf.contrasenia)
      {
        asignedToken =firstOf.id_usuario
        userType     =firstOf.id_tipousuario
      }
      else
      message = "clave incorrecta";
    }
    var model = {asignedToken,message,userType}
    callback(model);
  });
}

async function createUser(NewUserModel){

  return new Promise((resolve, reject)=>{
    try {
      var responseModel = {asignedToken:0,msg:"text"}
      var errorString ="";
      var hasOcurredAnError=false;

      //Form validation, i think front should validate this data, not us
      if(NewUserModel.usr==="")
      {
        errorString+="No se permite usuario vacio;";
        hasOcurredAnError = true;
      }
      
      if(NewUserModel.email==="")
      {
        errorString+="\n No se permite email vacio;";
        hasOcurredAnError = true;
      }
                
      if(NewUserModel.pass==="")
      {
        errorString+="\n No se permite pass vacio;";
        hasOcurredAnError = true;
      }

      if(hasOcurredAnError)
      {
        responseModel.asignedToken = 0;
        responseModel.msg = errorString;
        resolve(responseModel);
      }else{               
        var queryStr = "INSERT INTO usuario VALUES (0,2,'"+NewUserModel.usr+"','"+NewUserModel.email+"','"+NewUserModel.pass+"')";
        bdApi.query(queryStr,(result)=>
        {
          responseModel.asignedToken = result.insertId;
          responseModel.msg = "¡usuario registrado con exito!" 

          const queryNewBancocoAccount = "INSERT INTO COCOBANCO VALUES(0,100000,'"+NewUserModel.email+"','"+NewUserModel.pass+"')";                   
          bdApi.query(queryNewBancocoAccount,()=>{

            const queryGetAmountOfAccounts = "SELECT MAX(ID_CUENTA) AS AMOUNT_OF_ACCOUNTS FROM COCOBANCO";

            bdApi.query(queryGetAmountOfAccounts,(resGetAmountOfAccounts)=>{
              var amountOfAccounts = resGetAmountOfAccounts[0].AMOUNT_OF_ACCOUNTS;
              const queryNewAccount = "INSERT INTO CUENTAS VALUES(0,'" +amountOfAccounts + "','"+result.insertId+"')";
              bdApi.query(queryNewAccount,()=>{                     
                resolve(responseModel);
              });
            })            
          });                    
        });
      }
    } catch (error) {
      reject(error);
    }    
  });
}

function deleteUser()
{


}

function getUser(id)
{

}


module.exports.logIn = logIn;
module.exports.createUser =createUser;

 /*
          MODELO QUE ARROJA result CON querys tipo inserts
            { fieldCount: 0,
            affectedRows: 1,
            insertId: 14,
            info: '',
            serverStatus: 2,
            warningStatus: 0 }
            */