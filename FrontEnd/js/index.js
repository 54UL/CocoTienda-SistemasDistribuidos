//import {endpoint} from './Globales.js';
var lol;

function productoComponent(ModeloProducto) {
    return "<div id=" + ModeloProducto.id_producto + " class='col-md-3 col-xs-6'>" +
        "<div class='product' id=" + ModeloProducto.id_producto + ">" +
        "<div class='product-img'>" +
        "<img style='width: 250px; height: 250px' src='" + ModeloProducto.imagen + "' alt=''>" +
        "</div>" +
        "<div class='product-body' >" +
        "<p class='product-category'>SHIT</p>" +
        "<h3 class='product-name' id=" + ModeloProducto.id_producto + "><a href='#'>" + ModeloProducto.nombre + "</a></h3>" +
        "<h4 class='product-price'> &#36; " + ModeloProducto.precio_unitario + ".00</h4>" +
        "<div class='product-btns'>" +
        "<label>"+ ModeloProducto.stock +" </label>"+
        //"<button class='add-to-wishlist' ><i class='fa fa-heart-o'></i></button>" +
        "<button class='add-to-cart'><i class='fa fa-shopping-cart'></i></button>" +
        "<button class='tarjeta' id=" + ModeloProducto.id_producto + "><i class='fa fa-credit-card custom'></i></button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='clearfix visible-sm visible-xs'>" +
        "</div>"
}

function usuarioComponent(ModeloUsuario) {
    return "<div id=" + ModeloUsuario.id_ModeloUsuario + " class='col-md-3 col-xs-6'>" +
        "<div class='product' id=" + ModeloUsuario.id_Usuario + ">" +
        "</div>" +
        "<table class='table'>" +
        "<thead>" +
        "<tr>" +
        "<th scope='col'>Id</th>" +
        "<th scope='col'>Nombre</th>" +
        "<th scope='col'>Editar</th>" +
        "<th scope='col'>Eliminar</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr>" +
        "<td scope='col'>" + ModeloUsuario.id_Usuario + "</td>" +
        "<td scope='col'>" + ModeloUsuario.nombre + "</td>" +
        "<td scope='col'><form><input type='submit' value='Editar'style='width:50%'></form></td>" +
        "<td scope='col'><form><input type='submit' value='Eliminar'style='width:50%'></form></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>" +
        "</div>" +
        "</div>"
}



/*$('#'+lol.id_producto).find('h3').click( function(){
	var id = $(this).attr('id');
	if(id!=null && id!= undefined) console.log(id);

	else console.log("error al conseguir la id de la fila");
});*/



function comprar(token, productoID, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint("/ProductSelling/buy/" + productoID + "/" + token));
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var compra = JSON.parse(this.responseText);
            callback(compra)
        }
    }
}



function loadUSuarios() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint(""));
    xhr.send();
    $("#containerUsuarios").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#containerUsuarios").html("");
            var jsonUsuarios = JSON.parse(this.responseText);
            //console.log('hola', jsonUsuarios);
            //console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\

            for (var i = 0; i < jsonUsuarios.Usuarios.length; i++) {
                var actualModel = jsonUsuarios.Usuarios[i];
                $("#containerUsuarios").append(usuarioComponent(actualModel));

            }
        }
    }
}



function loadProducts(category) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", endpoint("/ProductSelling/retrive/" + category));
    xhr.send();
    $("#containerProductos").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#containerProductos").html("");
            var jsonProductos = JSON.parse(this.responseText);
            //console.log('hola', jsonProductos);
            //console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\

            for (var i = 0; i < jsonProductos.productos.length; i++) {
                var actualModel = jsonProductos.productos[i];
                $("#containerProductos").append(productoComponent(actualModel));

                //Todo el div
                /*$('#'+actualModel.id_producto).find('div[class="product"]').click( function(){
                	var id = $(this).attr('id');
                	if(id!=null && id!= undefined) console.log(id);
                	else console.log("Error al consegir el id");
                });*/

                //Solo tarjeta
                $('#' + actualModel.id_producto).find('button[class="tarjeta"]').click(function() {
                    
                    /*var id = $(this).attr('id');
                    if (id != null && id != undefined) {
                        alert(id);
                        comprar(getUserToken(), id, (cResult) => {
                            alert(cResult.msg);
                        });

                    } else console.log("Error al consegir el id");*/
                    $(banco).modal("show");

                });

                $("#btnApartar").click(function(){
                    var nArticulos = $('#numeroArticulos').val();
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", endpoint("/requestBuy/"+actualModel.id+"/"+getUserToken+"/"+nArticulos));
                    xhr.send();
                    alert("Tus articulos estan siendo procesados");
                    xhr.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            var resultadoApartar = JSON.parse(this.responseText);
                            alert(resultadoApartar.message);
                            //Realizar la siguiente peticion
                            if(resultadoApartar.message == "MensajedeExito"){
                                //var id = $(this).attr('id');
                                if (actualModel.id != null && actualModel.id != undefined) {
                                    alert(id);
                                    comprar(getUserToken(), id, (cResult) => {
                                        alert(cResult.msg);
                                    });

                                } else console.log("Error al consegir el id");
                            }
                            else
                                alert("Lo sentimos no hay productos disponibles");
                        }
                    }
                })

                /*$("#"+actualModel.id_producto).click(()=> {					
                	var  resultadoCompra =  comprar(globales.getUsrToken(),ids[algunIndiceValido]);
                	if(resultadoCompra.compra== 0)
                	alert("ha sucedio algo"+resultadoCompra.msg);
                	else
                	alert(resultadoCompra.msg);
                })*/
            }
        }
    }
}


window.onload = function() {
    loadProducts(0);
}


$("#tazas").click(function() {
    loadProducts(4)
})

$("#llaveros").click(function() {
    loadProducts(3);
})

$("#camisas").click(function() {

    loadProducts(2);
})

$("#cachuchas").click(function() {

    loadProducts(1);
})