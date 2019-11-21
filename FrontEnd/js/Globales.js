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




