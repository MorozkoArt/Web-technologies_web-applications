function askQuestion() {
    let correctAnswer = false;
    
    while (!correctAnswer) {
        const userAnswer = prompt('Сколько будет 2*2?');
        
        if (userAnswer === null) {
            break;
        }
        
        if (userAnswer.trim() === '4') {
            correctAnswer = true;
            alert('Правильно!');
        } else {
            alert('Неверно, попробуйте еще раз.');
        }
    }
}


