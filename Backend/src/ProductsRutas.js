var express = require('express')
var productsRouter = express.Router()
var productsApi = require('./Products.js')
var bodyParser = require("body-parser")
var colorCodes = require("./colorCodes");
var colors = colorCodes.colors;
productsRouter.get('/retrive/:category', async function (req, res) {
    var category = req.params.category;
    var products = await productsApi.retriveProducts(category)
    res.json({ productos: products });
});

productsRouter.use(bodyParser.json());
productsRouter.route('/CreateProduct')
    .post(async (req, res, next) => {
        // var productModel = JSON.parse(req.body);
        // console.debug(req.body);
        //para guardar la imagen en el servidor
        try {
            var onCreatedProductResponse = await productsApi.createProduct(req.body)
            res.json(onCreatedProductResponse);
        } catch (error) {
            res.json(error);
        }
    })

productsRouter.use(bodyParser.json());
productsRouter.route('/UpdateProduct')
    .post(async (req, res, next) => {
        try {
            let result = await productsApi.updateProduct(req.body);
            res.json(result);
        } catch (error) {
            console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
        }
    })


productsRouter.route('/DeleteProduct/:productID')
    .post(async (req, res, next) => {
        try {
            let id = req.params.productID;
            let result = await productsApi.deleteProduct(id);
            res.json(result);
        } catch (error) {
            console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
        }
    })

productsRouter.route('/buy/:productid/:token/:amount')
    .get(async (req, res, next) => {
        var productid = req.params.productid;
        var token = req.params.token;
        var qnty = req.params.amount
        try {
            var response = await productsApi.buyProduct(productid, token, qnty)
            res.json(response);
        } catch (error) {
            console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
        }
    })

productsRouter.route('/GetHistory/:tokenID')
    .get(async (req, res, next) => {
        var usrToken = req.params.tokenID;
        console.log("HOLA!!")
        try {
            var response = await productsApi.getHistory(usrToken)
            res.json(response);
        } catch (error) {
            console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
        }
    })
module.exports.productsRouter = productsRouter;