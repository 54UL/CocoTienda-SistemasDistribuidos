var  mwApi     = require('../BDMiddleWareApi.js')
var  dbDriver  = require('../BDDriverAPI.js')
dbDriver.init();
var  mysql = mwApi.globalApiManager.getApi("highlevel");


//orgTkn: origin token, amount: how much cost
//returns:


function requestTransaction(orgTkn,amount)
{
    //token,saldo,
    mysql.query("SELECT +",(result)=>
    {

    });
}
/*
authTransaction(cuentaA,cuentaB,cantidad)
realizar query a la bd a la tabla de banco, si cuentaA = id en la tabla, obtener de la fila la cantidad de dinero
si cantidad de dinero > cantidad del argumento
realizar transaccion , update a la fila de la cuenta A en el campo de dinero - cantidad
update al campo dinero de la Cuenta B  la suma de su dinero actual + el que se le quito al usuario
*/
//orgTkn: origin, user, dest: destionation
function authTransaction(orgTkn,dest,amount)
{
    return new Promise(async (resolve,reject)=>{
        try {
            var resultModel =  {transaction:1,msg :""};
            var currencyOrg = await getFounds(orgTkn,(=>{

                if(currencyOrg>0 && currencyOrg>=amount)
                {
                    //Quitamos dinero
                    var currentCurrencyOrg = currencyOrg -amount;
                    setFounds(orgTkn,currentCurrencyOrg);
    
                    //Obtenemos el dinero de la cuenta destinataria y luego se le sumara el amount
                    getFounds(dest,(currencyDest)=>
                    {
                        var currentCurrencyDest = Number(currencyDest)+Number(amount);
                        setFounds(dest,currentCurrencyDest);
    
                        resultModel.transaction =1;
                        resultModel.msg="Transaccion realizada con exito";
                        callback(resultModel)
                    })
                }
                else
                {
                    resultModel.transaction =0;
                    resultModel.msg="nel, no tienes feria";
                    callback(resultModel)
                }
            })
        } catch (error) {
            
        }
    })
    
    
}

//usr: nombre de usuario
//returns: el dinero que tiene
function getFounds(usr){

    return new Promise((resolve,reject)=>{
        mysql.query("SELECT * from cuentas where ID_UsuarioGift="+usr, (result)=>{  
            var firstOf = result[0];
            if(firstOf == undefined || firstOf == null){
                reject({errorCode: 1,errorMessage: "User not found"})
            }
            else{
                mysql.query("SELECT * from cocobanco where ID_Cuenta="+firstOf[0].ID_Cuenta,(cocoBancoResult)=>{

                    if(cocoBancoResult == null || cocoBancoResult == undefined){
                        reject({errorCode: 1,errorMessage: "CocoBancoAccount not found"})
                    }else{
                        resolve(Number(cocoBancoResult[0].Saldo));
                    }

                }) 
            }
            
        })
    })
    
}

//tkn: token de admin, usr: usuario a enviar dinero, amount: cantidad
function setFounds(tkn,amount)
{
    mysql.query("SELECT * from cuentas where ID_UsuarioGift="+tkn,(result)=>
    {
        mysql.query("UPDATE cocobanco SET Saldo="+Number(amount)+" where ID_Cuenta ="+result[0].ID_Cuenta,(upRes)=>{});
    })
}


module.exports.requestTransaction = requestTransaction;
module.exports.authTransaction = authTransaction;
module.exports.getFounds = getFounds;
module.exports.setFounds = setFounds;

