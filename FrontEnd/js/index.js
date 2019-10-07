function productoComponent(ModeloProducto)
{
	return  "<div class='col-md-3 col-xs-6'>" +
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


function loadProducts(category)
{
	var xhr = new XMLHttpRequest();
		
	xhr.open("GET","http://localhost:3000/ProductSelling/retrive/"+category);
	xhr.send();
	$("#containerProductos").html("");
	xhr.onreadystatechange= function()
	{
		if(this.readyState ==4 && this.status ==200)
		{
			var jsonProductos =   JSON.parse(this.responseText);
			console.log('hola', jsonProductos);
			//console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\
			
			for(var i =0; i<jsonProductos.productos.length;i++)
			{
				$("#containerProductos").append(productoComponent(jsonProductos.productos[i]));
			
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



$("#llaveros").click(function () {


	loadProducts(3);
})

$("#camisas").click(function () {

	loadProducts(2);
})

$("#cachuchas").click(function () {

	loadProducts(1);
})