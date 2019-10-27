var express = require('express')
var productsRouter = express.Router()
var productsApi = require('./Products.js')
    //ESTO MOVERLO A PRODUCTO RUTAS .JS


productsRouter.get('/retrive/:category', async function(req, res) {
    var category = req.params.category;
    var products = await productsApi.retriveProducts(category)
    res.json({ productos: products });
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

productsRouter.route('/buy/:productid/:token/:amount')
    .get(async(req, res, next) => {
        var productid = req.params.productid;
        var token = req.params.token;
        var qnty =  req.params.amount
        try {
            var response = await productsApi.buyProduct(productid, token,qnty)
            res.json(response);
        } catch (error) {
            console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
        }
    })

/*
//request testing
productsRouter.route('/RequestBuy/:productid/:token/:amount')
    .get(async(req, res) => {

        var product = req.params.productid;
        var tkn = req.params.token;
        var amnt = req.params.amount;
        try {
            var response = await productsApi.requestBuy(product, tkn, amnt);
            productsApi.printVirtualStock();
            res.json(response);
        } catch (error) {
            res.json({ msg: "error:" + error });
        }

    })
*/
module.exports.productsRouter = productsRouter;