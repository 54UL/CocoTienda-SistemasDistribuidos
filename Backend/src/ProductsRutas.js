var express        = require('express')
var productsRouter = express.Router()
var productsApi    = require('./Products.js')
//ESTO MOVERLO A PRODUCTO RUTAS .JS


productsRouter.get('/retrive/:category', function (req, res) 
{
   var category = req.params.category;
   productsApi.retriveProducts(category,(products)=>
   {
      res.json({productos : products});
   });
});

// productsRouter.get('/buy/:productid/:token', (req,res)=>{
//    var productid = req.params.productid;
//    var token = req.params.token;

//    var objRes = {
//       token: token,
//       msg: "The product id you wanna buy is: "+productid,
//    };
//    //Here would go the database query for the product requested or the handler for the next middleware step
//    res.send(objRes);

// });

productsRouter.route('/buy/:productid/:token')
   .get(function(req,res,next)
   {
      var productid = req.params.productid;
      var token = req.params.token;

      productsApi.buyProduct(productid,token,(buyInfo)=>
      {
         console.debug(buyInfo);
         res.json(buyInfo);    
      });
      
    
   })
module.exports.productsRouter = productsRouter;