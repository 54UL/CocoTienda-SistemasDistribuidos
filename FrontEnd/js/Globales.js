var CURRENT_IP = "localhost:3000"

function getBaseUrl() {

    return "http://" + CURRENT_IP;
}

function endpoint(endpointURL) {

    return getBaseUrl() + endpointURL;
}

function getUserToken() {
    console.log("COOKIE DE USUARIO: " + document.cookie)
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)asignedToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Id del usuario:', token)
    return token;
}

function getUserType() {
    console.log("COOKIE DEL USUARIO:", document.cookie)
    var userType = document.cookie.replace(/(?:(?:^|.*;\s*)userType\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Id del usuario:', userType)
    return userType;
}