let URL_BASE="http://localhost:8080";
let Reservation=null;

//Ejecucion
$(document).ready(function(){
getAllReservations();
$("#modalNewReservation").hide();
});

function openModal(id){
if(id==-1){
$("#buttonAdd").show();
$("#buttonUpdate").hide();
$("#txtIdReservation").val(-1);
$("#dateStartDate").val();
$("#dateDevolutionDate").val();

}
else{
$("#buttonAdd").hide();
$("#buttonUpdate").show();
Reservation=getreservation(idReservation);
$("#txtIdReservation").val(Reservation.idReservation);
$("#dateStartDate").val(Reservation.startDate);
$("#dateDevolutionDate").val(Reservation.devolutionDate);
}
$("#modalNewReservation").show();
}

function closeModal(){
$("#modalNewReservation").hide();
}

function updateDataGrid(items){
$("#tblReservations").find("tr:gt(0)").remove();
let data="";
for (let i=0; i<items.length;i++){
data += "<tr>"
data += "<td>" + items[i].startDate + "</td>"
data += "<td>" + items[i].devolutionDate + "</td>"
data += "<td><span onclick= \"openModal("+ items[i].idReservation + ")\">A</span></td>";
data += "<td><span onclick= \"deleteReservation("+ items[i].idReservation + ")\">E</span></td>";
data += "</tr>"
}
$("#tblReservations > tbody:last-child").append(data)
}

function getAllReservations(){
$.ajax({
url: URL_BASE + "/api/Reservation/all",
type: "GET",
datatype: "JSON"
})
.done( function(response){
console.log(response)
updateDataGrid(response)
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo las Reservaciones")
});
}

function getReservation(idReservation){
$.ajax({
async: false,
url: URL_BASE + "/api/Reservation/" + idReservation,
type: "GET",
datatype: "JSON"
})
.done(function(response){
Reservation=response
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo la Reservación")
});
return Reservation
}

function saveReservation(){
Reservation={
startDate:$("#dateStartDate").val(),
devolutionDate:$("#dateDevolutionDate").val()
}
let body = JSON.stringify(Reservation)
$.ajax({
url: URL_BASE + "/api/Reservation/save",
type: "POST",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Reservacion Agregada ");
getAllReservations();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla creando la Reservacion ");
});
closeModal();
}

function updateReservation(){
Reservation={
idReservation: $("#txtIdReservation").val(),
startDate: $("#dateStartDate").val(),
devolutionDate: $("#dateDevolutionDate").val()
}
let body = JSON.stringify(Reservation)
$.ajax({
url: URL_BASE + "/api/Reservation/update",
type: "PUT ",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Reservación Actualizada");
getAllReservations();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Actualizando la Reservación");
});
closeModal();
}

function deleteReservation(idReservation){
$.ajax({
url: URL_BASE + "/api/Reservation/"+ idReservation,
type: "DELETE",
datatype: "JSON"
})
.done( function(response){
console.log(response);
alert("Reservación Eliminada");
getAllReservations();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Eliminando la Reservación"+idReservation);
});
}