

function usuarioComponent(ModeloUsuario) {
    return "<div class='col-md-12 col-xs-12'>" +
        "<table class='table'>" +
        "<thead>" +
        " <tr>" +
        " <th scope='col'>Id</th>" +
        " <th scope='col'>Autor</th>" +
        "<th scope='col'>Titulo</th>" +
        "<th scope='col'></th>" +
        "<th scope='col'></th>" +
        "<th scope='col'></th>" +

        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<th scope='row'>" + ModeloUsuario.id_usuario + "</th>" +
        " <td> <input id='nombre' value=" + ModeloUsuario.nombre + "></input></td>" +
        " <td> <input id='correo' value=" + ModeloUsuario.correo + "></td>" +
        "<td>" +
        " </td>" +
        " <td>" +
        "<form><button  type='button' class='eliminar' id=" + ModeloUsuario.id_usuario + ">Eliminar</form>" +
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
$('#agregarLibro').on('click', function(){
    //Endpoint
})

$(document).on('click', 'button[class="eliminar"]', function(event) {
    let id = this.id;
    console.log("Se presionó el Boton con Id :" + id)
    var nombre = $('#nombre').val();
    var correo = $('#correo').val();



    console.log("nombre" + nombre);

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
    if(getUserToken() == "") {
        alert("Necesitas iniciar sesion pa comentar");
            
    }
    else 
    alert("f");
   // $(banco).modal("show");
   /// document.getElementById("btnApartar").value = id;
   //endpoint pa comentario

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