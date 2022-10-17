let URL_BASE="http://localhost:8080";
let Computer=null;

//Ejecucion
$(document).ready(function(){
getAllComputers();
$("#modalNewComputer").hide();
});

function openModal(id){
if(id==-1){
$("#buttonAdd").show();
$("#buttonUpdate").hide();
$("#txtId").val(-1);
$("#txtName").val();
$("#txtBrand").val();
$("#numYear").val();
$("#txtDescription").val();
}
else{
$("#buttonAdd").hide();
$("#buttonUpdate").show();
Computer=getComputer(id);
$("#txtId").val(Computer.id);
$("#txtName").val(Computer.name);
$("#txtBrand").val(Computer.brand);
$("#numYear").val(Computer.year);
$("#txtDescription").val(Computer.description);
}
$("#modalNewComputer").show();
}

function closeModal(){
$("#modalNewComputer").hide();
}

function updateDataGrid(items){
$("#tblComputers").find("tr:gt(0)").remove();
let data="";
for (let i=0; i<items.length;i++){
data += "<tr>"
data += "<td>" + items[i].name + "</td>"
data += "<td>" + items[i].brand + "</td>"
data += "<td>" + items[i].year + "</td>"
data += "<td>" + items[i].description + "</td>"
data += "<td><span onclick= \"openModal("+ items[i].id + ")\">A</span></td>";
data += "<td><span onclick= \"deleteComputer("+ items[i].id + ")\">E</span></td>";
data += "</tr>"
}
$("#tblComputers > tbody:last-child").append(data)
}

function getAllComputers(){
$.ajax({
url: URL_BASE + "/api/Computer/all",
type: "GET",
datatype: "JSON"
})
.done( function(response){
console.log(response)
updateDataGrid(response)
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo los computadores")
});
}

function getComputer(idComputer){
$.ajax({
async: false,
url: URL_BASE + "/api/Computer/" + idComputer,
type: "GET",
datatype: "JSON"
})
.done(function(response){
Computer=response
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo el computador")
});
return Computer
}

function saveComputer(){
Computer={
name: $("#txtName").val(),
brand: $("#txtBrand").val(),
year: $("#numYear").val(),
description: $("#txtDescription").val(),
}
let body = JSON.stringify(Computer)
$.ajax({
url: URL_BASE + "/api/Computer/save",
type: "POST",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Computador agregado");
getAllComputers();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla creando el Computador ");
});
closeModal();
}

function updateComputer(){
Client={
id: $("#txtId").val(),
name: $("#txtName").val(),
brand: $("#txtBrand").val(),
year: $("#numYear").val(),
description: $("#txtDescription").val(),
}
let body = JSON.stringify(Computer)
$.ajax({
url: URL_BASE + "/api/Computer/update",
type: "PUT ",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Computador Actualizado");
getAllComputers();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Actualizando el Computador");
});
closeModal();
}

function deleteComputer(idComputer){
$.ajax({
url: URL_BASE + "/api/Computer/"+ idComputer,
type: "DELETE",
datatype: "JSON"
})
.done( function(response){
console.log(response);
alert("Computador Eliminado");
getAllComputers();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Eliminando el Computador"+idComputer);
});
}