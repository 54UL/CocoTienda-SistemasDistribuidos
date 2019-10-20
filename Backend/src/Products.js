var  mwApi     = require('./BDMiddleWareApi.js')
var  dbDriver  = require('./BDDriverAPI.js')
var  paymentsApi  = require('./PaymentsAPI.js') 

dbDriver.init();
var  bdApi = mwApi.globalApiManager.getApi("highlevel");
const DEFAULT_SHOP_BANK_ACCOUNT=11;


class VirtualProduct
{   
      constructor(productID,actual,stock)
      {
       

      }
}

// map.set(ID_PRODUCTO,VSTOCK) VirtualStock
var VirtualStock = new Map(0,"");

//map.set(BUY_REQUEST,ID_USUARIO)
var BuyRequests  = new Map()

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

//VIRTUAL STOCK


//CRUD
async function createProduct(productModel)
{
      try 
      {
            return new Promise((resolve,reject)=>
            {
            resolve(productModel);
            })
      } 
      catch (error) {
            
      }  
}

// virtual stock
//Todos los productos cuando se creen o se modifiquen, seran actualizados en el virtual stock
//el virtual stock decide quien puede comprar y actualizando el stock de esa posible compra
//Algoritmo virtual stock
//aparta un producto para N cantidad de compra y decrementa el virtual stock para ese elemento
//si se ha realizado una compra con ese id de compra, decrementara el stock del producto en la bd dado el valor de virtual stock de ese producto


//Algoritmo request buy
//preguntar el Virtualstock del articulo para N,
//Si hay stock para ese id de compra, asignarselo a un usuario en un mapa
//


//Algoritmo buyProduct
//Select de la tabla de productos (fila)
//authTransaction(usrToken,1,precio);
//si todo bien
//insertar info en la tabla de compras
//Mostrara error

//Params
// arg: product id
// id del producto de la bd
// arg: usrToken
// id del usuario de la tabla de gift



async function buyProduct(productID,usrToken)
{
      try {
      return new Promise(async (resolve,reject)=>
      {
            var resultModel =  {compra:0,msg :"compra fallida;"};
           
            //busqueda del producto a comprar en la BD (validacion)
            var products;
            try
            {
                  var getPriceQuery= "SELECT * FROM producto where id_producto ="+productID;
                  products= await bdApi.query(getPriceQuery);
            } 
            catch (error) 
            {
                  reject(error);
            }
          
            //producto invalido :(
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