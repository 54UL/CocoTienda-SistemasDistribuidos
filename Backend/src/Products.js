var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  paymentsApi  = require('./PaymentsAPI.js') 

dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");


function retriveProducts(cat,cb)
{
   var queryString ="";
   if(cat!=0)
   {
    queryString = "SELECT * from Producto  where id_categoria  ="+cat;
   }
   else
   queryString = "SELECT * from Producto";

   bdApi.query(queryString,
   ( products )=>{
      console.debug(products)
      cb(products)
   });
}

//Select de la tabla de productos (fila)
//Obtener el precio
//authTransaction(usrToken,1,precio);
//si todo bien
//insertar info en la tabla de compras
//Mostrara error


const DEFAULT_SHOP_BANK_ACCOUNT=22;

function buyProduct(product,usrToken,callback)
{
      var resultModel =  {compra:0,msg :"compra fallida;"};
      var getPriceQuery= "SELECT * FROM producto where id_producto ="+product;
      bdApi.query(getPriceQuery,(products)=>
      {
            
            var product = products[0];
            if(product == undefined)
            {
                  callback(resultModel);
                  return;
            }
            console.debug(product);
            paymentsApi.authTransaction(usrToken,DEFAULT_SHOP_BANK_ACCOUNT,
                                        product.precio_unitario,
                                        (transactionRes)=>
            {
                  if(transactionRes.transaction==1)
                  {
                  var insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto) values (0,"+usrToken+","+product.id_producto+")";
                  bdApi.query(insertBuyQuery,(insertRes)=>
                  {
                    resultModel.compra = insertRes.insertId;
                    resultModel.msg = "compra exitosa !";
                    console.log("succesful buy!");
                    callback(resultModel);
                  });
                  
                  }
                  else
                  {
                  resultModel.compra =0;
                  resultModel.msg = transactionRes.msg;
                  callback(resultModel);
                  }    
            })
      });
}



module.exports.retriveProducts = retriveProducts;
module.exports.buyProduct=buyProduct;