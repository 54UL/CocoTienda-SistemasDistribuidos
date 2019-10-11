//var CURRENT_IP = "192.168.1.107:3000"
var globales = import ("./Globales.js")


function productoComponent(ModeloProducto)
{
	return  "<div id="+ModeloProducto.id_producto+" class='col-md-3 col-xs-6'>" +
				"<div class='product'>"+
					"<div class='product-img'>"+
						"<img src='img/Llaveros/Lguitarra.jpg' alt=''>"+
					"</div>"+
				"<div class='product-body'>"+
					"<p class='product-category'>SHIT</p>"+
						"<h3 class='product-name'><a href='#'>"+ModeloProducto.nombre+"</a></h3>"+
						"<h4 class='product-price'>"+ModeloProducto.precio_unitario+"</h4>"+
							"<div class='product-btns'>"+
								"<button class='add-to-wishlist'><i class='fa fa-heart-o'></i></button>"+
								"<button class='add-to-cart'><i class='fa fa-shopping-cart'></i></button>"+
								"<button class='add-to-cart'><i class='fa fa-credit-card custom'></i></button>"+
							"</div>"+
				"</div>"+
				"</div>"+
			"</div>"+
			"<div class='clearfix visible-sm visible-xs'>" + 
			"</div>"
}






function comprar(token,productoID){
	return {compra:1 ,msg :"nel no hay fgeria: product id"+productoID};
}


function loadProducts(category)
{
	var xhr = new XMLHttpRequest();
		
	xhr.open("GET", getBaseUrl()+"/ProductSelling/retrive/"+category);
	alert("ip "+CURRENT_IP )
	xhr.send();
	$("#containerProductos").html("<h1>CARGANDO...</h1>");
	xhr.onreadystatechange= function()
	{
		if(this.readyState ==4 && this.status ==200)
		{
			$("#containerProductos").html("");
			var jsonProductos =   JSON.parse(this.responseText);
			console.log('hola', jsonProductos);
			//console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\
			
			for(var i =0; i<jsonProductos.productos.length;i++)
			{
			    var actualModel  =jsonProductos.productos[i];
				$("#containerProductos").append(productoComponent(actualModel));
			
				$("#"+actualModel.id_producto).click(()=> {
					
					var  resultadoCompra =  comprar(globales.getUsrToken(),ids[algunIndiceValido]);

					if(resultadoCompra.compra== 0)
					alert("ha sucedio algo"+resultadoCompra.msg);
					else
					alert(resultadoCompra.msg);

				})
			}
		}
	}
}


window.onload = function() {
		loadProducts(0);
};

$("#tazas").click(function () {
	
	loadProducts(4)
})

var ibk = enpoint();
ibk.id_producto;

$("#llaveros").click(function () {

	alert("usr cookie"+document.cookie.user_token)
	loadProducts(3);
})

$("#camisas").click(function () {

	loadProducts(2);
})

$("#cachuchas").click(function () {

	loadProducts(1);
})

