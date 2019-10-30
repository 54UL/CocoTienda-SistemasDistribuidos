var express    = require('express')
var mysql      = require('mysql2/promise');
var bodyParser = require('body-parser')
var app        = express();

//SQL IMPLEMENTATION-------------------------------------------------------------------------
var sql_connection;

async function bdquery(query)
{ 
    console.log("SENDING QUERY :"+query);
   try 
   {
      let [rows, fields] =  await sql_connection.execute(query);
      return rows;
   } 
   catch (error) {
      console.error("mysql:"+error);
      return null;
   }
}

async function bdconfigure()
{
   try {
      sql_connection = await mysql.createConnection({
         host     :"localhost",
         user     :"root",
         password :"",
         database :"bookstore"
       });
     
       return sql_connection ? false:true;
      
   } catch (error) {
      console.error("MYSQL:"+error)
   }
}

bdconfigure();

//EXPRESS---------------------------------------------------------------
function corsPolicy(res)
{
   res.setHeader('Access-Control-Allow-Origin', '*');
}

// CORS HEADER SETUP
app.use(function (req, res, next) 
{
    corsPolicy(res);
    next();
 });
//default route
app.get('/', function (req, res) {
   res.send('testing endpoint');
});


//RUTAS

app.get("/Libros/getAll", async(req, res) => {
    try {
        var libros = await bdquery("SELECT * FROM libro");
        res.json(libros);
    } catch (error) {
        console.error("create libros")
    }
});

app.use(bodyParser.json());
app.get("/Libros/Create", async(req, res) => {
    try {
        var NewLibroModel = req.body;
        var query="INSERT INTO Libro values(0,'"+ NewLibroModel.Titulo+ "','"+NewLibroModel.Autor+"'";
        var result = await bdquery(query);
        res.json({id_libro:result.insertId,msg:"Libro creado"})  
    } catch (error) {
        console.error("create libros")
    }
});

app.get("/Libros/Delete/:idLibro", async(req, res) => {
    try {
        var id_libro = req.params.idLibro;
        await bdquery("DELETE * FROM Libro where id_libro="+id_libro);
        res.json({status:1,msg:"libro eliminado"});
    } catch (error) {
        console.error("create libros")
    }
});


app.use(bodyParser.json());
app.get("/Libros/Comentar/", async(req, res) => {
    try {
        var model = req.body;
        var date= Date.now();
        var query="INSERT INTO Comentario values(0,'"+date+"','"+model.id_libro+"','"+model.id_usuario+"','"+model.comment+"'";
        await con.query(query);
        res.json({status:1,msg:"insertado"});
    } catch (error) {
        console.error("create libros")
    }
});



app.get("/Libros/MostraComentarios/:idlibro", async(req, res) => {
    try {
        var model = req.body;
        var date= Date.now();
        var query="INSERT INTO Comentario values(0,'"+date+"','"+model.id_libro+"','"+model.id_usuario+"','"+model.comment+"'";
        await bdquery(query);
        res.json({status:1,msg:"insertado"});
    } catch (error) {
        console.error("create libros")
    }
});

app.use(bodyParser.json());
app.get("/Usuarios/Create",async(req, res) => 
{
    try {
        var newUserModel = req.body;

        var query="INSERT INTO Usuario values(0,'"+newUserModel.nombre+"','"+newUserModel.apellidoPaterno+"','"+newUserModel.apellidoMaterno+"','"+newUserModel.nick+"','"+newUserModel.password+"',0)";
        await bdquery(query);
        res.json({status:1,msg:"usuario creado"});
    } catch (error) {
        console.error("create user"+error)
    }
})

var userLogins =new Map();
app.get("/Usuarios/login/:nick/:pass", async(req, res) => {
    try {
        var nick = req.params.nick;
        var pass = req.params.pass;

        var usuarios = await bdquery("SELECT * FROM USUARIO WHERE nick='"+nick+"' AND password='"+pass+"'");
        var usr = usuarios[0];
        if(usr!=undefined)
        {
            if(!userLogins.has(usr.id))
            {
                userLogins.set(usr.id,usr.nick);
                res.json({status:1,msg:"bienvenido:"+usr.nick});
            }
            else
            {
                res.json({status:0,msg:"ya has logeado en otra maquina cierra sesion!"});
            }
        }
        else
        res.json({status:0,msg:"clave o usuario incorrecto"});

 
    } catch (error) {
        console.error("login libros"+error)
    }
});


app.get("/Usuarios/logOut/:userId", async(req, res) => {
    try {
        
        var idusr = req.params.userId;

        if(userLogins.has(idusr))
        {
            userLogins.delete(idusr);
            res.json({status:1,msg:"has salido de tu cuenta"});
        }
        else
        {
            res.json({status:0,msg:"nisiquiera has logeado >:v"})
        }
    } catch (error) {
        console.error("create libros")
    }
});


//RUN THE SERVER
app.listen(3000,function()
   {
   console.log("server ready in port 3000");
   }
);



