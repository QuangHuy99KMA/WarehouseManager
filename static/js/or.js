function validateForm() {
    let orCode = document.getElementById("or-code").value;
    let quantitySku = document.getElementById("quantity-sku").value;
    let quantityProduct = document.getElementById("quantity-product").value;
    let statusProduct = document.getElementById("status-product").value;
    let buyer = document.getElementById("buyer").value;
    let date = document.getElementById("date").value;

    if (orCode == "" || quantitySku == "" || quantityProduct == "" || statusProduct == "" || date == "" || buyer == "") {
        alert("Không được để trống");
        return false;
    }

    return true;
}

function showData() {
    let orList;
    if (localStorage.getItem("orList") == null) {
        orList = [];
    }
    else {
        orList = JSON.parse(localStorage.getItem("orList"));
    }

    let html = "";

    orList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.orCode + "</td>";
        html += "<td>" + element.quantitySku + "</td>";
        html += "<td>" + element.quantityProduct + "</td>";
        html += "<td>" + element.statusProduct + "</td>";
        html += "<td>" + element.buyer + "</td>";
        html += "<td>" + element.date + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button>'
        html += '<button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function addData() {
    if (validateForm() == true) {
        let orCode = document.getElementById("or-code").value;
        let quantitySku = document.getElementById("quantity-sku").value;
        let quantityProduct = document.getElementById("quantity-product").value;
        let statusProduct = document.getElementById("status-product").value;
        let buyer = document.getElementById("buyer").value;
        let date = document.getElementById("date").value;

        let orList;
        if (localStorage.getItem("orList") == null) {
            orList = [];
        }
        else {
            orList = JSON.parse(localStorage.getItem("orList"));
        }

        orList.push({
            orCode: orCode,
            quantitySku: quantitySku,
            quantityProduct: quantityProduct,
            statusProduct: statusProduct,
            buyer: buyer,
            date: date
        });

        localStorage.setItem("orList", JSON.stringify(orList));
        showData();
        document.getElementById("orCode").value = "";
        document.getElementById("quantitySku").value = "";
        document.getElementById("quantityProduct").value = "";
        document.getElementById("statusProduct").value = "";
        document.getElementById("buyer").value = "";
        document.getElementById("date").value = "";
    }
}

function deleteData(index) {
    let orList;
    if (localStorage.getItem("orList") == null) {
        orList = [];
    }
    else {
        orList = JSON.parse(localStorage.getItem("orList"));
    }

    let result = confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (result == true) {
        orList.splice(index, 1);
        localStorage.setItem("orList", JSON.stringify(orList));
        showData();
    }
    else { showData(); }
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let orList;
    if (localStorage.getItem("orList") == null) {
        orList = [];
    }
    else {
        orList = JSON.parse(localStorage.getItem("orList"));
    }

    document.getElementById("or-code").value = orList[index].onclickrCode;
    document.getElementById("quantity-sku").value = orList[index].quantitySku;
    document.getElementById("quantity-product").value = orList[index].quantityProduct;
    document.getElementById("status-product").value = orList[index].statusProduct;
    document.getElementById("buyer").value = orList[index].buyer;
    document.getElementById("date").value = orList[index].date;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            orList[index].orCode = document.getElementById("or-code").value;
            orList[index].quantitySku = document.getElementById("quantity-sku").value;
            orList[index].quantityProduct = document.getElementById("quantity-product").value;
            orList[index].statusProduct = document.getElementById("status-product").value;
            orList[index].buyer = document.getElementById("buyer").value;
            orList[index].date = document.getElementById("date").value;

            localStorage.setItem("orList", JSON.stringify(orList));

            alert("Thông tin sản phẩm được cập nhật thành công");

            showData();

            document.getElementById("or-code").value = "";
            document.getElementById("quantity-sku").value = "";
            document.getElementById("quantity-product").value = "";
            document.getElementById("status-product").value = "";
            document.getElementById("buyer").value = "";
            document.getElementById("date").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}