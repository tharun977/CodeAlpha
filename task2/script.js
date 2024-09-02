// script.js

const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));

let currentInput = '';
let previousInput = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operation = null;
            display.innerText = '0';
        } else if (button.id === 'equals') {
            if (currentInput && previousInput && operation) {
                currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operation).toString();
                operation = null;
                previousInput = '';
                display.innerText = currentInput;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput) {
                if (previousInput && operation) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operation).toString();
                    display.innerText = currentInput;
                }
                operation = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 0;
    }
}
