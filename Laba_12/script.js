let clickCount = 0;
const button = document.getElementById('counterBtn');

function handleClick() {
    clickCount++;
    button.textContent = `Вы нажали на меня ${clickCount} раз`;

    if (clickCount > 10) {
        button.classList.add('highlight');
    }
}
