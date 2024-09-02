// script.js

const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));

let currentInput = '';
let previousInput = '';
let operation = null;
let resultDisplayed = false; // Track if result is currently displayed

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.getAttribute('data-value'));
    });
});

document.addEventListener('keydown', (e) => {
    handleKeyboardInput(e.key);
});

function handleInput(value) {
    if (value === 'C') {
        clear();
    } else if (value === '=') {
        evaluate();
    } else if (['+', '-', '*', '/'].includes(value)) {
        setOperation(value);
    } else {
        appendNumber(value);
    }
}

function handleKeyboardInput(key) {
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        evaluate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clear();
    }
}

function appendNumber(value) {
    if (resultDisplayed) {
        currentInput = ''; // Start fresh after a result is displayed
        resultDisplayed = false;
    }
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    display.innerText = currentInput;
}

function setOperation(value) {
    if (currentInput === '') return;
    if (previousInput !== '' && operation !== null) {
        evaluate();
    }
    operation = value;
    previousInput = currentInput;
    currentInput = '';
    resultDisplayed = false;
}

function evaluate() {
    if (operation === null || currentInput === '') return;
    const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operation);
    display.innerText = isNaN(result) || !isFinite(result) ? 'Error' : result;
    currentInput = result.toString();
    previousInput = '';
    operation = null;
    resultDisplayed = true;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    resultDisplayed = false;
    display.innerText = '0';
}

function deleteLast() {
    if (resultDisplayed) {
        clear();
        return;
    }
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
}

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? NaN : a / b;  // Handle division by zero
        default:
            return NaN;
    }
}
