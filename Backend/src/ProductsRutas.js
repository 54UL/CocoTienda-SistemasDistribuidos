var express        = require('express')
var productsRouter = express.Router();

//ESTO MOVERLO A PRODUCTO RUTAS .JS
productsRouter.get('/retrive/:category', function (req, res) 
{
   var category = req.params.category;
   var arregloJSONPrueba =
   { "productos":[
                {nombre:"taza2",precio:"$666.6"},
                {nombre:"taza2",precio:"$234432.6"},
                {nombre:"taza3",precio:"$985.6"},
                {nombre:"taza100",precio:"$403.8"},
                {nombre:"taza100",precio:"$403.8"},
                {nombre:"taza100",precio:"$403.8"},
                {nombre:"taza100",precio:"$403.8"},
                {nombre:"taza100",precio:"$403.8"}
                ]
    };
   res.json(arregloJSONPrueba);
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
   .all(function (res,res,next){
      next();
   })
   .get(function(req,res,next){
      var productid = req.params.productid;
      var token = req.params.token;

      var objRes = {
         token: token,
         msg: "The product id you wanna buy is: "+productid,
      };
      //Here would go the database query for the product requested or the handler for the next middleware step
      res.json(objRes);
   })
module.exports.productsRouter = productsRouter;