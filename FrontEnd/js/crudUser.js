mostrarBarraTipoUsuario();
$('.danger').popover({ 
    html : true,
    content: function() {
      return $('#popover_content_wrapper').html();
    }
  });

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
        " <td> " + ModeloUsuario.nombre + " </td>" +
        " <td> " + ModeloUsuario.correo + "'</td>" +
        " <td> <input id='inTU' value='" + ModeloUsuario.id_tipousuario + "'></td>" +

        "<td>" +
        "<form><button class='editar' type='button' id='" + ModeloUsuario.id_usuario +"'>Editar</form>" +
        " </td>" +
        " <td>" +
        "<form><button class='eliminar' type='button' id='"+ ModeloUsuario.id_usuario +"'>Eliminar</form>" +
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
    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/Delete"+id));  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("El usuario ha sido eliminado");
        }
        else
            alert("El usuario no ha podido sido eliminado");
    }
});


$(document).on('click', 'button[class="editar"]', function(event) {
    let id = this.id;
    var tipoU = $('#inTu').val();

    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/Update/" + id +"/" + tipoU));  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("El usuario ha sido modificado");
        }
        else
            alert("El usuario no ha podido ser modificado");
    }
});



window.onload = function() {
    loadUsuarios();
}