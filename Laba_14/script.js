const toggleBtn = document.querySelector('.toggle-btn');
const shortText = document.querySelector('.short-text');
const fullText = document.querySelector('.full-text');

function expand() {
    if (fullText.style.display === 'inline') {
        fullText.style.display = 'none';
        shortText.style.display = 'inline';
        toggleBtn.textContent = 'развернуть';
    } else {
        fullText.style.display = 'inline';
        toggleBtn.textContent = 'свернуть';
    }
};