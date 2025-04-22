let db;
        
function openOrCreate() {
    const request = indexedDB.open("dbUser", 1);
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        let store = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        store.createIndex("name", "name", { unique: false });
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        loadUsers();
    };
    request.onerror = function(event) {
        console.error("Ошибка открытия базы данных:", event.target.error);
    };
}

function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    if (!name || !email) {
        alert("Пожалуйста, заполните все поля");
        return;
    }
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    store.put({ name: name, email: email });
    tx.oncomplete = () => {
        loadUsers();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    };
}

function getUsersByName() {
    const name = document.getElementById("namesearch").value;
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("name");
    const request = index.getAll(name);

    request.onsuccess = function() {
        const users = request.result;
        const tbody = document.querySelector("#found-users tbody");
        tbody.innerHTML = "";

        users.forEach(user => {
            const row = tbody.insertRow();
            row.insertCell().textContent = user.id;
            row.insertCell().textContent = user.name;
            row.insertCell().textContent = user.email;
        });
    };
}

function loadUsers() {
    const tx = db.transaction("users", "readonly"); 
    const store = tx.objectStore("users"); 
    const request = store.getAll(); 

    request.onsuccess = function() { 
        const users = request.result; 
        var str = "";
        for(var i = 0; i < users.length; i++)
        {
            str += "<li>" + users[i].id + " "+ users[i].name + " " + users[i].email + "</li>";
        }
        document.getElementById("user-list").innerHTML = str;
    };
}

function deleteUser() {
    const id = Number(document.getElementById("delete-id").value);
    
    if (!id) {
        alert("Пожалуйста, введите ID пользователя");
        return;
    }

    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    store.delete(id);

    tx.oncomplete = () => {
        loadUsers();
        document.getElementById("delete-id").value = "";
    };
}

function clearDB() {
    if (!confirm("Вы уверены, что хотите очистить базу данных?")) return;
    
    const tx = db.transaction("users", "readwrite");
    for (const storeName of db.objectStoreNames) {
        const store = tx.objectStore(storeName);
        store.clear();
    }

    tx.oncomplete = () => {
        console.log("Все данные удалены из хранилища.");
        loadUsers();
    };
}

function deleteDB() {
    if (!confirm("Вы уверены, что хотите удалить базу данных?")) return;
    
    db.close();
    const deleteRequest = indexedDB.deleteDatabase("dbUser");

    deleteRequest.onsuccess = function() {
        console.log("База данных удалена успешно");
    };

    deleteRequest.onerror = function(event) {
        console.error("Ошибка при удалении базы данных:", event);
    };

    deleteRequest.onblocked = function () {
        console.warn("Удаление заблокировано. Возможно, база всё ещё используется в другом окне.");
    };
}
