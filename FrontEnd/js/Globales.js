var CURRENT_IP = "localhost:3000"

function getBaseUrl() {

    return "http://" + CURRENT_IP;
}

function endpoint(endpointURL) {

    return getBaseUrl() + endpointURL;
}

function getUserToken() {
    //console.log("COOKIE DE USUARIO: " + document.cookie)
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)asignedToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //console.log('Id del usuario:', token)
    if(token==""){
        alert("Inicia sesion");
        location.href = "usuario.html";
    }
    return token;
}

function getUserType() {
    console.log("COOKIE DEL USUARIO:", document.cookie)
    var userType = document.cookie.replace(/(?:(?:^|.*;\s*)userType\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Id del usuario:', userType)
    return userType;
}

function mostrarBarraTipoUsuario(){
    if (getUserType() == 4) { //Es administrador
        $("#ulInventario").css("display", "block");
        $("#ulAdmin").css("display", "block"); 
        $("#ulIniciar").css("display", "none"); 
        $("#ulCuenta").css("display", "block"); 
    } else if (getUserType() == 3) { // Es almacenista
        $("#ulInventario").css("display", "block");
        $("#ulIniciar").css("display", "none");
        $("#ulCuenta").css("display", "block"); 
    }
    else if(getUserType() == 2){
        //Es usuario 
    }
    
}

function mostrarCash(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/getUserAmount/"+getUserToken())); //Compras
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Mostrar en cuenta valores
            //alert("Mostrar cash");
            //console.log(this.responseText);
            var usuario = JSON.parse(this.responseText);
            ///console.log("cash" + usuario.Cash.Saldo);
            $('#etiquetaNombreUsuario').text("Nombre usuario: " + usuario.Name.nombre);
            $('#etiquetaCash').text('Tu dinerito es de $' + usuario.Cash.Saldo);
        }
    }
}


function mostrarCompras(){
    alert("MostrarC");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Usuarios/getHistory/"+ getUserToken())); //Compras
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var compras = JSON.parse(this.responseText);
            console.log(compras);
        }
    }

}


