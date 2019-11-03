function usuarioComponent(ModeloUsuario) {
    return "<div class='col-md-12 col-xs-12'>" +
        "<table class='table'>" +
        "<thead>" +
        " <tr>" +
        " <th scope='col'>Id</th>" +
        " <th scope='col'>Nombre</th>" +
        "<th scope='col'>Correo</th>" +
        "<th scope='col'>Tipo de Usuario</th>" +

        "<th scope='col'></th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<th scope='row'>" + ModeloUsuario.id_usuario + "</th>" +
        " <td id='nombre'>" + ModeloUsuario.nombre + "</td>" +
        " <td id='correo'>" + ModeloUsuario.correo + "</td>" +
        " <td>" + ModeloUsuario.id_tipousuario + "</td>" +
        "<td>" +
        "<form><button type='button' class='' id=" + ModeloUsuario.id_usuario + ">Editar</form>" +
        " </td>" +
        " <td>" +
        "<form><button type='button' class='eliminar' id=" + ModeloUsuario.id_usuario + ">Eliminar</form>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>"
}

function loadUsuarios() {
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
                $("#containerUsuarios").append(usuarioComponent(actualModel));
            }
        }
    }
}



$(document).on('click', 'button[class="eliminar"]', function(event) {
    let id = this.id;
    let nombre = $('#nombre').val();
    let correo = $('#correo').val();

    console.log("ID_usuario:", id);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint("/Users/Delete/" + id));
    xhr.send();
    xhr.onreadystatechange = function() {
        console.log("Se borro", borrar)
        if (this.readyState == 4 && this.status == 200) {
            var borrar = JSON.parse(this.responseText);
            callback(borrar);
        }
    }
})








window.onload = function() {
    loadUsuarios();
}