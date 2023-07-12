// function signup(e) {
//     event.preventDefault();
//     let username = document.getElementById("username").value;
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     let user = {
//         username: username,
//         email: email,
//         password: password,
//     }

//     let json = JSON.stringify(user);
//     localStorage.setItem(username, json);
//     alert("Dang ky thanh cong");
// }

// validation form register and register user local storage
const inputNameRegister = document.querySelector(".input-signup-name");
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputRepeatPasswordRegister = document.querySelector(".input-signup-repeat-password");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage
btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    let a = JSON.parse(localStorage.getItem(inputUsernameRegister.value));
    if (
        inputNameRegister.value === "" ||
        inputUsernameRegister.value === "" ||
        inputPasswordRegister.value === "" ||
        inputRepeatPasswordRegister.value === ""
    ) {
        alert("Vui lòng không để trống")
    }
    else if (a.username === inputUsernameRegister.value) {
        alert("Tên tài khoản đã tồn tại. Nếu bạn là chủ tải khoản vui lòng đăng nhập");
    }
    else if (inputUsernameRegister.value.length < 5) {
        alert("Tên tài khoản và mật khẩu có độ dài ít nhất là 6 ký tự");
    } else if (
        inputPasswordRegister.value !== inputRepeatPasswordRegister.value
    ) {
        alert("Mật khẩu nhập vào khác nhau")
    }
    else {
        // array user
        const user = {
            name: inputNameRegister.value,
            username: inputUsernameRegister.value,
            password: inputPasswordRegister.value,
        };
        let json = JSON.stringify(user);
        localStorage.setItem(inputUsernameRegister.value, json);
        alert("Đăng ký thành công");
        window.location.href = "pages-log-in.html";
    }
});

