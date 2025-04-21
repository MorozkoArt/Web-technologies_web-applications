document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('textInput').value;
    const outputDiv = document.getElementById('output');
    const warningDiv = document.getElementById('warning');
    warningDiv.textContent = '';
    
    if (inputText.trim() === '') {
        warningDiv.textContent = 'Пожалуйста, введите текст!';
        return;
    }
    outputDiv.textContent = 'Текст загружается...';
    
    setTimeout(function() {
        outputDiv.textContent = inputText;
    }, 2000);
});