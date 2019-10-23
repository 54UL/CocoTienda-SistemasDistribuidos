//var express = require('express');

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')

//AQUI HAY UN BUG CON EL GESTIONADOR DE LAS API'S
dbDriver.init();
var  bdApi =    mwApi.globalApiManager.getApi("highlevel");
//Members of user sys
var MAX_ELEMENTS=400;

//arguments -> trivial, returns an auth token ( used by everything)
function logIn (user,pass)
{
  return new Promise((resolve,reject)=>{
    try {
      var queryStr =  "SELECT * from Usuario where nombre ='"+user+"'"+" AND "+"contrasenia ='"+pass+"'";
  
    bdApi.query(queryStr,(result)=>{
      console.debug(result)
      var message ="bienvenido =)";
      var asignedToken=0;
      var firstOf  =result[0];
      var userType = 1;
      console.log(JSON.stringify(firstOf));
      if(firstOf==undefined){
        message = "usuario o clave incorrectos";
        resolve({asignedToken,message});
      }

      else{
        if(user === firstOf.nombre){
          if(pass === firstOf.contrasenia){
            asignedToken = firstOf.id_usuario;
            userType     = firstOf.id_tipousuario;
          }
          else
            message = "clave incorrecta";
        }
      }
    
      
      var model = {asignedToken,message,userType}
      resolve(model);
      });
    } 
    catch (error) {
      reject(error);
    }
    
  })
  
}

async function createUser(NewUserModel){

  return new Promise((resolve, reject)=>{
    try {
      var responseModel = {asignedToken:0,msg:"text"}
      var errorString ="";
      var hasOcurredAnError=false;

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
      }
      else{  
        var queryemail = "SELECT id_usuario FROM user WHERE correo='"+NewUserModel.email+"'";
        bdApi.query(queryemail,(result)=>
        {
          if(result.id_usuario==undefined){
            responseModel.msg="Esta cuenta ya existe";
            resolve(responseModel);            
          }
          else{
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
                });            
              });                    
            });
          }
        });               
      }
    } catch (error) {
      reject(error);
    }    
  });
}

async function deleteUser(id_usuario){
  

}

function getUser(id)
{

}


module.exports.logIn = logIn;
module.exports.createUser =createUser;

 