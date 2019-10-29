function usuarioComponent(ModeloUsuario) {
    return "<div class='col-md-12 col-xs-12'>" +
        "<table class='table'>" +
        "<thead>" +
        " <tr>" +
        " <th scope='col'>Id</th>" +
        " <th scope='col'>Nombre</th>" +
        " <th scope='col'>Username</th>" +
        "<th scope='col'>Correo</th>" +
        "<th scope='col'></th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<th scope='row'>" + ModeloUsuario.id_usuario + "</th>" +
        " <td>" + ModeloUsuario.nombre + "</td>" +
        " <td>" + ModeloUsuario.username + "</td>" +
        " <td>" + ModeloUsuario.correo + "</td>" +
        "<td>" +
        "<form><input type=submit style='width:50%'></form>" +
        " </td>" +
        " <td>" +
        "<form><input type=submit style='width:50%'></form>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>"
}


function loadUsuarios() {
    var xhr = new XMLHttpRequest();
    console.log('hola');
    xhr.open("GET", endpoint("/GetAllUsers"));
    xhr.send();
    if (this.readyState == 4 && this.status == 200) {
        $("#containerUsuarios").html("");
        var jsonUsuarios = JSON.parse(this.responseText);
        for (var i = 0; i < jsonUsuarios.Usuarios.length; i++) {
            var actualModel = jsonUsuarios.Usuarios[i];
            $("#containerUsuarios").append(productoComponent(actualModel));
        }
    }
}