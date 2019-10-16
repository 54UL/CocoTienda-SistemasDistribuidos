var insertar = document.getElementById("btnInsertar");
insertar.addEventListener("click", guardarProducto);


function guardarProducto(event){
    event.preventDefault();
    //var k = archivoImagen[0].value;
    var nombreImagen = document.getElementById('inImagen').files[0].name; //nombre del archivo que se subio
    var nombreProducto = document.getElementById('inNombreP').value;
    var precioProducto = document.getElementById("inNombreP").value;
    alert("Guardando");
    alert(nombreImagen+" "+ nombreProducto + " " + precioProducto); 
}