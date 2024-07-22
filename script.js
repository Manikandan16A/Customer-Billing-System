$(document).ready(function(){

var items = [];

$("#item-form").on("submit", addItemToCart);
$("#cart-table").on("click", ".btn-danger", removeItemFromCart);
$("#generate-invoice").on("click", generateInvoice);

function addItemToCart(event){
    event.preventDefault();

    var itemName = $("#item-name").val();
    var itemPrice = $("#item-price").val();

    if(itemName !== "" && itemPrice !== ""){
        var item = {
            name: itemName,
            price: parseFloat(itemPrice),
        };

        items.push(item);
        $("#cart-table tbody").append(
            "<tr><td>" +
                item.name +
                "</td><td>$" +
                item.price.toFixed(2) +
                '</td><td><button class="btn btn-sm btn-danger"><i class="fa fa-trash-alt"></i></button></td></tr>'
        );

        updateTotalCost();
        $("#item-name").val("");
        $("#item-price").val("");
    }
}

function removeItemFromCart(){
    var index = $(this).closest("tr").index();
    items.slice(index,1);
    $(this).closest("tr").remove();
    updateTotalCost();
}

function updateTotalCost() {
    var totalCost = 0;
    items.forEach(function(item){
        totalCost += item.price;
    });
    $("#total-cost").text("Total Cost: $" + totalCost.toFixed(2));
}

function generateInvoice() {
    var invoice = `<html>
<head>
<title>INVOICE</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<div class="container mt-5">
    <h1 class="text-center">Invoice</h1>
    <table class="table">
    <thead>
        <tr>
        <th>Item Name</th>
        <th>Item Price</th>
        </tr>
    </thead>
    <tbody>`;

items.forEach(function (item){
    invoice +=
        "<tr><td>" +
        item.name +
        "</td><td>" +
        item.price.toFixed(2) +
        "</td></tr>";
});

invoice +=
    '</tbody><table><p class="text-right">Total Cost: $' +
    getTotalCost() +
    "</p></div></body></html>";

var popup = window.open("","_blank");
popup.document.open();
popup.document.write(invoice);
popup.document.close();
}

function getTotalCost()
{
    var totalCost = 0;
    items.forEach(function (item){
        totalCost += item.price;
    });
    return totalCost.toFixed(2);
}
});