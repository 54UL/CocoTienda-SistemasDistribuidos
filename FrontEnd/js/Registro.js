document.getElementById("btnRegistrar").addEventListener("click", registrar);

var nombreUsuario;
var correoUsuario;
var contraUsuario;
var otraContraUsuario;

function registrar(event){
    event.preventDefault();
    //alert("Ajua");

    nombreUsuario = $('#nombreUsuario').val();
    correoUsuario = $('#correoUsuario').val();
    contraUsuario = $('#contraUsuario').val();
    otraContraUsuario = $('#otraContraUsuario').val();

    if(!nombreUsuario.equals("") || !correoUsuario.equals("") || !contraUsuario.equals("") || !otraContraUsuario.equals("")){
        if(contraUsuario.equals(otraContraUsuario)){
            register();
        }
        else{
            alert("Verifique su contraseña.");
        }
    }
}

function register(){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/Users/Register/"+nombreUsuario+"/"+correoUsuario+"/"+contraUsuario);
    xhr.send();
    xhr.onreadystatechange = function(event){
        event.preventDefault();
        if(this.readyState == 4 && this.status == 200){

            var response = JSON.parse(xhr.responseText);
            if(response.status == "OK"){
                alert("Bienveid@ " + nombreUsuario + ".");
            }
            else{
                alert(nombreUsuario + " no existe, verifique los campos.");
                alert(response.message);
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
