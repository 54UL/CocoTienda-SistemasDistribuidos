//var express = require('express');

var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')

//AQUI HAY UN BUG CON EL GESTIONADOR DE LAS API'S
dbDriver.init();
var  bdApi =    mwApi.globalApiManager.getApi("highlevel");
//Members of user sys
var MAX_ELEMENTS=400;


//checks if the token is valid (unique) and the most important, if is asigned to someone
function verifyToken(token)
{


}
//return an user
function identifyToken(token)
{

}

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
    
    if(firstOf==undefined)
    {
      message = "usuario no registrado";
      callback({asignedToken,message});
      return;
    }
  
    if(user === firstOf.nombre)
    {
      if(pass === firstOf.contrasenia)
        asignedToken =firstOf.id_usuario
      else
      message = "clave incorrecta";
    }
    callback({asignedToken,message});
  })
}

function createUser()
{

}

function deleteUser()
{


}

function getUser(id)
{


}

function getUserPriviliges(id)
{


}

module.exports.logIn = logIn;
