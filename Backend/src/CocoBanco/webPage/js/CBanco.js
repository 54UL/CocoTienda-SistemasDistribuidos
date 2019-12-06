
var ip = "http://localhost:3007";
function bancoComponent(ModeloUsuario) {
    return "<tbody>" +
            "<tr>" +
            "<th scope='row'> " + ModeloUsuario.ID_Cuenta + "</th>" +
           // "<td> "+ ModeloUsuario.correo +" </td>" +
           // " <td> <input type='text' value='" + ModeloUsuario.nombre + "'> </input></td>" +
            " <td> <input id='inCorreo' type='text' value='" + ModeloUsuario.correo + "'></input></td>" +
            " <td> <input id='inSaldo' type='text' value='" + ModeloUsuario.Saldo + "'></input></td>" +

            // " <td>" + ModeloUsuario.id_tipousuario + "</td>" +

            "<td>" +
            "<form><button type='button' class='modificar' id='"+ ModeloUsuario.ID_Cuenta +"'>Editar</form>" +
            " </td>" +
            " <td>" +
            "<form><button class='eliminar' type='button' id='"+ ModeloUsuario.ID_Cuenta +"'>Eliminar</form>" +
            "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>"
}


function loadBanco(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ip + "/Banco/getAccounts");
    xhr.send();
    $("#containerProductos").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            $("#containerCuentas").html("");
            var jsonUsuarios = JSON.parse(this.responseText);
            console.log(jsonUsuarios);
            console.log(jsonUsuarios.result[1]);
            for (var i = 0; i < jsonUsuarios.result.length; i++) {
                var actualModel = jsonUsuarios.result[i];
                console.log("ptm" + actualModel.Saldo);
                $("#containerCuentas").append(bancoComponent(actualModel));
            }
        }
    }
}


$(document).on('click', 'button[class="eliminar"]', function(event) {
    let id = this.id;

    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", ip + "/Banco/DeleteAccount/"+id);  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("La cuenta sido eliminada");
        }
        else
            alert("La cuenta no ha podido ser eliminado");
    }
});


$(document).on('click', 'button[class="modificar"]', function(event) {
    let id = this.id;

    var correo =  $('#inCorreo').val(); /// Obtener id
    var saldo = $('#inSaldo').val();
    console.log("Se presiono modi");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3007/Banco/updateAmount/"+ id + "/" + saldo);  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("La cuenta sido modificado");
        }
        else
            alert("La cuenta no ha podido ser modificado");
    }
});


window.onload = function (){
    alert("ctm");
    loadBanco();
}

$('#btnAgregar').click(function(){
     alert("Se va insertar");
     //Agregar a la tabla otra fila para inputs

})