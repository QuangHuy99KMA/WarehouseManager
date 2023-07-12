function validateForm() {
    let idSupplier = document.getElementById("id-supplier").value;
    let nameSupplier = document.getElementById("name-supplier").value;
    let addressSupplier = document.getElementById("address-supplier").value;
    let phoneSupplier = document.getElementById("phone-supplier").value;

    if (idSupplier == "" || nameSupplier == "" || addressSupplier == "" || phoneSupplier == "") {
        alert("Không được để trống");
        return false;
    }

    return true;
}

function showData() {
    let supplierList;
    if (localStorage.getItem("supplierList") == null) {
        supplierList = [];
    }
    else {
        supplierList = JSON.parse(localStorage.getItem("supplierList"));
    }

    let html = "";

    supplierList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.idSupplier + "</td>";
        html += "<td>" + element.nameSupplier + "</td>";
        html += "<td>" + element.addressSupplier + "</td>";
        html += "<td>" + element.phoneSupplier + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button>'
        html += '<button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function addData() {
    if (validateForm() == true) {
        let idSupplier = document.getElementById("id-supplier").value;
        let nameSupplier = document.getElementById("name-supplier").value;
        let addressSupplier = document.getElementById("address-supplier").value;
        let phoneSupplier = document.getElementById("phone-supplier").value;

        let supplierList;
        if (localStorage.getItem("supplierList") == null) {
            supplierList = [];
        }
        else {
            supplierList = JSON.parse(localStorage.getItem("supplierList"));
        }

        supplierList.push({
            idSupplier: idSupplier,
            nameSupplier: nameSupplier,
            addressSupplier: addressSupplier,
            phoneSupplier: phoneSupplier,
        });

        localStorage.setItem("supplierList", JSON.stringify(supplierList));
        showData();
        document.getElementById("idSupplier").value = "";
        document.getElementById("nameSupplier").value = "";
        document.getElementById("addressSupplier").value = "";
        document.getElementById("phoneSupplier").value = "";
    }
}

function deleteData(index) {
    let supplierList;
    if (localStorage.getItem("supplierList") == null) {
        supplierList = [];
    }
    else {
        supplierList = JSON.parse(localStorage.getItem("supplierList"));
    }

    let result = confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (result == true) {
        supplierList.splice(index, 1);
        localStorage.setItem("supplierList", JSON.stringify(supplierList));
        showData();
    }
    else { showData(); }
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let supplierList;
    if (localStorage.getItem("supplierList") == null) {
        supplierList = [];
    }
    else {
        supplierList = JSON.parse(localStorage.getItem("supplierList"));
    }

    document.getElementById("id-supplier").value = supplierList[index].nameCustomer;
    document.getElementById("name-supplier").value = supplierList[index].email;
    document.getElementById("address-supplier").value = supplierList[index].phone;
    document.getElementById("phone-supplier").value = supplierList[index].taxCode;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            supplierList[index].idSupplier = document.getElementById("id-supplier").value;
            supplierList[index].nameSupplier = document.getElementById("name-supplier").value;
            supplierList[index].addressSupplier = document.getElementById("address-supplier").value;
            supplierList[index].phoneSupplier = document.getElementById("phone-supplier").value;

            localStorage.setItem("supplierList", JSON.stringify(supplierList));

            alert("Thông tin sản phẩm được cập nhật thành công");

            showData();

            document.getElementById("id-supplier").value = "";
            document.getElementById("name-supplier").value = "";
            document.getElementById("address-supplier").value = "";
            document.getElementById("phone-supplier").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}