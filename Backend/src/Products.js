var mwApi = require('./BDMiddleWareApi.js')
var dbDriver = require('./BDDriverAPI.js')
var paymentsApi = require('./PaymentsAPI.js')
var fs  = require("fs")
dbDriver.init();
var bdApi = mwApi.globalApiManager.getApi("highlevel");
const DEFAULT_SHOP_BANK_ACCOUNT = 12;

function getHistory(usrTkn){

      return new Promise(async (resolve, reject)=>{
            try {
                  
                  let queryGetHistory = 
                  "SELECT producto.imagen, producto.nombre, producto.id_producto, producto.precio_unitario, compra.cantidad "+
                  "from compra "+
                  "inner join usuario on usuario.id_usuario = compra.id_usuario "+
                  "inner join producto on producto.id_producto = compra.id_producto "+
                  "where compra.id_usuario = '" + usrTkn + "';";

                  var resultQuery = await bdApi.query(queryGetHistory);
                  resolve(resultQuery != undefined ? resultQuery:undefined);  

            } catch (error) {
                  reject(error);
            }
      })
}


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


//input json: product{name:"",imgName:"",imgData:[],price:777,stock:30,category:0}
//outputjson: response{status:0,msg:""}

//LOS RESPONSES YA SE DEFINEN EN MODELOS
class CreatedProductResponse
{
      constructor(resStatus,resMsg)
      {
            this.status = resStatus;
            this.msg = resMsg;
      }
}

async function createProduct(productModel) 
{
      return new Promise(async(resolve, reject) =>
       {
       var imagePath =  "img/";
      switch(productModel.category)
      {
            case 1:
            imagePath += "Cachuchas/"
            break;
            case 2:
            imagePath += "Camisas/"
            break;
            case 3:
            imagePath += "LLaveros/"
            break;
            case 4:
            imagePath += "Tazas/"
            break;
      }
      var imageFolderPath = imagePath+productModel.imgName;
      var insertProductQry = 
      "INSERT INTO producto(id_producto, nombre, id_categoria, cantidad, precio_unitario, imagen)  \
      VALUES (0,'"+productModel.name+"',"+productModel.category+","+productModel.stock+","+productModel.price+",'"+imageFolderPath+"')";
      
      try {
            await bdApi.query(insertProductQry);
      } catch (error) {
            reject(error);
      }
      var inputBuff = new Buffer.from(productModel.imgData);
      var relativePath = "../../FrontEnd/"+imageFolderPath
  

      fs.writeFileSync(relativePath,inputBuff);
      // console.debug(productModel);
       resolve(new CreatedProductResponse(1,"producto creado"))
      })
}

//input json: product{id:0,price:0,stock:0}
//outputjson: response{status:0,msg:""}
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
//input json: product{id:0}
//outputjson: response{status:0,msg:""}
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

class BuyRequestToken {
      constructor(token, quantity, productid) {
            this.orderToken = token;
            this.orderQuantity = quantity;
            this.productID = productid;
      }
}

// map.set(ID_PRODUCTO,VSTOCK) VirtualStock
var VirtualStock = new Map()
//map.set(ID_USUARIO,BuyRequestToken) Buy request
var BuyRequests = new Map()


//VIRTUAL STOCK 
//BRIEF:le asigna un ID de compra a un usuario; si hay suficiente stock le dejara apartar; despues  la compra
//buscara en el mapa un indice valido relacionado con el usuario; si es valido realizara la transaccion
//y despues quitara el id del mapa y actualizara el virtual stock con los valores de la bd (doble lado)

async function getBDStock(productID) {
      return new Promise(async (resolve, reject) => {
            try {
                  var stockResult = await bdApi.query("SELECT * FROM producto WHERE id_producto=" + productID);
                  if (stockResult[0] != undefined) {
                        resolve({ stock: stockResult[0].cantidad });
                  }
                  else
                        resolve({ stock: -1 })
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
                  
                        resolve({ status: 1 })
                  
            }
            catch (error) {
                  reject(error);
            }
      })
}




function printVirtualStock() {
      console.log("-------------------")
      console.log("VIRTUAL STOCK DEBUG")
      console.debug(VirtualStock);
      console.log("REQUEST BUY DEBUG")
      console.debug(BuyRequests);
      console.log("-------------------")
}

