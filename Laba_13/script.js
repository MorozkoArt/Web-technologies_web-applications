document.getElementById("main-form").addEventListener("submit", checkForm);
        
function checkForm(event) {
    event.preventDefault();
    var el = document.getElementById("main-form");
    var name = el.name.value;
    var pass = el.password.value;
    var repass = el.repass.value;
    var error = document.getElementById("error");
    
    document.getElementById("name").classList.remove("invalid");
    document.getElementById("pass").classList.remove("invalid");
    document.getElementById("repass").classList.remove("invalid");
    document.getElementById("name").classList.remove("valid");
    document.getElementById("pass").classList.remove("valid");
    document.getElementById("repass").classList.remove("valid");
    
    var fail = "";
    
    if (name === "") {
        fail += "Введите имя<br>";
        document.getElementById("name").classList.add("invalid");
    }
    else if (name.length <= 1 || name.length >= 10) {
        fail += "Имя должно быть больше 1 и меньше 10 знаков<br>";
        document.getElementById("name").classList.add("invalid");
    }
    else{
        document.getElementById("name").classList.add("valid");
    }
    
    if (pass === "") {
        fail += "Введите пароль<br>";
        document.getElementById("pass").classList.add("invalid");
        document.getElementById("repass").classList.add("invalid");
    }
    else if (repass === "") {
        fail += "Повторите пароль<br>";
        document.getElementById("pass").classList.add("invalid");
        document.getElementById("repass").classList.add("invalid");
    }
    else if (pass !== repass && pass !== "" && repass !== "") {
        fail += "Пароли не совпадают<br>";
        document.getElementById("pass").classList.add("invalid");
        document.getElementById("repass").classList.add("invalid");
    } 
    else if (pass.split("&").length > 1) {
        fail += "Пароль содержит запрещенный символ '&'<br>";
        document.getElementById("pass").classList.add("invalid");
        document.getElementById("repass").classList.add("invalid");
    }
    else {
        document.getElementById("pass").classList.add("valid");
        document.getElementById("repass").classList.add("valid");
    }

    if (fail !== "") {
        error.innerHTML = fail;
    } else {
        error.innerHTML = "";
        alert("Все данные корректно заполнены");
        window.location = 'https://github.com/MorozkoArt';
    }
}