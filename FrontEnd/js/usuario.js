//import {endpoint} from './Globales.js';




document.getElementById('btnIngresar').addEventListener("click", ingresar);

function ingresar(event){

    event.preventDefault();
    var usr= $('#correo').val();
    var pass = $('#contra').val();

    if(usr == "" && pass == ""){
        $("#errorIniciar").css("display", "block");
        $('#errorIniciar').text("No puede haber campos vacios"); 
    }
    else {http://"+CURRENT_IP+"
        var xhr = new XMLHttpRequest();                    
        
        xhr.open("GET",endpoint("/Users/Login/"+usr+"/"+pass));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        xhr.send();
        xhr.onreadystatechange= function(event){
            event.preventDefault();
                if(this.readyState ==4 && this.status ==200){
                    var resultadoLogin = JSON.parse(xhr.responseText)
                    alert(resultadoLogin.asignedToken);
                    if(resultadoLogin.asignedToken == 0){
                        $("#errorIniciar").css("display", "block");
                        $('#errorIniciar').text(resultadoLogin.message); 
                        document.cookie = "0"
                        alert ( document.cookie);
                        console.debug(document.cookie);
                    }
                    else{
                        document.cookie = resultadoLogin.asignedToken
                        alert ( document.cookie);
                    }
                    
                     if(resultadoLogin.userType == 4){ //Es administrador
                        $("#ulInventario").css("display", "block");
                        $("#ulAdmin").css("display", "block");
                    

                    }
                    else if(resultadoLogin.userType == 3){ // Es almacenista
                        $("#ulInventario").css("display", "block");
                    }

            
                }
        }

    }
}

function mostrar(){
    //alert("hola");
    $("#infoUsuario").show("modal");
}

/*
    var jsonUsuario = ({
        'usr': $('#correo').val(),
        'pass': $('#contra').val()
    })



    var http = new XMLHttpRequest();
    http.open('POST', "http://localhost:3000/Login/Login/:usr/:pass");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
     }
     http.send(jsonUsuario);
     console.log(jsonUsuario);
*/