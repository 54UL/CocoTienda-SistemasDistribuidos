

function bancoComponent(ModeloUsuario) {
    return "<tbody>" +
            "<tr>" +
            "<th scope='row'> " + ModeloUsuario.id_usuario + "</th>" +
            " <td>" + ModeloUsuario.nombre + "</td>" +
            " <td>" + ModeloUsuario.correo + "</td>" +
            " <td>" + ModeloUsuario.id_tipousuario + "</td>" +

            "<td>" +
            "<form><button type='button' id='"+ ModeloUsuario.id_usuario +"'>Editar</form>" +
            " </td>" +
            " <td>" +
            "<form><button type='button'>Eliminar</form>" +
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