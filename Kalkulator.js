const calculator = {
    displayNumber: '0',
    history:' ',
    operator: null,
    firstNumber: null,
    result: '0',
};
 
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function updateHistory() {
    document.querySelector("#history").innerText = calculator.history;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.history = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
}
function delCalculator() {
    calculator.displayNumber = calculator.displayNumber.slice(0,-1);
    if(calculator.displayNumber.length === 0) {
        calculator.displayNumber = '0' ;
    }
    calculator.history = calculator.history.slice(0,-1);
    if(calculator.history.length === 0) {
        calculator.history = '0' ;
    } 
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        if (calculator.history === '0' && digit == '.'){
            calculator.history += '.';
            calculator.displayNumber += '.';
        } else if (calculator.history == ' ' && digit == '.') {
            calculator.history += '0.'
            calculator.displayNumber += '.'
        } else if(calculator.history == '0' && digit == '.'){
            calculator.displayNumber = digit
            calculator.history = digit;
        } else if(calculator.history == '0') {
            calculator.history = digit;
            calculator.displayNumber = digit; 
        } else {
            calculator.displayNumber = digit;
            calculator.history += digit;
    }
    } else {
        calculator.displayNumber += digit;
        calculator.history += digit;
    }
}
 
function inverseNumber() {
    var panjangdisplay = calculator.displayNumber.length
    if (calculator.displayNumber === '0') {
        calculator.history = "0"
        return;
    }
    calculator.displayNumber = String(calculator.displayNumber * -1);
    if (calculator.history === '0') {
        return;
    } 
    calculator.history = calculator.history.slice(0,calculator.history.length-panjangdisplay);
    calculator.history += calculator.displayNumber;
}
 
function handleOperator(operator) {
    if (calculator.displayNumber == '0' && calculator.history == '0'){
        calculator.history = ' '
        calculator.history += calculator.result;
    } else if (calculator.firstNumber == null) {
        calculator.firstNumber = calculator.displayNumber;
    } else if (calculator.displayNumber === '0') {
        calculator.firstNumber = calculator.firstNumber;
    }
    var last = calculator.history[calculator.history.length -1];
    if (last == 'x' || last == '/' || last == '-' || last == '+' ) {
        calculator.history = calculator.history.substring(0,calculator.history.length-1);
        calculator.history += operator;
    } else {
        calculator.history += operator;
    } 
    calculator.operator = operator;
    calculator.displayNumber = '0';
}

function performCalculation() {
    if (calculator.firstNumber == null && calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
    calculator.result = calculator.history.replace(/x/g, "*");
    calculator.result = calculator.result.replace(/--/g,"+");
    calculator.result = eval(calculator.result);
    calculator.displayNumber = calculator.result;
 }
 
 
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            updateHistory();
            return;
        }
        if (target.classList.contains('delete')) {
            delCalculator();
            updateDisplay();
            updateHistory();
            return;
        }
 
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            updateHistory();
            return;
        }
 
        if (target.classList.contains('equals')) {
            updateHistory();
            performCalculation();
            updateDisplay();
            clearCalculator();
            return;
        }
 
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateHistory();
            return;
        }
 
        inputDigit(target.innerText);
        updateDisplay();
        updateHistory()     
    });
}
