//leer todas las cuentad existentes en el banco

function cuentasComponent(ModeloCuentas) {
    return "<tr>"+
    "<td>"+ModeloCuentas.correo+"</td>"+
    "<td>"+ModeloCuentas.Saldo+"</td>"+
    "<td><input class = 'saldo' type = 'number' min = '"+ModeloCuentas.Saldo+"'<button id = '"+ModeloCuentas.ID_Cuenta+"' class = 'modificar'>Modificar</button></td>"+
    "<td><button id = '"+ModeloCuentas.ID_Cuenta+"' class = 'eliminar'>Eliminar</button></td>"+
    "<td>"+ModeloCuentas.correo+"</td>"+
    "</tr>"
}

function loadCuentas(){
    xhr.open("GET", endpoint("/GetAllAccount"));
    xhr.send();
    $("#containerCuentas").html("<h1>CARGANDO...</h1>");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#containerCuentas").html("");
            var jsonCuentas = JSON.parse(this.responseText);
            for (var i = 0; i < jsonCuentas.length; i++) {
                var actualModel = jsonCuentas[i];
                $("#Cuentas").append(productoComponent(actualModel));
            }
        }
    }
}

function modificar(id,ammount){
    xhr.open("GET", endpoint("/UpdateAmmount/"+id+"/"+ammount));
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Modificacion correcta");
            loadCuentas();
        }
    }
}

$(document).on('click', 'button[class="modificar"]', function(event) {
    let id = this.value;
    var inSaldo = document.getElementById(id).getElementsByClassName("saldo")[0];
    var nSaldo = inSaldo.value;
    if (id != null && id != undefined && nSaldo != null && nSaldo != undefined) {
        modificar(id,nSaldo);
    } else console.log("Error al consegir el id");
})

window.onload = function() {
    loadCuentas();
}