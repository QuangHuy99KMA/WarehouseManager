function validateForm() {
    let nameCustomer = document.getElementById("name-customer").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let taxCode = document.getElementById("tax-code").value;

    if (nameCustomer == "" || email == "" || phone == "" || taxCode == "") {
        alert("Không được để trống");
        return false;
    }

    return true;
}

function showData() {
    let customerList;
    if (localStorage.getItem("customerList") == null) {
        customerList = [];
    }
    else {
        customerList = JSON.parse(localStorage.getItem("customerList"));
    }

    let html = "";

    customerList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.nameCustomer + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.taxCode + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button>'
        html += '<button onclick="updateData(' + index + ')"class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function addData() {
    if (validateForm() == true) {
        let nameCustomer = document.getElementById("name-customer").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let taxCode = document.getElementById("tax-code").value;

        let customerList;
        if (localStorage.getItem("customerList") == null) {
            customerList = [];
        }
        else {
            customerList = JSON.parse(localStorage.getItem("customerList"));
        }

        customerList.push({
            nameCustomer: nameCustomer,
            email: email,
            phone: phone,
            taxCode: taxCode,
        });

        localStorage.setItem("customerList", JSON.stringify(customerList));
        showData();
        document.getElementById("nameCustomer").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("tax-code").value = "";
    }
}

function deleteData(index) {
    let customerList;
    if (localStorage.getItem("customerList") == null) {
        customerList = [];
    }
    else {
        customerList = JSON.parse(localStorage.getItem("customerList"));
    }

    let result = confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (result == true) {
        customerList.splice(index, 1);
        localStorage.setItem("customerList", JSON.stringify(customerList));
        showData();
    }
    else { showData(); }
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let customerList;
    if (localStorage.getItem("customerList") == null) {
        customerList = [];
    }
    else {
        customerList = JSON.parse(localStorage.getItem("customerList"));
    }

    document.getElementById("name-customer").value = customerList[index].nameCustomer;
    document.getElementById("email").value = customerList[index].email;
    document.getElementById("phone").value = customerList[index].phone;
    document.getElementById("tax-code").value = customerList[index].taxCode;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            customerList[index].sku = document.getElementById("name-customer").value;
            customerList[index].skuPartner = document.getElementById("email").value;
            customerList[index].name = document.getElementById("phone").value;
            customerList[index].typeProduct = document.getElementById("tax-code").value;

            localStorage.setItem("customerList", JSON.stringify(customerList));

            alert("Thông tin sản phẩm được cập nhật thành công");

            showData();

            document.getElementById("name-customer").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("tax-code").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}