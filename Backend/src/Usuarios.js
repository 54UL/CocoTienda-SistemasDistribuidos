//API DE USUARIOS
import {globalApiManager} from "BDMiddleWareApi.js";








var MAX_ELEMENTS=400
var generatedTokens[MAX_ELEMENTS];

bd = globalApiManager.getApi("highlevel");

function verifyToken(token)
{


}

function generateToken()
{

return 1;
}

function logIn(user,pass)
{
    //"{0}{1}".format("{1}", "{0}")

  var Query ="SELECT user,pass FROM TUSUARIOS WHERE user==${user} AND pass==${pass}";
  var rows=  bd.query(Query);
  var token;

  if(rows['usuario'] !=null)
  {
    if(row['password'] !=null )
    {
        return generateToken();
    }
  }

  return 0;
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

export{logIn,verifyToken}