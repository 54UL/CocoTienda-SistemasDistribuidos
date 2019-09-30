//var express = require('express');

var  mwApi     = require('./BDMiddleWareApi.js')
var  bdApi = mwApi.globalApiManager.getApi("highlevel");


//API DE USUARIOS
//var globalApiManager = require('./cocoBackend/BDMiddleWareApi.js/index.js');
//bd = globalApiManager.getApi("highlevel");

//Members of user sys
var MAX_ELEMENTS=400;
//var generatedTokens[];

//returns an unique random number
function  generateUniqueToken()
{
return 666;
}

//checks if the token is valid (unique) and the most important, if is asigned to someone
function verifyToken(token)
{


}
//return an user
function identifyToken(token)
{

}




//arguments -> trivial, returns an auth token ( used by everything)
function logIn (user,pass)
{
    //"{0}{1}".format("{1}", "{0}")
  /*
  var Query ="SELECT user,pass FROM TUSUARIOS WHERE user==${user} AND pass==${pass}";
  var rows=  bd.query(Query);
  var token;

  if(rows['usuario'] !=null)
  {
    if(row['password'] !=null )
    {
        return UsersCore.generateUniqueToken();
    }
  }
*/
    var message ="bienvenido =)";
    var asignedToken=0;
    if(user == "admin")
    {
      if(pass =="admin")
      {
        asignedToken = generateUniqueToken();
      }
      else
      message = "error,clave o pass incorrectos";
    }
    else
    message = "error,clave o pass incorrectos";

    return {asignedToken,message};
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
