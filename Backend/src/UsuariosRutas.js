var bodyParser = require('body-parser')
var express = require('express');
var usrApi = require('./Usuarios.js')
var productsApi = require('./Products.js')

var usrRouter = express.Router();

//import colorsCodes  from './colorCodes'
var colorCodes = require("./colorCodes");
var colors = colorCodes.colors;

usrRouter.get("/Login/:usuario/:pass", async function(req, res) {
    try {
        var usuario = req.params.usuario;
        var pass = req.params.pass;
        var qResult = await usrApi.logIn(usuario, pass);
        res.json(qResult);
        console.debug(colors.green + "UsuariosRutas ->" + colors.cyan + JSON.stringify(qResult));

    } catch (error) {
        console.log(new Error(colors.red + "[UsuariosRutas]-> " + error));
    }
});

// JSON MODEL (NewUserModel)
/*
 {
  "usr":"54ul",
  "email":"54ulxd@gmail.com",
  "pass":"somesecret"
 }
*/


usrRouter.use(bodyParser.json());
usrRouter.post("/Register", async(req, res) => {
    try {
        console.debug(req.body)
        var responseFromCreateUser = await usrApi.createUser(req.body);
        res.json(responseFromCreateUser);
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});

usrRouter.use(bodyParser.json());
usrRouter.get("/Delete/:id_usuario", async(req, res) => {
    try {
        var id_usuario = req.params.id_usuario;
        var responseFromDeleteUser = await usrApi.deleteUser(id_usuario);
        res.json(responseFromDeleteUser);
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});

usrRouter.use(bodyParser.json());
usrRouter.get("/GetAllUsers", async(req, res) => {
    try {
        var responseFromUsers = await usrApi.getAllUsers();
        // res.json(responseFromUsers);
        res.json({ usuarios: responseFromUsers });

    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});

usrRouter.use(bodyParser.json());
usrRouter.post("/updateUserById/:id_usuario/:id_tipo/:nombre", async(req, res) => {
    try {
        var id_usuario = req.param.id_usuario;
        var id_tipo = req.param.id_tipo;
        var nombre = req.param.nombre;

        var responseFromUpdateUsers = await usrApi.updateUserById(id_usuario, id_tipo, nombre);
        res.json(responseFromUpdateUsers);
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});

usrRouter.get('/getHistory/:token', async(req,res)=>{

    try {
        var token = req.params.token;
        var resGetHistory = await productsApi.getHistory(token);

        if(resGetHistory!= undefined && Object.keys(resGetHistory).length != 0){
            console.log(resGetHistory);
            console.log(colors.magenta + "History: " + JSON.stringify(resGetHistory));
            res.send(JSON.stringify(resGetHistory));
        } else{
            console.log("History undefined");
            res.send(undefined);
        }      
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }    
});

usrRouter.get('/logOut/:token', async(req, res) => {
    const token = req.params.token;

    try {
        var logOutResponse = await usrApi.logOut(token);

        if (logOutResponse != undefined && logOutResponse === true) {
            console.log("Sesión cerrada con éxito!");
            res.send(true)
        } else {
            console.log("No se pudo cerrar la sesión");
            res.send(false)
        }

    } catch (error) {
        console.log(new Error(colors.red + "[ProductosRutas]-> " + colors.white + error));
    }
})

usrRouter.use(bodyParser.json());
usrRouter.get("/getUserAmount/:id_usuario", async(req, res)=> {
    try {
        var tkn = req.params.id_usuario;
        var responseFromGetUserAmount = await usrApi.getUserAmount(tkn);
        console.log(responseFromGetUserAmount);
        res.json(responseFromGetUserAmount);
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});




module.exports.usrRouter = usrRouter;