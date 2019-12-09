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
        $("#ulCuenta").css("display", "block"); 

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

var nCompras= 0;

function mostrarCompras(){
    $('.danger').popover('hide');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/ProductSelling/GetHistory/"+getUserToken())); //Compras
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var compras = JSON.parse(this.responseText);
            // console.log(compras);
            // console.log("compras"+compras);
            // console.log("usuario" + getUserToken())
            if(compras.length == 0) {
                alert("No hay compras");
            }
            else{
                $('#compras').modal("show");
                for(var i=0; i<compras.length; i++){
                    var modeloCompras = compras[i];
                    nCompras ++;
                   $('#misc').append(mostrarModalCompras(modeloCompras));
                  // $('#misc').append( "<h1> "+ modeloCompras.nombre +" </h1>");

                }
               // $('#misc').append('<h1> Hola </h1>');

            }
            //$('#compras').modal("show");
           /// $('#misc').append('<h1> Hola </h1>');
           // console.log(compras);
        }
       
    }

}


function mostrarModalCompras(modeloCompras){
    //return "<h1> "+ modeloCompras.nombre +" </h1>"

    return "<table class='table' border='2'>" +
    "<tr>" +
    "<th> " + nCompras + " </th>" +
    "<th> " + modeloCompras.nombre + " </th>" +
    "<th> " + modeloCompras.imagen + " </th>" +
    "<th> $" + modeloCompras.precio_unitario + " </th>" +

    "</tr>"+
    
    
    
    "</table>" 
    // return "<div class='col-md-12 col-xs-12'>" +
    // "<table class='table'>" +
    // "<thead>" +
    // " <tr>" +
    // " <th scope='col'>Nombre</th>" +
    // "<th scope='col'> Imagen</th>" +
    // "<th scope='col'> Precio</th>" +

    // "<th scope='col'></th>" +
    // "</tr>" +
    // "</thead>" +
    // "<tbody>" +
    // "<tr>" +
    // // "<th scope='row'></th>" +
    // " <td> " + modeloCompras.nombre + " </td>" +
    // " <td> " + modeloCompras.imagen + "'</td>" +
    // " <td> <input id='inTU' value='" + modeloCompras.precio_unitario + "'></td>" +
    // "</tr>" +
    // "</tbody>" +
    // "</table>" +
    // "</div>" 
    // "<h1> Compras </h1>"


}