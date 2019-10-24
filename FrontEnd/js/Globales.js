var CURRENT_IP = "localhost:3000"

function getBaseUrl() {

    return "http://" + CURRENT_IP;
}

function endpoint(endpointURL) {

    return getBaseUrl() + endpointURL;
}

function getUserToken() {

    var token = document.cookie.replace(/(?:(?:^|.*;\s*)asignedToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(Object.values(token));
    // return token;
    // console.log("COOKIE DE USUARIO: " + document.cookie)
    // return document.cookie;
    alert(token);
    return token;
}