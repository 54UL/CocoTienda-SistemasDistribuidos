//SAUL CREATE PRODUCT CODE!!!
mostrarBarraTipoUsuario();
$('.danger').popover({ 
    html : true,
    content: function() {
      return $('#popover_content_wrapper').html();
    }
  });

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
    xhr.open("POST", "http://localhost:3007/Banco/getAccounts");
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

function cerrarS(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/Users/logOut/" + getUserToken()));
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var cerrar = this.responseText;
            console.log(cerrar);
            if(cerrar===true)
                cerrarCookie();
        
        }
    }

    //Eliminar cookies y ver que onda con david
    cerrarCookie();
}

function cerrarCookie(){
    alert("Se cerro la sesion");
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    location.reload();
}

$(document).on('click', 'button[class="eliminar"]', function(event) {
    let id = this.id;

    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/Banco/DeleteAccount/"+id);  // Chingadera 
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
    xhr.open("GET", endpoint("/Banco/UpdateAmmount/"+ id + "/" + saldo));  // Chingadera 
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
    alert("ctm");
    loadBanco();
}

$('#btnAgregar').click(function(){
     alert("Se va insertar");
     //Agregar a la tabla otra fila para inputs

})