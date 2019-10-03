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
							            "<h4 class='product-price'>"+ModeloProducto.precio+"</h4>"+
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
			    
                
				function loadProducts()
				{
                        var xhr = new XMLHttpRequest();
                        
                    xhr.open("GET","http://localhost:3000/ProductSelling/retrive/0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ");
                    xhr.send();
                    xhr.onreadystatechange= function()
                    {
                        if(this.readyState ==4 && this.status ==200)
                        {
                            var jsonProductos =   JSON.parse(this.responseText);
                            console.log(jsonProductos);
                            //console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\
                            for(var i =0; i<jsonProductos.productos.length;i++)
                            {
                                $("#containerProductos").append(productoComponent(jsonProductos.productos[i]));
                            
                            }
                        }
                    }
				}

				window.onload = function() {
					loadProducts();
                };