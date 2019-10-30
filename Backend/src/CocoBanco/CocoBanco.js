var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')

//AQUI HAY UN BUG CON EL GESTIONADOR DE LAS API'S
dbDriver.init();
var  bdApi =    mwApi.globalApiManager.getApi("highlevel");
//Members of user sys
var MAX_ELEMENTS=400;

function validationPipe(NewUserModel)
{
      var responseModel = {asignedToken:0,msg:""}
      var errorString ="";
      var hasOcurredAnError=false;

      if(NewUserModel.saldo=="0")
      {
        errorString+="No se puede crear una cuenta con saldo 0";
        hasOcurredAnError = true;
      }
      
      if(NewUserModel.email==="")
      {
        errorString+="\n No se permite email vacio";
        hasOcurredAnError = true;
      }
                
      if(NewUserModel.pass==="")
      {
        errorString+="\n No se permite pass vacio";
        hasOcurredAnError = true;
      }

      if(hasOcurredAnError)
      {
        responseModel.asignedToken = 0;
        responseModel.msg = errorString;
      }
     return responseModel;
}

function createAccount(NewAccountModel){
    return new Promise(async(resolve,reject)=>{
        try{
            var responseModel = {asignedToken:0,msg:"text"};
            const error = validationPipe(NewAccountModel);
            if(error.msg !="")
            resolve(error);
            else{
                var query="INSERT INTO cocobanco VALUES (0, '"+NewAccountModel.saldo+"','"+NewAccountModel.email+"','"+NewAccountModel.pass+"')";
                var result = await bdApi.query(query);
            } 
            responseModel.asignedToken=result.insertId;
            responseModel.msg="Cuenta creada";
            resolve(responseModel);
        }
        catch (error) {
            reject(error);
        }
    });
}

function updateAmount(id_account,NewAmmount){
    return new Promise(async (resolve,reject)=>{
        try{
            query = "UPDATE FROM cocobanco SET Saldo='"+NewAmmount+"' WHERE ID_Cuenta='"+id_account+"'";
            var result = await bdApi.query(query);
            resolve({msg:"Cuenta actualizada",result}); 
        }
        catch(error){
            reject(error);
        }
    });
}

function deleteAccount(id_account){
    return new Promise(async (resolve, reject)=>
    {
        try {
            query = "DELETE FROM Cocobanco WHERE ID_Cuenta = '" + id_account + "'";
            var result = await bdApi.query(query);
            resolve({msg:"Cuenta eliminada", result});
        } 
        catch (error){
            reject(error);
        }
    });
}

function getAccounts()
{
    return new Promise(async (resolve, resolve)=>{
        try{
            query = "SELECT * FROM Cocobanco";
            var result = wait bdApi.query(query);
            resolve({msg:"Cuentas obtenidas", result});
        }
        catch(error){
            reject(error);
        }
    })
}

module.exports.createAccount = createAccount;
module.exports.updateAmount = updateAmount;
module.exports.getAccounts = getAccounts;
module.exports.deleteAccount = deleteAccount;