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
  return new Promise(async (resolve,reject)=>{
    try {
      //json model (convertir)
      var message ="bienvenido =)";
      var asignedToken=0;
      var userType = 1;
      var usuarioLoginQryResult;
      
      
      try {
        const usuarioLoginQry =  "SELECT * from Usuario where correo ='"+user+"'"+" AND "+"contrasenia ='"+pass+"'";
        usuarioLoginQryResult  = await bdApi.query(usuarioLoginQry);
      } catch (error) {
        reject(error);
      }
      

      var firstUserOf  =usuarioLoginQryResult[0];
      console.log(JSON.stringify(firstUserOf));

      if(firstUserOf==undefined)
      {
        message = "usuario o clave incorrectos";
        resolve({asignedToken,message});
      }
      else
      {     
        const queryCheckIfUserHasAnOpenedSession = "SELECT *FROM SESION WHERE ID_USUARIO = "+firstUserOf.id_usuario;
        resultQueryCheckSesion = await  bdApi.query(queryCheckIfUserHasAnOpenedSession);

        var firstOfCheck = resultQueryCheckSesion[0];
        if(firstOfCheck == null || firstOfCheck == undefined || firstOfCheck == "")
        {
          const queryCreateNewSession = "INSERT INTO SESION VALUES (0,'"+firstUserOf.id_usuario+"')";
          asignedToken = firstUserOf.id_usuario;
          userType     = firstUserOf.id_tipousuario;  
          await bdApi.query(queryCreateNewSession)
          resolve({asignedToken,message,userType})           
        }
        else
        {                  
          message = "Parece que tienes otra sesión abierta. Cierra dicha sesión para iniciar sesión en esta computadora";
          asignedToken = 0;
          resolve({asignedToken,message,userType});
        }       
      }                               
    } 
    catch (error) {
      reject(error);
    }
  })
}
//funcion de validacion para los criterios de crear un usuario
function validationPipe(NewUserModel)
{
      var responseModel = {asignedToken:0,msg:""}
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
      }
     return responseModel;
}

 function createUser(NewUserModel){

  return new Promise(async(resolve, reject)=>{
    try 
    {
      var responseModel = {asignedToken:0,msg:"text"}
     

      const error =validationPipe(NewUserModel);

      if(error.msg !="")
      resolve(error);
      else 
      {    
        var queryemail = "SELECT id_usuario FROM user WHERE correo='"+NewUserModel.email+"'";
        bdApi.query(queryemail,(result)=>
        {
          if(result.id_usuario==undefined){
            responseModel.msg="Esta cuenta ya existe";
            resolve(responseModel);            
          }
          else{
            var queryStr = "INSERT INTO usuario VALUES (0,2,'"+NewUserModel.usr+"','"+NewUserModel.email+"','"+NewUserModel.pass+"')";
            var result =   bdApi.query(queryStr);
                
              
            responseModel.asignedToken = result.insertId;
            responseModel.msg = "¡usuario registrado con exito!" 
            const queryNewBancocoAccount = "INSERT INTO COCOBANCO VALUES(0,100000,'"+NewUserModel.email+"','"+NewUserModel.pass+"')";                   
            await bdApi.query(queryNewBancocoAccount);
            const queryGetAmountOfAccounts = "SELECT MAX(ID_CUENTA) AS AMOUNT_OF_ACCOUNTS FROM COCOBANCO";
            resGetAmountOfAccounts = await  bdApi.query(queryGetAmountOfAccounts)

            var amountOfAccounts = resGetAmountOfAccounts[0].AMOUNT_OF_ACCOUNTS;
            const queryNewAccount = "INSERT INTO CUENTAS VALUES(0,'" +amountOfAccounts + "','"+result.insertId+"')";
            await  bdApi.query(queryNewAccount)              
            resolve(responseModel); 
          }
        });
      }
    } catch (error) {
      reject(error);
    }    
  });
}

async function deleteUser(id_usuario){
  return new Promise(async(resolve, reject)=>{
    var query="SELECT *FROM usuario WHERE id_usuario="+id_usuario;
    var result = await bdApi.query(query);
      try {
        if(result.id_usuario!=undefined){
          var query="DELETE FROM cuenta WHERE ID_UsuarioGift="+id_usuario;
          var resultquery = await bdApi.query(query);
          query = "DELETE FROM sesion WHERE ID_Usuario="+id_usuario;
          resultquery = await bdApi.query(query);
          query="DELETE FROM compra WHERE id_usuario="+id_usuario;
          resultquery = await bdApi.query(query);
          query="DELETE FROM usuario WHERE id_usuario="+id_usuario;
          resultquery = await bdApi.query(query);
          resolve({msg="Usuario eliminado"});
        }
      } catch (error) {
        reject(error);
      }
  });
}


async function getAllUsers(){
  return new Promise(async (resolve,reject)=>{
    var query="SELECT *FROM usuario";
    try {
      var result = await bdApi.query(query);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function updateUserById(id_usuario,id_tipousuario){
  return new Promise(async (resolve,reject)=>{
    var query="UPDATE usario SET id_tipousuario="+id_tipousuario+" WHERE id_usuario="+id_usuario;
    try {
      result=await bdApi.query(query);
      resolve({msg="Usuario actualizado",result});
    } catch (error) {
      reject(error);
    }
  });
}
module.exports.getAllUsers = getAllUsers;
module.exports.deleteUser = deleteUser;
module.exports.logIn = logIn;
module.exports.createUser = createUser;
module.exports.updateUserById = updateUserById;

 