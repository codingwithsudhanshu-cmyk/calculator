const display = document.getElementById('display');
let num1 = null;
let operator = null;
let waitingForSecondOperand = false;

function appendValue(val) {
    if (display.value === '0' || waitingForSecondOperand) {
        display.value = '';
        waitingForSecondOperand = false;
    }
    
    if (['+', '-', '*', '/'].includes(val)) {
        num1 = display.value;
        operator = val;
        waitingForSecondOperand = true;
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    display.value = '0';
    num1 = null;
    operator = null;
    waitingForSecondOperand = false;
}

async function calculate() {
    if (num1 === null || operator === null) return;

    const num2 = display.value;

    try {
        const response = await fetch('https://calculator-26q3.onrender.com/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1, num2, operator })
});

        const data = await response.json();

        if (response.ok) {
            display.value = data.result;
            num1 = data.result;
            operator = null;
            waitingForSecondOperand = true;
        } else {
            display.value = data.error || 'Error';
        }
    } catch (err) {
        display.value = 'Server Error';
        console.error(err);
    }
}