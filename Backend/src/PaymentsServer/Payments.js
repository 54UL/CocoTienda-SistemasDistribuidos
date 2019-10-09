var  mwApi     = require('../BDMiddleWareApi.js')
var  dbDriver  = require('../BDDriverAPI.js')

dbDriver.init();
var  mysql = mwApi.globalApiManager.getApi("highlevel");


//orgTkn: origin token, amount: how much cost
//returns:


function requestTransaction(orgTkn,amount)
{

    //token,saldo,
    mysql.query("SELECT +",(result)
    {

    });

}

//orgTkn: origin, user, dest: destionation
function authTransaction(orgTkn,dest)
{

}


//usr: nombre de usuario
//returns: el dinero que tiene
function getFounds(usr)
{

}


//tkn: token de admin, usr: usuario a enviar dinero, amount: cantidad
function setFounds(tkn,amount)
{

}


module.exports.requestTransaction = requestTransaction;
module.exports.authTransaction = authTransaction;
module.exports.getFounds = getFounds;
module.exports.setFounds = setFounds;

