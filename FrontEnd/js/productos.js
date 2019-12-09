//SAUL CREATE PRODUCT CODE!!!
mostrarBarraTipoUsuario();
$('.danger').popover({ 
    html : true,
    content: function() {
      return $('#popover_content_wrapper').html();
    }
  });

function productoComponent(ModeloProducto) {
    return "<div class='col-md-12 col-xs-12'>" +
        "<table class='table'>" +
        "<thead>" +
        " <tr>" +
        " <th scope='col'>Id Producto</th>" +
        " <th scope='col'>Nombre</th>" +
        "<th scope='col'>Id Categoria</th>" +
        "<th scope='col'>Cantidad</th>" +
        "<th scope='col'>Precio Unitario</th>" +
        "<th scope='col'>Imagen</th>" +

        "<th scope='col'></th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<th scope='row'>" + ModeloProducto.id_producto + "</th>" +
        " <td> <input id='inNombre' value='" + ModeloProducto.nombre + "' ></td>" +
        " <td> <input type='number' min='1' max='4'  id='inCategoria' value='" + ModeloProducto.id_categoria + "'></td>" +
        " <td> <input type='number' size='10' id='inCantidad' value='" + ModeloProducto.cantidad + "'></td>" +
        " <td> <input type='number' size='10' id='inPrecio' value='" + ModeloProducto.precio_unitario + "'></td>" +
        " <td> <input type='file' id='inImagen'></td>" +

        "<td>" +
        "<form><button class='editar' type='button' id='"+ ModeloProducto.id_producto +"'>Editar</form>" +
        " </td>" +
        " <td>" +
        "<form><button class='eliminar' type='button' id='"+ ModeloProducto.id_producto +"'>Eliminar</form>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>"
}

function loadProductos() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/ProductSelling/retrive/0"));
    xhr.send();
    $("#containerProductos").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#containerProductos").html("");
            var jsonProductos = JSON.parse(this.responseText);
            console.log(jsonProductos);
            for (var i = 0; i < jsonProductos.productos.length; i++) {
                var actualModel = jsonProductos.productos[i];
                $("#containerProductos").append(productoComponent(actualModel));
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
    xhr.open("POST", endpoint("/ProductSelling/DeleteProduct/"+ id));  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var eliminarP = JSON.parse(this.responseText);
            if(eliminarP != null){
                alert(eliminarP.msg);
                location.reload();
            }
            else{
                alert("No se pudo eliminar el producto");
                location.reload();

            }
            
        }
        
    }
});


$(document).on('click', 'button[class="editar"]', function(event) {
    let id = this.id;
    var nombreU = $('#inNombre').val();
    var categoriaU = $('#inCategoria').val();
    var cantidadU = $('#inCantidad').val();
    var precioU = $('#inPrecio').val();
    //var imagenU = $('#inImagen').val();

    //console.log("Se presionó el Boton con Id :" + id)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/UpdateProduct"));  // Chingadera 
    xhr.send();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("El producto ha sido modificado");
        }
        else
            alert("El producto no ha podido ser modificado");
    }
});


// function deleteUsuario(id_usuario, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", endpoint("/Users/Delete/" + id_usuario));

//     // xhr.open("GET", endpoint("/ProductSelling/buy/" + productoID + "/" + token));
//     xhr.send();
//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var borrar = JSON.parse(this.responseText);
//             callback(borrar)
//         }
//     }

// }








window.onload = function() {
    loadProductos();
}