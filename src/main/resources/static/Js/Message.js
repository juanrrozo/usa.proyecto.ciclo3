let URL_BASE="http://localhost:8080";
let Message=null;

//Ejecucion
$(document).ready(function(){
getAllMessages();
$("#modalNewMessage").hide();
});

function openModal(id){
if(id==-1){
$("#buttonAdd").show();
$("#buttonUpdate").hide();
$("#txtIdMessage").val(-1);
$("#txtMessageText").val();
}
else{
$("#buttonAdd").hide();
$("#buttonUpdate").show();
Message=getMessage(idMessage);
$("#txtIdMessage").val(Message.idMessage);
$("#txtMessageText").val(Message.messageText);
}
$("#modalNewMessage").show();
}

function closeModal(){
$("#modalNewMessage").hide();
}

function updateDataGrid(items){
$("#tblMessages").find("tr:gt(0)").remove();
let data="";
for (let i=0; i<items.length;i++){
data += "<tr>"
data += "<td>" + items[i].messageText + "</td>"
data += "<td><span onclick= \"openModal("+ items[i].idMessage + ")\">A</span></td>";
data += "<td><span onclick= \"deleteMessage("+ items[i].idMessage + ")\">E</span></td>";
data += "</tr>"
}
$("#tblMessages > tbody:last-child").append(data)
}

function getAllMessages(){
$.ajax({
url: URL_BASE + "/api/Message/all",
type: "GET",
datatype: "JSON"
})
.done( function(response){
console.log(response)
updateDataGrid(response)
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo los Mensajes")
});
}

function getMessage(idMessage){
$.ajax({
async: false,
url: URL_BASE + "/api/Message/" + idMessage,
type: "GET",
datatype: "JSON"
})
.done(function(response){
Message=response
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo el Mensaje")
});
return Message
}

function saveMessage(){
Message={
messageText: $("#txtMessageText").val()
}
let body = JSON.stringify(Message)
$.ajax({
url: URL_BASE + "/api/Message/save",
type: "POST",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Mensaje agregado");
getAllMessages();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla creando el Mensaje ");
});
closeModal();
}

function updateMessage(){
Message={
idMessage: $("#txtIdMessage").val(),
messageText: $("#txtMessageText").val()
}
let body = JSON.stringify(Message)
$.ajax({
url: URL_BASE + "/api/Message/update",
type: "PUT ",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Mensaje Actualizado");
getAllMessages();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Actualizando el Mensaje");
});
closeModal();
}

function deleteMessage(idMessage){
$.ajax({
url: URL_BASE + "/api/Message/"+ idMessage,
type: "DELETE",
datatype: "JSON"
})
.done( function(response){
console.log(response);
alert("Mensaje Eliminado");
getAllMessages();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Eliminando el Mensaje"+idMessage);
});
}