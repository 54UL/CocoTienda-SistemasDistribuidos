var express        = require('express')
var productsRouter = express.Router()
var productsApi    = require('./Products.js')
//ESTO MOVERLO A PRODUCTO RUTAS .JS


productsRouter.get('/retrive/:category', function (req, res) 
{
   var category = req.params.category;
   productsApi.retriveProducts(category,(products)=>
   {
      res.json(products);
   });
});
module.exports.productsRouter = productsRouter;