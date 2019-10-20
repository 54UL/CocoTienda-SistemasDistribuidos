var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  paymentsApi  = require('./PaymentsAPI.js') 

dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");


async function retriveProducts(cat,cb)
{
   return new Promise(async(resolve,reject)=>
   {
      var queryString ="";

      if(cat!=0)
      {
      queryString = "SELECT * from Producto  where id_categoria  ="+cat;
      }
      else
      queryString = "SELECT * from Producto";

      try {
            var products = await bdApi.query(queryString);
            resolve(products)
      } catch (error) {
          reject(error);  
      }
   })
}

//Select de la tabla de productos (fila)
//Obtener el precio y preguntar si hay stock para n pedido

//authTransaction(usrToken,1,precio);
//si todo bien
//insertar info en la tabla de compras
//Mostrara error


const DEFAULT_SHOP_BANK_ACCOUNT=11;

async function buyProduct(productID,usrToken)
{
      try {
      return new Promise(async (resolve,reject)=>
      {
            var resultModel =  {compra:0,msg :"compra fallida;"};
           
            var products;

            try {
                  var getPriceQuery= "SELECT * FROM producto where id_producto ="+productID;
                  products= await bdApi.query(getPriceQuery);
            } catch (error) {
                  reject(error);
            }
          

            var product = products[0];
            if(product == undefined)
            {
            resolve(resultModel);
            }
           
            var transactionRes;

            try {
             transactionRes = await paymentsApi.authTransaction(usrToken,DEFAULT_SHOP_BANK_ACCOUNT,product.precio_unitario);
            } catch (error) {
             reject(error);
            }
         
            
            //TO DO: modificar esto por mensajes lejibles de respuesta
            if(transactionRes.transaction==1)
            {
                  var insertRes;
                  try {
                   var insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto) values (0,"+usrToken+","+product.id_producto+")";
                   insertRes = await bdApi.query(insertBuyQuery); 
                  } catch (error) {
                    reject(error);
                  }
              
                  resultModel.compra = insertRes.insertId;
                  resultModel.msg = "compra exitosa !";
                  console.log("succesful buy!");
                  resolve(resultModel);    
            }  
            else
            {
                  resultModel.compra =0;
                  resultModel.msg = transactionRes.msg;
                  resolve(resultModel);
            }                   
      })
           
      } catch (error) {
            console.log(error);
      }    
}



module.exports.retriveProducts = retriveProducts;
module.exports.buyProduct=buyProduct;