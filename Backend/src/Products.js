var mwApi = require('./BDMiddleWareApi.js')
var dbDriver = require('./BDDriverAPI.js')
var paymentsApi = require('./PaymentsAPI.js')

dbDriver.init();
var bdApi = mwApi.globalApiManager.getApi("highlevel");
const DEFAULT_SHOP_BANK_ACCOUNT = 11;

//------------------------------------------- CRUD PRODUCTS

async function retriveProducts(cat, cb) {
      return new Promise(async (resolve, reject) => {
            var queryString = "";

            if (cat != 0) {
                  queryString = "SELECT * from Producto  where id_categoria  =" + cat;
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

async function createProduct(productModel) {
      try {
            return new Promise((resolve, reject) => {
                  resolve(productModel);
            })
      }
      catch (error) 
      {
            reject(error)
      }
}


async function updateProduct(productModel) {
      try {
            return new Promise((resolve, reject) => {
                  resolve(productModel);
            })
      }
      catch (error) {
            reject(error)
      }
}

async function deleteProduct(productModel) {
      try {
            return new Promise((resolve, reject) => {
                  resolve(productModel);
            })
      }
      catch (error) {
            reject(error)
      }
}

//-------------------------------------------PRODUCT SELLING BUSINESS LOGIC

class buyToken
{
      constructor(token,quantity)
      {
      this.orderTokne = token;
      this.orderQuantity = quantity;
      }
}

// map.set(ID_PRODUCTO,VSTOCK) VirtualStock
var VirtualStock = new Map()
//map.set(ID_USUARIO,BUY_REQUEST_TKN) Buy request
var BuyRequests = new Map()


//VIRTUAL STOCK
//le asigna un ID de compra a un usuario; si hay suficiente stock le dejara apartar; despues  la compra
//buscara en el mapa un indice valido relacionado con el usuario; si es valido realizara la transaccion
//y despues quitara el id del mapa y actualizara el virtual stock con los valores de la bd (doble lado)

async function getBDStock(productID) {
      return new Promise(async (resolve, reject) => {
            try {
                  var stockResult = await bdApi.query("SELECT * FROM producto WHERE id_producto=" + productID);
                  if(stockResult[0]!=undefined)
                  {
                  resolve({ stock: stockResult[0].cantidad });
                  }
                  else
                  resolve({ stock: -1})
            }
            catch (error) {
                  reject(error);
            }
      })
}

async function updateStock(productID, stockValue) {
      return new Promise(async (resolve, reject) => {
            try {
                  var updateStock = "UPDATE producto SET cantidad =" + stockValue + " WHERE id_producto=" + productID;
                  var updateStatus = await bdApi.query(updateStock);
                  console.log("update status")
                  console.debug(updateStatus);

                  if (updateStatus[0] != undefined) {
                        resolve({ status: 0 })
                  }

            }
            catch (error) {
                  reject(error);
            }
      })
}


function printVirtualStock()
{
      console.log("VIRTUAL STOCK DEBUG")
      console.debug(VirtualStock);
      console.log("REQUEST BUY DEBUG")
      console.debug(BuyRequests);
}

//TO DO : DEFINIR MODELOS DE ENTRADA Y SALIDA
//OUTPUT MODEL {request_tkn,msg}
async function requestBuy(productID, userTkn, Amount) {
      return new Promise(async (resolve, reject) => 
      {
            if (VirtualStock.has(productID)) 
            {
                  var productStock = VirtualStock.get(productID);
                  var remainingStock = productStock - Amount;
                  console.log("requested stock "+remainingStock)
                  if (remainingStock > 0) 
                  {
                        var buyRequestToken = BuyRequests.size + 1
                        if(!BuyRequests.has(userTkn))
                        {
                           BuyRequests.set(userTkn,buyRequestToken);
                        }
                        else
                        {
                            resolve({request_tkn:0,msg:"ya tienes apartado este producto; realiza una compra"}) 
                            return;
                        }
                        
                        ///actualizamos el mapa
                        VirtualStock.delete(productID);
                        VirtualStock.set(productID,remainingStock);

                        resolve({request_tkn:buyRequestToken,msg:"producto apartado!"})
                  }
                  else
                        resolve({request_tkn:0,msg:"YA NO HAY STOCK EN ESPERA"});
            }
            else 
            {
                  try 
                  {
                        var resultBD = await getBDStock(productID);
                        if(resultBD.stock>0)
                        {
                              console.debug(resultBD);
                              VirtualStock.set(productID, Number(resultBD.stock));
                              resolve(await requestBuy(productID, userTkn, Amount));
                        }
                        else
                        resolve(0);
                      
                  }
                  catch (error) {
                        reject(error)
                  }
            }
      })
}


async function authBuy(productID,userTkn)
{
      return new Promise((resolve,reject)=>
      {
            

      })
}


async function buyProduct(productID, usrToken) {
      try {
            return new Promise(async (resolve, reject) => {
                  var resultModel = { compra: 0, msg: "compra fallida;" };

                  //busqueda del producto a comprar en la BD (validacion)
                  var products;
                  try {
                        var getPriceQuery = "SELECT * FROM producto where id_producto =" + productID;
                        products = await bdApi.query(getPriceQuery);
                  }
                  catch (error) {
                        reject(error);
                  }

                  //producto invalido :(
                  var product = products[0];
                  if (product == undefined) {
                        resolve(resultModel);
                  }

                  //autorizacion para comprar el producto:
                  var  orderRequest;
               
                  try {
                         orderRequest = await authBuy(productID,usrToken);
                  } catch (error) {
                        reject(error);
                  }
                  
                  var transactionRes;
                  if(orderRequest.status === "ok")
                  {
                        try {
                              transactionRes = await paymentsApi.authTransaction(usrToken, DEFAULT_SHOP_BANK_ACCOUNT, product.precio_unitario*orderRequest.orderCount);
                        } catch (error) {
                              reject(error);
                        }
                  }
                  else
                  {
                        resolve({ compra: 0, msg: "buy auth status exception:"+orderRequest.status});
                        return;
                  }
                  
                  //TO DO: modificar esto por mensajes lejibles de respuesta
                  if (transactionRes.transaction == 1) {
                        var insertRes;
                        try 
                        {
                              var insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto) values (0," + usrToken + "," + product.id_producto + ")";
                              insertRes = await bdApi.query(insertBuyQuery);
                        } catch (error) {
                              reject(error);
                        }
                        

                        resultModel.compra = insertRes.insertId;
                        resultModel.msg = "compra exitosa !";
                        console.log("succesful buy!");
                        resolve(resultModel);
                  }
                  else {
                        resultModel.compra = 0;
                        resultModel.msg = transactionRes.msg;
                        resolve(resultModel);
                  }
            })

      } catch (error) {
            console.log(error);
      }
}


module.exports.retriveProducts = retriveProducts;
module.exports.buyProduct = buyProduct;

//EXPERIMENTAL FEATURES
module.exports.updateStock = updateStock;
module.exports.getBDStock = getBDStock;
module.exports.requestBuy = requestBuy;
module.exports.printVirtualStock = printVirtualStock;