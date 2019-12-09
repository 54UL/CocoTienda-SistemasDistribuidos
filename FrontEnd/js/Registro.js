//import {endpoint} from './Globales.js';

mostrarBarraTipoUsuario();

document.getElementById("btnRegistrar").addEventListener("click", registrar);
// seleccionar producto (obtener el product id)
//
// $('.danger').popover({ 
//     html : true,
//     content: function() {
//       return $('#popover_content_wrapper').html();
//     }
//   });

//module.exports.getGlobalToken = getGlobalToken
var nombreUsuario;
var correoUsuario;
var contraUsuario;
var otraContraUsuario;

function registrar(event)
{
    event.preventDefault();
   //alert("Ajua");

    nombreUsuario = $('#nombreUsuario').val();
    correoUsuario = $('#correoUsuario').val();
    contraUsuario = $('#contraUsuario').val();
    otraContraUsuario = $('#otraContraUsuario').val();
    

    
    console.debug(otraContraUsuario);
   
    register(nombreUsuario,correoUsuario,contraUsuario);
         
}

function register(usuario,correo,pass){
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", endpoint("/Users/Register/"));
   // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify({
        usr:usuario,
        email:correo,
        pass:pass
       }));
    
  
    xhr.onreadystatechange = function(event){
        event.preventDefault();
        if(this.readyState == 4 && this.status == 200){

            var response = JSON.parse(xhr.responseText);
            console.debug(response);
            if(response.asignedToken !== 0 ){
                alert(response.msg);
                location.href="usuario.html"; 
                //ingresar(usuario,pass);
            }
            else{
                
                alert("Error:"+response.msg);
            }

            /*
            var resultadoLogin = JSON.parse(xhr.responseText)
                    alert(resultadoLogin.asignedToken);
                    if(resultadoLogin.asignedToken == 0){
                        $("#errorIniciar").css("display", "block");
                        $('#errorIniciar').text(resultadoLogin.message); 
                        document.cookie = "2"
                        var x = document.cookie;
                        console.log("x" + x);
                    }
                    else if(resultadoLogin.asignedToken == 1){ //Es administrador
                        $("#ulInventario").css("display", "block");
                        $("#ulAdmin").css("display", "block");
                        document.cookie = "1"

                    }
                    else if(resultadoLogin.asignedToken == 2){ // Es almacenista
                        $("#ulInventario").css("display", "block");
                        
                    }
                    */
        }
    }
}

function ingresar(usr,pass) {

        http: //"+CURRENT_IP+"
            var xhr = new XMLHttpRequest();

        xhr.open("GET", endpoint("/Users/Login/" + usr + "/" + pass));
        xhr.send();
        xhr.onreadystatechange = function(event) {
            event.preventDefault();
            if (this.readyState == 4 && this.status == 200) {
                var resultadoLogin = JSON.parse(xhr.responseText)

                console.log("ResultadoLogin: ", resultadoLogin)

                document.cookie = "asignedToken=" + resultadoLogin.asignedToken;
                document.cookie = "userType=" + resultadoLogin.userType;

                console.log("COOKIE:", document.cookie);

                // alert(resultadoLogin.asignedToken);
                if (resultadoLogin.asignedToken == 0) {

                    $("#errorIniciar").css("display", "block");
                    $('#errorIniciar').text(resultadoLogin.message);
                    document.cookie = "0"

                    // alert(document.cookie);
                    console.log(document.cookie);

                } else {

                    console.log("DEL OTRO LADO", document.cookie);
                    location.href = "index.html";
                    // var token = document.cookie.replace(/(?:(?:^|.*;\s*)asignedToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    // console.log("Token de usuario", token);

                }

                if (resultadoLogin.userType == 4) { //Es administrador
                    $("#ulInventario").css("display", "block");
                    $("#ulAdmin").css("display", "block");


                } else if (resultadoLogin.userType == 3) { // Es almacenista
                    $("#ulInventario").css("display", "block");
                }


            }
        }
}