var bodyParser = require('body-parser')
var express = require('express');
var accountApi = require('./CocoBanco.js')
var cocoRouter = express.Router();

var colorCodes = require("../colorCodes");
var colors = colorCodes.colors;

cocoRouter.use(bodyParser.json());
cocoRouter.post("/createAccount/", async(req,res)=>{
    try {
         //var userModel = req.body
        console.debug(req.body);
        var ResponseFromCreateAccount = await accountApi.createAccount(req.body);
        res.json(ResponseFromCreateAccount);        
    } catch (error) {
        console.error(new Error(colors.yellow + "CocoBancoRutas ->" + colors.red + error));
    }
});

cocoRouter.use(bodyParser.json());
cocoRouter.post("/updateAmmount/:id_account/:ammount" , async(req,res)=>{
    try {
        var id_account= req.params.id_account;
        var ammount = req.params.ammount;

        var ResponseFromUpdateAmmount = await accountApi.updateAmount(id_account, ammount);
        res.json(ResponseFromUpdateAmmount);
        
    } catch (error) {
        console.error(new Error(colors.yellow + "CocoBancoRutas ->" + colors.red + error));
    }
});

cocoRouter.use(bodyParser.json());
cocoRouter.post("/DeleteAccount/:id_account", async(req, res)=>{
    try {
        var id_account = req.params.id_account;

        var RespomnseFromDeleteAccount = await accountApi.deleteAccount(id_account);
        res.json(RespomnseFromDeleteAccount);

    } catch (error) {
        console.error(new Error(colors.yellow + "CocoBancoRutas ->" + colors.red + error));
    }
});

cocoRouter.get("/getAccount/", async(req,res)=>{
    try {
        var ResponseFromAccounts = await accountApi.getAccounts();
        res.json(ResponseFromAccounts);
        
    } catch (error) {
        console.error(new Error(colors.yellow + "CocoBancoRutas ->" + colors.red + error));
    }
});


//FALTAN LOS MODULES EXPORTS