//import {endpoint} from './Globales.js';
mostrarBarraTipoUsuario();
$('.danger').popover({ 
    html : true,
    content: function() {
      return $('#popover_content_wrapper').html();
    }
  });

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
        "<h6> Stock:" + ModeloProducto.cantidad + "</h6>" +
        "<div class='product-btns'>" +
        "<button class='add-to-wishlist' ><i class='fa fa-heart-o'></i></button>" +
        "<button class='add-to-cart'><i class='fa fa-shopping-cart'></i></button>" +
        "<button class='tarjeta' id=" + ModeloProducto.id_producto + "><i class='fa fa-credit-card custom'></i></button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='clearfix visible-sm visible-xs'>" +
        "</div>"

    //"<button type='submit' class='aceptarkk' id="+ ModeloProducto.id_producto+">Aceptar</button>"

}

/*$('#'+lol.id_producto).find('h3').click( function(){
	var id = $(this).attr('id');
	if(id!=null && id!= undefined) console.log(id);

	else console.log("error al conseguir la id de la fila");
});*/




function comprar(token, productoID, nProductos, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", endpoint("/ProductSelling/buy/" + productoID + "/" + token + "/" + nProductos));
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var compra = JSON.parse(this.responseText);
            console.log(compra);
            callback(compra)
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


function loadProducts(category) {
    var xhr = new XMLHttpRequest();
    console.log("Productos");
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
               // console.log(jsonProductos.productos[i]);
                $("#containerProductos").append(productoComponent(actualModel));


                //Solo tarjeta
                // $('#' + actualModel.id_producto).find('button[class="tarjeta"]').click(function() {
                //     console.log("click " + actualModel.id_producto);
                //     /*var id = $(this).attr('id');
                //     if (id != null && id != undefined) {
                //         alert(id);
                //         comprar(getUserToken(), id, (cResult) => {
                //             alert(cResult.msg);
                //         });

                //     } else console.log("Error al consegir el id");*/
                //     $(banco).modal("show");

                //     $("#btnApartar").click(function(){
                //         //console.log("n veces");
                //         $(banco).modal("hide");
                //         var nArticulos = $('#numeroArticulos').val();
                //         //alert(nArticulos);
                //         //alert(actualModel.id_producto);
                //         //alert(getUserToken());
                //         var xhr = new XMLHttpRequest();
                //         xhr.open("GET", endpoint("/ProductSelling/requestBuy/"+actualModel.id_producto+"/"+getUserToken()+"/"+nArticulos));
                //         xhr.send();
                //         //alert("Tus articulos estan siendo procesados");
                //         xhr.onreadystatechange = function(){
                //                 if(this.readyState == 4 && this.status == 200){
                //                     msg = "ya tienes apartado este producto; realiza una compra";
                //                     var resultadoApartar = JSON.parse(this.responseText);
                //                     alert(resultadoApartar.msg);
                //                     //Realizar la siguiente peticion
                //                     if(resultadoApartar.msg == msg){
                //                         //var id = $(this).attr('id');
                //                         if (actualModel.id_producto != null && actualModel.id_producto != undefined) {
                //                             //alert("id " + actualModel.id);
                //                             console.log("comprar "+ actualModel.id_producto);
                //                             comprar(getUserToken(), actualModel.id_producto, (cResult) => {
                //                                 alert(cResult.msg);
                //                             });

                //                         } else console.log("Error al consegir el id");
                //                     }
                //                     else
                //                         //alert("Lo sentimos no hay productos disponibles");
                //                         console.log(resultadoApartar.msg);
                //                 }
                //             //else(console.log(this.readyState));
                //          }
                //     })  

                // });*/


            }
        }
    }
}

$(document).on('click', 'button[id="btnApartar"]', function(event) {
    let id = this.value;
    var nArticulos = $('#numeroArticulos').val();
    if (nArticulos > 0) {
        $(banco).modal("hide");
       // var xhr = new XMLHttpRequest();
        //console.log("num" + nArticulos);
        //xhr.open("GET", endpoint("/ProductSelling/requestBuy/" + id + "/" + getUserToken() + "/" + nArticulos));
        //xhr.send();
        //alert("Tus articulos estan siendo procesados");
        //xhr.onreadystatechange = function() {
           // if (this.readyState == 4 && this.status == 200) {
               // msg = "ya tienes apartado este producto; realiza una compra";
               // var resultadoApartar = JSON.parse(this.responseText);
                //alert(resultadoApartar.msg);
                //Realizar la siguiente peticion
                //if (resultadoApartar.msg == msg) {
                    //var id = $(this).attr('id');
                    if (id != null && id != undefined) {
                        //alert("id " + actualModel.id);
                        console.log("comprar " + id);
                        comprar(getUserToken(), id, nArticulos, (cResult) => {
                            alert(cResult.msg);
                            //Falta este mensaje, quitar realiza una compra
                        });

                    } else console.log("Error al consegir el id");
                //} else
                //alert("Lo sentimos no hay productos disponibles");
                    //alert(resultadoApartar.msg)
                    //console.log(resultadoApartar.msg);
            //}
        
    } else {
        alert("Selecciona un numero de articulos");
    }
})



$(document).on('click', 'button[class="tarjeta"]', function(event) {
    let id = this.id;
    console.log("Se presionó el Boton con Id :" + id)
    $(banco).modal("show");
    document.getElementById("btnApartar").value = id;

});

window.onload = function() {
    //document.location.href="index.html";
    loadProducts(0);
}

$("#llaveros").click(function() {
    loadProducts(3);
    
})

$("#camisas").click(function() {

    loadProducts(2);
})

$("#cachuchas").click(function() {

    loadProducts(1);
})

$("#tazas").click(function() {
    loadProducts(4)
})