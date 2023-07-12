function validateForm() {
    let sku = document.getElementById("sku").value;
    let skuPartner = document.getElementById("sku-partner").value;
    let name = document.getElementById("name").value;
    let typeProduct = document.getElementById("type-product").value;

    if (sku == "" || skuPartner == "" || name == "" || typeProduct == "") {
        alert("Không được để trống");
        return false;
    }

    return true;
}

function showData() {
    let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    let html = "";

    productList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.sku + "</td>";
        html += "<td>" + element.skuPartner + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.typeProduct + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button>'
        html += '<button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function addData() {
    if (validateForm() == true) {
        let sku = document.getElementById("sku").value;
        let skuPartner = document.getElementById("sku-partner").value;
        let name = document.getElementById("name").value;
        let typeProduct = document.getElementById("type-product").value;

        let productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        }
        else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }

        productList.push({
            sku: sku,
            skuPartner: skuPartner,
            name: name,
            typeProduct: typeProduct,
        });

        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("sku").value = "";
        document.getElementById("sku-partner").value = "";
        document.getElementById("name").value = "";
        document.getElementById("type-product").value = "";
    }
}

function deleteData(index) {
    let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    let result = confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (result == true) {
        productList.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
    }
    else { showData(); }
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    document.getElementById("sku").value = productList[index].sku;
    document.getElementById("sku-partner").value = productList[index].skuPartner;
    document.getElementById("name").value = productList[index].name;
    document.getElementById("type-product").value = productList[index].typeProduct;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            productList[index].sku = document.getElementById("sku").value;
            productList[index].skuPartner = document.getElementById("sku-partner").value;
            productList[index].name = document.getElementById("name").value;
            productList[index].typeProduct = document.getElementById("type-product").value;

            localStorage.setItem("productList", JSON.stringify(productList));

            alert("Thông tin sản phẩm được cập nhật thành công");

            showData();

            document.getElementById("sku").value = "";
            document.getElementById("sku-partner").value = "";
            document.getElementById("name").value = "";
            document.getElementById("type-product").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "block";
        }
    }
}