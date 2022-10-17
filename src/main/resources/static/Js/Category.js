let URL_BASE= "http://localhost:8080";
let Category =null;

//Ejecucion
$(document).ready(function (){
  getAllCategorys();
$ ("#modalNewCategory").hide();
});

function openModal(id){
if(id==-1){
$("#buttonAdd").show();
$("#buttonUpdate").hide();
$("#txtId").val(-1);
$("#txtName").val();
$("#txtDescription").val();
}
else{
$("#buttonAdd").hide();
$("#buttonUpdate").show();
Category=getCategory(id);
$("#txtId").val(Category.id);
$("#txtName").val(Category.name);
$("#txtDescription").val(Category.description);
}
$("#modalNewCategory").show();
}

function closeModal(){
$("#modalNewCategory").hide();
}

function updateDataGrid(items){
$("#tblCategorys").find("tr:gt(0)").remove();
let data="";
for (let i=0; i<items.length;i++){
data += "<tr>"
data += "<td>" + items[i].name + "</td>"
data += "<td>" + items[i].description + "</td>"
data += "<td><span onclick= \"openModal("+ items[i].id + ")\">A</span></td>";
data += "<td><span onclick= \"deleteCategory("+ items[i].id + ")\">E</span></td>";
data += "</tr>"
}
$("#tblCategorys > tbody:last-child").append(data)
}

function getAllCategorys(){
$.ajax({
url: URL_BASE + "/api/Category/all",
type: "GET",
datatype: "JSON"
})
.done( function(response){
console.log(response)
updateDataGrid(response)
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo las categorias")
});
}

function getCategory(idCategory){
$.ajax({
async: false,
url: URL_BASE + "/api/Category/" + idCategory,
type: "GET",
datatype: "JSON"
})
.done( function(response){
Category =response
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla obteniendo la categoria")
});
return Category
}

function saveCategory(){
Category = {
name: $("#txtName").val(),
description: $("#txtDescription").val()
}
let body = JSON.stringify(Category)
$.ajax({
url: URL_BASE + "/api/Category/save",
type: "POST",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Categoria agregada");
getAllCategorys();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla creando la categoria");
});
closeModal();
}

function updateCategory(){
Category={
id:$("#txtId").val(),
name:$("#txtName").val(),
description:$("#txtDescription").val()
}
let body = JSON.stringify(Category)
$.ajax({
url: URL_BASE + "/api/Category/update",
type: "PUT ",
datatype: "JSON",
data: body,
contentType: "application/json;charset=UTF-8"
})
.done( function(response){
alert("Categoria Actualizada");
getAllCategorys();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Actualizando la categoria");
});
closeModal();
}

function deleteCategory(idCategory){
$.ajax({
url: URL_BASE + "/api/Category/"+idCategory,
type: "DELETE",
datatype: "JSON"
})
.done( function(response){
console.log(response);
alert("Categoria Eliminada");
getAllCategorys();
})
.fail(function (jqXHR, textStatus, errorThrown){
alert("Falla Eliminando la categoria"+idCategory);
});
}