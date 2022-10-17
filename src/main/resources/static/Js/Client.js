let URL_BASE="http://localhost:8080";
let Client=null;

//Ejecucion
$(document).ready(function(){
getAllClients();
$("#modalNewClient").hide();
});

function openModal(id){
if(id==-1){
$("#buttonAdd").show();
$("#buttonUpdate").hide();
$("#txtIdClient").val(-1);
$("#txtEmail").val();
$("#passPassword").val();
$("#txtName").val();
$("#numAge").val();
}
else{
$("#buttonAdd").hide();
$("#buttonUpdate").show();
Client=getClient(idClient);
$("#txtIdClient").val(Client.idClient);
$("#txtEmail").val(Client.email);
$("#passPassword").val(Client.password);
$("#txtName").val(Client.name);
$("#numAge").val(Client.age);
}
$("#modalNewClient").show();
}

function closeModal(){
$("#modalNewClient").hide();
}

function updateDataGrid(items){
$("#tblClients").find("tr:gt(0)").remove();
let data="";
for (let i=0; i<items.length;i++){
data += "<tr>"
data += "<td>" + items[i].email + "</td>"
data += "<td>" + items[i].password + "</td>"
data += "<td>" + items[i].name + "</td>"
data += "<td>" + items[i].age + "</td>"
data += "<td><span onclick= \"openModal("+ items[i].idClient + ")\">A</span></td>";
data += "<td><span onclick= \"deleteClient("+ items[i].idClient + ")\">E</span></td>";
data += "</tr>"
}
$("#tblClients > tbody:last-child").append(data)
}

function getAllClients(){
$.ajax({
url: URL_BASE + "/api/Client/all",
type: "GET",
datatype: "JSON"
})
.done( function(response){
console.log(response)
updateDataGrid(response)
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo los clientes")
});
}

function getClient(idClient){
$.ajax({
async: false,
url: URL_BASE + "/api/Client/" + idClient,
type: "GET",
datatype: "JSON"
})
.done(function(response){
Client=response
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo el cliente")
});
return Client
}

function saveClient(){
Client={
email: $("#txtEmail").val(),
password: $("#passPassword").val(),
name: $("#txtName").val(),
age: $("#numAge").val()
}
let body = JSON.stringify(Client)
$.ajax({
url: URL_BASE + "/api/Client/save",
type: "POST",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Cliente agregado");
getAllClients();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla creando el Cliente ");
});
closeModal();
}

function updateClient(){
Client={
idClient: $("#txtIdClient").val(),
email: $("#txtEmail").val(),
password: $("#passPassword").val(),
name: $("#txtName").val(),
age: $("#numAge").val()
}
let body = JSON.stringify(Client)
$.ajax({
url: URL_BASE + "/api/Client/update",
type: "PUT ",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Cliente Actualizado");
getAllClients();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Actualizando el cliente");
});
closeModal();
}

function deleteClient(idClient){
$.ajax({
url: URL_BASE + "/api/Client/"+ idClient,
type: "DELETE",
datatype: "JSON"
})
.done( function(response){
console.log(response);
alert("Cliente Eliminado");
getAllClients();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Eliminando el cliente"+idClient);
});
}