//TO DO : DEFINIR MODELOS DE ENTRADA Y SALIDA
//OUTPUT MODEL {request_tkn,msg}
var indextoken = 0;
async function requestBuy(productID, userTkn, Amount) {
      return new Promise(async (resolve, reject) => {
            if (VirtualStock.has(productID)) {
                  var productStock = VirtualStock.get(productID);
                  var remainingStock = productStock - Amount;

                  if (remainingStock >= 0) {
                        var buyRequestToken = ++indextoken // super ultra mega complex algorithm to retrive a token
                        console.log("asigned token=" + BuyRequests.size);
                         if(!BuyRequests.has(userTkn))
                         {
                        var orderReq = new BuyRequestToken(buyRequestToken, Amount, productID);
                        console.log("ORDER REQUEST:");
                        console.debug(orderReq);
                        BuyRequests.set(userTkn, orderReq);
                         }
                          else
                          {
                          resolve({request_tkn:0,msg:"ya tienes apartado este producto; realiza una compra"}) 
                           return;
                          }

                        ///actualizamos el mapa
                        VirtualStock.delete(productID);
                        VirtualStock.set(productID, remainingStock);
                        resolve({ request_tkn: buyRequestToken, msg: "producto apartado!" })
                        return;
                  }
                  else
                        resolve({ request_tkn: 0, msg: "YA NO HAY STOCK EN ESPERA" });
            }
            else {
                  try {
                        var resultBD = await getBDStock(productID);
                        if (resultBD.stock > 0) {
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

//compara la autorizacion para comprar
//realiza el cambio de stock en la bd, comprueba por ultima vez si hay stock valido
//RETURN MODEL
//{status:"ok/error",msg:"custom message",orderReq:BuyRequestToken}

async function authBuy(productID, userTkn) {
      return new Promise(async (resolve, reject) => {
            try {
                  if (BuyRequests.has(userTkn)) {
                        var pendingBuyRequest = BuyRequests.get(userTkn);

                        //safty validation
                        if (pendingBuyRequest.productID != productID) {
                              resolve({ status: "error", msg: "¿tienes alguna compra pendiente ?,cancela la orden antes de querer comprar otro producto" });
                              return;
                        }

                        //Double check stock, then 
                        if (VirtualStock.has(productID)) {
                              var actualVirtualStock = VirtualStock.get(productID)
                              if (actualVirtualStock >= 0) {

                                    resolve({ status: "ok", msg: "succesful auth", orderReq: pendingBuyRequest })
                              }
                              else {
                                    resolve({ status: "error", msg: "inesperadamente sin stock, compra cancelada." });
                                    BuyRequests.delete(userTkn);
                              }
                        }
                        else {
                              resolve({ status: "error", msg: "producto aun sin apartar" })
                        }
                  }
                  else {
                        resolve({ status: "error", msg: "no has apartado el producto!" });
                  }
            } catch (error) {
                  reject(error);
            }
      })
}

 async function finalizeBuy(productID, usrTkn) {
      return new Promise(async(resolve,reject)=>
      {
            try {
                  var actualVirtualStock = VirtualStock.get(productID)
                  var status = await updateStock(productID, actualVirtualStock);
                  BuyRequests.delete(usrTkn);
                  resolve(null)
            } catch (error) {
                  reject(error);
            }     
      })  
}

 
//Realizar refactor....
async function buyProduct(productID, usrToken,quantity) {
      try {
            return new Promise(async (resolve, reject) => {
                  var resultModel = { compra: 0, msg: "compra fallida;" };

             try {
                  var buyRequest =  await requestBuy(productID,usrToken,quantity);
                  console.debug(buyRequest);

                  if(buyRequest.request_tkn == 0)
                  {
                        resultModel.msg = buyRequest.msg;
                        resolve(resultModel);
                        return;
                  }
             } catch (error) {
                reject(error)   
             }
             
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
                  var orderRequest;

                  try {
                        orderRequest = await authBuy(productID, usrToken);
                  } catch (error) {
                        reject(error);
                  }

                  if (orderRequest.status !== "ok") {
                        resolve({ compra: 0, msg: "buy auth status exception:" + orderRequest.msg });
                        return;
                  }
                  console.debug(orderRequest);
                  /*
                  var buyRqst =  BuyRequests.get(usrToken);
                  console.debug(buyRqst);
                  if(buyRqst ==undefined)
                  {
                        resultModel.msg="no se encontro el request de compra";
                        resolve(resultModel);
                        return;
                  }
                  */

                  var transactionRes;

                  try {
                        var cost = Number(product.precio_unitario * orderRequest.orderReq.orderQuantity);
                        console.log("actual cost " + cost)
                        transactionRes = await paymentsApi.authTransaction(usrToken, DEFAULT_SHOP_BANK_ACCOUNT, cost);
                  } catch (error) {
                        reject(error);
                  }

                  if (transactionRes.transaction == 1) {

                        try 
                        {
                              await finalizeBuy(productID, usrToken);
                        }
                        catch (error) {
                              reject(error)
                        }

                        var insertRes;
                        try {
                              var insertBuyQuery = "INSERT INTO compra (id_compra,id_usuario,id_producto,cantidad) values (0," + usrToken + "," + product.id_producto + ", " + quantity + ")";
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
module.exports.getHistory = getHistory;
module.exports.buyProduct = buyProduct;
module.exports.updateStock = updateStock;
module.exports.getBDStock = getBDStock;
module.exports.requestBuy = requestBuy;
module.exports.printVirtualStock = printVirtualStock;
//CRUD
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
