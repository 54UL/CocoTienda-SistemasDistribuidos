



document.getElementById('btnIngresar').addEventListener("click", ingresar);

function ingresar(event){

    event.preventDefault();
/*
    var jsonUsuario = ({
        'usr': $('#correo').val(),
        'pass': $('#contra').val()
    })



    var http = new XMLHttpRequest();
    http.open('POST', "http://localhost:3000/Login/Login/:usr/:pass");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
     }
     http.send(jsonUsuario);
     console.log(jsonUsuario);
*/
    var xhr = new XMLHttpRequest();
                        
    xhr.open("GET","http://localhost:3000/Users/Login/:usr/:pass)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ");
    xhr.send();
    xhr.onreadystatechange= function(event)
    {
        event.preventDefault();
        if(this.readyState ==4 && this.status ==200)
        {
            //var jsonProductos =   JSON.parse(this.responseText);
            var jsonUsuario = ({
                'usr': $('#correo').val(),
                'pass': $('#contra').val()
            })
            console.log(jsonUsuario);
            alert(xhr.responseText);

            //console.log("numero aleatorio" +this.getResponseHeader("holaxd"));\
            // for(var i =0; i<jsonProductos.productos.length;i++)
            // {
            //     $("#containerProductos").append(productoComponent(jsonProductos.productos[i]));
            
            // }
        }
    }
}