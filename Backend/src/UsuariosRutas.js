var bodyParser = require('body-parser')
var express = require('express');
var usrApi = require('./Usuarios.js')
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
usrRouter.post("/Delete/:id_usuario", async(req, res) => {
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
usrRouter.post("/updateUserById/:id_usuario/:id_tipo", async(req, res) => {
    try {
        var id_usuario = req.param.id_usuario;
        var id_tipo = req.param.id_tipo;

        var responseFromUpdateUsers = await usrApi.updateUserById(id_usuario, id_tipo);
        res.json(responseFromUpdateUsers);
    } catch (error) {
        console.error(new Error(colors.yellow + "UsuariosRutas ->" + colors.red + error));
    }
});


module.exports.usrRouter = usrRouter;