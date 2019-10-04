



document.getElementById('btnIngresar').addEventListener("click", ingresar);

function ingresar(event){

    event.preventDefault();
    var usr= $('#correo').val();
    var pass = $('#contra').val();

    if(usr == "" && pass == ""){
        $("#errorIniciar").css("display", "block");
        $('#errorIniciar').text("No puede haber campos vacios"); 
    }
    else {
        var xhr = new XMLHttpRequest();                    
        // xhr.open("GET","http://localhost:3000/Users/Login/:usr/:pass");    
        xhr.open("GET","http://localhost:3000/Users/Login/"+usr+"/"+pass);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        xhr.send();
        xhr.onreadystatechange= function(event){
            event.preventDefault();
                if(this.readyState ==4 && this.status ==200){
                    var resultadoLogin = JSON.parse(xhr.responseText)
                    alert(resultadoLogin.asignedToken);
                    if(resultadoLogin.asignedToken == 0){
                        $("#errorIniciar").css("display", "block");
                        $('#errorIniciar').text(resultadoLogin.message); 
                        document.cookie = "2"
                        var x = document.cookie;
                        console.log("x" + x);
                    }
                    else{ //Es administrador
                        $("#ulInventario").css("display", "block");
                        $("#ulAdmin").css("display", "block");
                        document.cookie = "1"
                        $("#errorIniciar").css("display", "none");

                    }
                   

            
                }
        }

    }
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