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
            var currencyOrg = await getFounds(orgTkn);

            if(currencyOrg.status == "ok"){
                console.log("Server: "+JSON.stringify(currencyOrg));

                if(currencyOrg.founds>0 && currencyOrg.founds>=amount)
                {
                    //Quitamos dinero

                    //Todo: verify if dest user exits before making 


                    var currentCurrencyOrg = currencyOrg.founds -amount;
                    //We substract amout of the product
                    await setFounds(orgTkn,Number(currentCurrencyOrg));
                    console.log("It works til here");
                    //Obtenemos el dinero de la cuenta destinataria y luego se le sumara el amount

                    var currencyDest = await getFounds(dest);

                    if(currencyOrg.status == "ok"){
                        var currentCurrencyDest = Number(currencyDest)+Number(amount);
                        await setFounds(dest,currentCurrencyDest);
    
                        resultModel.transaction =1;
                        resultModel.msg="Transaccion realizada con exito";
                    }else{
                        resultModel.transaction =1;
                        resultModel.msg=currencyDest.errorMessage;
                        console.log("ServerPayments: "+ currencyOrg.errorMessage);
                    }

                   
                }
                else
                {
                    resultModel.transaction =0;
                    resultModel.msg="nel, no tienes feria";
                    resolve(resultModel);
                }
            }else{
                resultModel.transaction =0;
                resultModel.msg = currencyOrg.errorMessage;
                resolve(resultModel);
            }                             
        } catch (error) {
            reject(error);
        }
    })
    
    
}

//usr: nombre de usuario
//returns: el dinero que tiene
function getFounds(usr){

    return new Promise((resolve,reject)=>{

        try {
            mysql.query("SELECT * from cuentas where ID_UsuarioGift="+usr, (result)=>{  
                var firstOf = result[0];
                if(firstOf == undefined || firstOf == null){
                    resolve(
                            {
                                "status": "error",
                                "errorCode": 1,
                                "errorMessage": "User not found"
                            }
                        )
                }
                else{

                    console.log(JSON.stringify(firstOf));
                    mysql.query("SELECT * from cocobanco where ID_Cuenta="+firstOf.ID_Cuenta,(cocoBancoResult)=>{

                        if(cocoBancoResult == null || cocoBancoResult == undefined){
                            resolve(
                                {
                                    "status": "error",
                                    "errorCode": 2,
                                    "errorMessage": "CocoBancoAccount not found"
                                }
                            )
                        }else{
                            resolve(
                                {
                                    "status": "ok",
                                    "errorCode": 0,
                                    "errorMessage": null,
                                    "founds": Number(cocoBancoResult[0].Saldo)
                                }
                            )
                        }    
                    }) 
                }                
            })
        } catch (error) {
            console.log(new Error(error));
            reject(error);
        }        
    })
    
}

//tkn: token de admin, usr: usuario a enviar dinero, amount: cantidad
function setFounds(tkn,amount)
{
    return new Promise((resolve,reject)=>{
        try {
            mysql.query("SELECT * from cuentas where ID_UsuarioGift="+tkn,(result)=>
            {
                if(result != null){
                    mysql.query("UPDATE cocobanco SET Saldo="+Number(amount)+" where ID_Cuenta ="+result[0].ID_Cuenta,(upRes)=>{
                        resolve();
                    });
                }else{
                    resolve("user not found");
                }
            })
            
        } catch (error) {
            reject(error);
        }
    })
}


module.exports.requestTransaction = requestTransaction;
module.exports.authTransaction = authTransaction;
module.exports.getFounds = getFounds;
module.exports.setFounds = setFounds;

