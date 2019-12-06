

function bancoComponent(ModeloUsuario) {
    return "<tbody>" +
            "<tr>" +
            "<th scope='row'> -" + ModeloUsuario.id_usuario + "</th>" +
            //" <td> <input type='text' value='>" + ModeloUsuario.nombre + "'></td>" +
            " <td> <input id='inCorreo' type='text' value='" + ModeloUsuario.correo + "'></td>" +
            " <td> <input id='inSaldo' type='text' value='" + ModeloUsuario.saldo + "'></td>" +

            // " <td>" + ModeloUsuario.id_tipousuario + "</td>" +

            "<td>" +
            "<form><button type='button' class='modificar' id='"+ ModeloUsuario.id_usuario +"'>Editar</form>" +
            " </td>" +
            " <td>" +
            "<form><button class='eliminar' type='button' id='"+ ModeloUsuario.id_usuario +"'>Eliminar</form>" +
            "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>"
}


function loadBanco(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/GetAllUsers"));
    xhr.send();
    $("#containerProductos").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#containerUsuarios").html("");
            var jsonUsuarios = JSON.parse(this.responseText);
            console.log(jsonUsuarios);
            for (var i = 0; i < jsonUsuarios.usuarios.length; i++) {
                var actualModel = jsonUsuarios.usuarios[i];
                $("#containerUsuarios").append(bancoComponent(actualModel));
            }
        }
    }
}


$(document).on('click', 'button[class="eliminar"]', function(event) {
    let id = this.id;

    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/CocoBanco/eliminar"));  // Chingadera 
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
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/CocoBanco/modificar/"+id+"/" + correo + "/" + saldo));  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("La cuenta sido eliminada");
        }
        else
            alert("La cuenta no ha podido ser eliminado");
    }
});








window.onload = function (){
    loadBanco();
}