function productoComponent(ModeloProucto)
				{
					return  "<div class='col-md-3 col-xs-6'>" +
							"<div class='product'>"+
							"<div class='product-img'>"+
							"<img src='img/Llaveros/Lguitarra.jpg' alt=''>"+
							"</div>"+
							"<div class='product-body'>"+
							"<p class='product-category'>SHIT</p>"+
							"<h3 class='product-name'><a href='#'>"+ModeloProucto.nombre+"</a></h3>"+
							"<h4 class='product-price'>"+ModeloProucto.precio+"</h4>"+
							"<div class='product-btns'>"+
							"<button class='add-to-wishlist'><i class='fa fa-heart-o'></i></button>"+
							"<button class='add-to-cart'><i class='fa fa-shopping-cart'></i></button>"+
							"</div>"+
							"</div>"+
							"</div>"+
							"</div>"+
							"<div class='clearfix visible-sm visible-xs'></div>"
				}
			
				function loadProducts()
				{
			     
			     // peticion http al back

				 //Dummy test del modelo de productos
				 //var arregloProductos = http("post","localhost/productSelling/retriveAll"); <-pseudo code
				var arregloJSONPrueba =
				{"productos":[{nombre:"taza1",precio:"$666.6"},{nombre:"taza2",precio:"$666.6"},{nombre:"taza3",precio:"$666.6"},{nombre:"taza4",precio:"$666.6"}]};

				//var arregloModelosProductos = JSON.parse(arregloProductosDummy); esto solamente se usa cuando el json venga de un request 
					for(var i =0; i<arregloJSONPrueba.productos.length;i++)
					{
						$("#containerProductos").append(productoComponent(arregloJSONPrueba.productos[i]));
					
					}
				}

				window.onload = function() {
					loadProducts();
                };