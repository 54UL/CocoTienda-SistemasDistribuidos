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
        " <td> <input value=" + ModeloUsuario.nombre + "></input></td>" +
        " <td> <input value=" + ModeloUsuario.correo + "></td>" +
        " <td> <input value=" + ModeloUsuario.id_tipousuario + "></td>" +
        "<td>" +
        " </td>" +
        " <td>" +
        "<form><button class='btnelim' type='button' id=" + ModeloUsuario.id_usuario + ">Eliminar</form>" +
        "</td>" +
        "<td>" +
        "<form><button type='button' class ='btnComentario'id=" + ModeloUsuario.id_usuario + " >Comentario</form>" +
        " </td>" +
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


$(document).on('click', 'button[class="btnedit "]', function(event) {
  //  alert("click");
    let id = this.id;
    console.log("Se presionó el Boton con Id :" + id)
   // $(banco).modal("show");
   /// document.getElementById("btnApartar").value = id;
    //endpoint modificar
});

$(document).on('click', 'button[class="btnComentario"]', function(event) {
    //alert("click");
    let id = this.id;
    console.log("Se presionó el Boton con Id :" + id)
    $(banco).modal("show");
   /// document.getElementById("btnApartar").value = id;
   //endpoint eliminar

});


$(document).on('click', 'button[class="btnComentario"]', function(event) {
    //alert("click");
    let id = this.id;
    console.log("Se presionó el Boton con Id :" + id)
   // $(banco).modal("show");
   /// document.getElementById("btnApartar").value = id;
   //endpoint eliminar

});

function deleteUsuario(id_usuario, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/Delete/" + id_usuario));

    // xhr.open("GET", endpoint("/ProductSelling/buy/" + productoID + "/" + token));
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var borrar = JSON.parse(this.responseText);
            callback(borrar)
        }
    }

}


window.onload = function() {
    loadUsuarios();
}