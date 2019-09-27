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

module.exports.productsRouter = productsRouter;