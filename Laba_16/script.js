class Person {
    constructor(name, birthDate) {
        this.name = name;
        this.birthDate = new Date(birthDate);
    }
    
    getFormattedBirthDate() {
        return this.birthDate.toLocaleDateString('ru-RU');
    }
}

const people = [];
let isTableVisible = false;

function toggleTable() {
    const tableContainer = document.getElementById('tableContainer');
    const showBtn = this;
    
    if (isTableVisible) {
        tableContainer.innerHTML = '';
        isTableVisible = false;
        showBtn.textContent = 'ПОКАЗАТЬ';
        return;
    }
    
    if (people.length === 0) {
        showMessage('Нет данных для отображения', 'warning');
        return;
    }
    
    renderTable();
    isTableVisible = true;
    showBtn.textContent = 'СКРЫТЬ';

}

function renderTable() {
    const tableContainer = document.getElementById('tableContainer');
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Дата рождения</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    people.forEach((person, index) => {
        tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${person.name}</td>
                <td>${person.getFormattedBirthDate()}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = type;
}

document.getElementById('okBtn').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value.trim();
    const birthDate = document.getElementById('birthDateInput').value;
    
    // Проверка введенных данных
    if (!name) {
        showMessage('Пожалуйста, введите имя!', 'warning');
        return;
    }
    
    if (!birthDate) {
        showMessage('Пожалуйста, выберите дату рождения!', 'warning');
        return;
    }
    const person = new Person(name, birthDate);
    people.push(person);
    
    // Очищаем поля ввода
    document.getElementById('nameInput').value = '';
    document.getElementById('birthDateInput').value = '';
    
    showMessage(`Пользователь "${name}" успешно добавлена!`, 'success');

    if (isTableVisible) {
        renderTable();
    }
});

document.getElementById('showBtn').addEventListener('click', toggleTable);