function validateForm() {
    let irCode = document.getElementById("ir-code").value;
    let quantitySku = document.getElementById("quantity-sku").value;
    let quantityProduct = document.getElementById("quantity-product").value;
    let statusProduct = document.getElementById("status-product").value;
    let date = document.getElementById("date").value;
    let warehouse = document.getElementById("warehouse").value;

    if (irCode == "" || quantitySku == "" || quantityProduct == "" || statusProduct == "" || date == "" || warehouse == "") {
        alert("Không được để trống");
        return false;
    }

    return true;
}

function showData() {
    let irList;
    if (localStorage.getItem("irList") == null) {
        irList = [];
    }
    else {
        irList = JSON.parse(localStorage.getItem("irList"));
    }

    let html = "";

    irList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.irCode + "</td>";
        html += "<td>" + element.quantitySku + "</td>";
        html += "<td>" + element.quantityProduct + "</td>";
        html += "<td>" + element.statusProduct + "</td>";
        html += "<td>" + element.date + "</td>";
        html += "<td>" + element.warehouse + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button>'
        html += '<button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function addData() {
    if (validateForm() == true) {
        let irCode = document.getElementById("ir-code").value;
        let quantitySku = document.getElementById("quantity-sku").value;
        let quantityProduct = document.getElementById("quantity-product").value;
        let statusProduct = document.getElementById("status-product").value;
        let date = document.getElementById("date").value;
        let warehouse = document.getElementById("warehouse").value;

        let irList;
        if (localStorage.getItem("irList") == null) {
            irList = [];
        }
        else {
            irList = JSON.parse(localStorage.getItem("irList"));
        }

        irList.push({
            irCode: irCode,
            quantitySku: quantitySku,
            quantityProduct: quantityProduct,
            statusProduct: statusProduct,
            date: date,
            warehouse: warehouse
        });

        localStorage.setItem("irList", JSON.stringify(irList));
        showData();
        document.getElementById("irCode").value = "";
        document.getElementById("quantitySku").value = "";
        document.getElementById("quantityProduct").value = "";
        document.getElementById("statusProduct").value = "";
        document.getElementById("date").value = "";
        document.getElementById("warehouse").value = "";
    }
}

function deleteData(index) {
    let irList;
    if (localStorage.getItem("irList") == null) {
        irList = [];
    }
    else {
        irList = JSON.parse(localStorage.getItem("irList"));
    }

    let result = confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (result == true) {
        irList.splice(index, 1);
        localStorage.setItem("irList", JSON.stringify(irList));
        showData();
    }
    else { showData(); }
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let irList;
    if (localStorage.getItem("irList") == null) {
        irList = [];
    }
    else {
        irList = JSON.parse(localStorage.getItem("irList"));
    }

    document.getElementById("ir-code").value = irList[index].irCode;
    document.getElementById("quantity-sku").value = irList[index].quantitySku;
    document.getElementById("quantity-product").value = irList[index].quantityProduct;
    document.getElementById("status-product").value = irList[index].statusProduct;
    document.getElementById("date").value = irList[index].date;
    document.getElementById("warehouse").value = irList[index].warehouse;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            irList[index].irCode = document.getElementById("ir-code").value;
            irList[index].quantitySku = document.getElementById("quantity-sku").value;
            irList[index].quantityProduct = document.getElementById("quantity-product").value;
            irList[index].statusProduct = document.getElementById("status-product").value;
            irList[index].date = document.getElementById("date").value;
            irList[index].warehouse = document.getElementById("warehouse").value;

            localStorage.setItem("irList", JSON.stringify(irList));

            alert("Thông tin sản phẩm được cập nhật thành công");

            showData();

            document.getElementById("ir-code").value = "";
            document.getElementById("quantity-sku").value = "";
            document.getElementById("quantity-product").value = "";
            document.getElementById("status-product").value = "";
            document.getElementById("date").value = "";
            document.getElementById("warehouse").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}