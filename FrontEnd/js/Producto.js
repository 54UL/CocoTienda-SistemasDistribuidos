//SAUL CREATE PRODUCT CODE!!!
mostrarBarraTipoProducto();
$('.danger').popover({ 
    html : true,
    content: function() {
    return $('#popover_content_wrapper').html();
    }
});


function sendCreateProductRequest(imgArray,nombreProducto,nombreImagen,precio,Stock,categoria)
{
var xhr = new XMLHttpRequest()
xhr.open("POST","http://localhost:3000/ProductSelling/CreateProduct")
xhr.setRequestHeader("Content-Type","application/json")
xhr.send(JSON.stringify({name:nombreProducto,imgName:nombreImagen,price:precio,stock:Stock,category:Number(categoria),imgData:imgArray}))
xhr.onreadystatechange = function() 
{
if (this.readyState == 4 && this.status == 200)
    {
        alert(this.responseText)
    }
}

}

async function readSingleFile(e) 
{
    return new Promise(async(resolve,reject)=>
    {
        var file = e
        if (!file) {
        return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
        var contents = e.target.result;
    
        var arrayOfPixels = new Uint8Array(contents);
        var array = Array.from(arrayOfPixels)
        resolve(array)
        
        };
        reader.readAsArrayBuffer(file);
    })		
}

async function submitCreateProductData(event)
{
    var archivoImg =  document.getElementById('btnimagen').files[0];
    var nombreProducto = $("#productNameInput").val();
    var category = $("#productCategoryInput").val();
    var stockProducto = $("#productStockInput").val();
    var precioProducto = $("#productPriceInput").val();

    //console.debug(archivoImg)
    console.log("nombre         "+nombreProducto);
    console.log("category       "+category);
    console.log("stockProducto  "+stockProducto);
    console.log("precioProducto "+precioProducto);
    
    var imageArrayData;
    try {
        imageArrayData= await readSingleFile(archivoImg);
    } catch (error) {
        console.log(error);
    }

    
    sendCreateProductRequest(imageArrayData,nombreProducto,archivoImg.name,precioProducto,stockProducto,category);
    //sendImage(files);
};
try {
    document.getElementById("crearProductoBtn").onclick =  submitCreateProductData
} catch (error) {
    alert(error)
}
