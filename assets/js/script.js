const display = document.querySelector(".result");
const delKey = document.querySelector(".del");
const resetKey = document.querySelector(".reset");
const equalsKey = document.querySelector(".equals");
const additionKey = document.querySelector(".add");
const substractionKey = document.querySelector(".subtract");
const moltiplicationKey = document.querySelector(".times");
const divisionKey = document.querySelector(".divides");
const decimalKey = document.querySelector(".dec");
const numbers = document.querySelectorAll(".num");
const printables = [additionKey, substractionKey, moltiplicationKey, divisionKey];
const operators = [additionKey, substractionKey, moltiplicationKey, divisionKey, resetKey];
let decimalPointAllowed = true;

//* functions

function displayValue(value){
    display.textContent = display.textContent.toString() + value;
}

function setClickEventListeners(array){
    for(let item of array){
        item.addEventListener("click", function(){
            displayValue(item.textContent.toString());
        });
    }
}

function allowDecimalPoint(){
    if(decimalPointAllowed === true){
        display.textContent += ".";
        decimalPointAllowed = false;
    }
}

function clearAll(){
    display.textContent = "";
    decimalPointAllowed = true;
}

function deleteValue(){
    let lastValue = display.textContent.slice(-1);
    display.textContent = display.textContent.slice(0, -1); //* returns all the string except from the part starting from -1
    if(lastValue === "."){
        decimalPointAllowed = true;
    }
}

function getResult(){
    let expression = display.textContent;
    let operatorPos = expression.search(/\+|-|x|÷/); //? getting the position of the operator
    let operator = expression[operatorPos];
    let firstOperand = expression.slice(0, operatorPos);
    let secondOperand = display.textContent.slice(operatorPos+1);
    
    firstOperand = compute(firstOperand, operator, secondOperand);
    showResult(firstOperand);

    if(!firstOperand.includes(".")){
        decimalPointAllowed = true;
    }
}

function showResult(result){
    display.textContent = result;
}

function fixDecimals(num1, num2){
    let maxLength;
    let firstValueDecimals = num1.split(".")[1];
    let secondValueDecimals = num2.split(".")[1];
    if(firstValueDecimals && secondValueDecimals){
        maxLength = Math.max(firstValueDecimals.length, secondValueDecimals.length);
        //console.log(firstValueDecimals, secondValueDecimals, maxLength);
        
    } else if (firstValueDecimals || secondValueDecimals){
        maxLength = firstValueDecimals || secondValueDecimals;
        maxLength = maxLength.length;
        //console.log(maxLength);
    }

    return maxLength;
}

function compute(firstValue, operation, secondValue){
    let result;
    let decimalDigits = fixDecimals(firstValue, secondValue);
    //console.log(decimalDigits);
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);

    switch(operation){
        case "+":
            result = firstValue + secondValue;
            result = result.toFixed(decimalDigits);
            break;

        case "-":
            result = firstValue - secondValue;
            result = result.toFixed(decimalDigits);
            break;

        case "x":
            result = firstValue * secondValue;
            result = result.toFixed(decimalDigits);
            break;

        case "÷":
            result = firstValue / secondValue; //? here decimal parts are not easy to handle
            break;
    }

    if(isNaN(result) || !isFinite(result)){
        result = "Error";
        setTimeout(() => display.textContent  = "", 500);
    }
    return result.toString();
}

//* event listeners setting and function calls

document.addEventListener("keydown", function(event){ //? setting the listener for other keys
    switch(event.code){
        case "NumpadAdd":
            displayValue("+");
            break;

        case "NumpadSubtract":
            displayValue("-");
            break;

        case "NumpadMultiply":
            displayValue("x");
            break;

        case "NumpadDivide":
            displayValue("÷");
            break;

        case "NumpadDecimal":
            allowDecimalPoint();
            break;

        case "Delete":
            clearAll();
            break;

        case "Backspace":
            deleteValue();
            break;

        case "Enter":
        case "NumpadEnter":
            getResult();
            break;
    }
});

for(let i = 0; i < 10; i++){ //? setting the listener for each number of the numpad keyboard
    document.addEventListener("keydown", function(event){
        if(event.code == `Numpad${i}`){
            displayValue(i);
        }
    });
}

for(let operator of operators){ //? allowing the insertion of the decimal point after this click event
    operator.addEventListener("click", function(){ 
        decimalPointAllowed = true;
    });
}

document.addEventListener("keydown", function(event){ //? allowing the insertion of the decimal point after pressing these keys
    if(event.code == "NumpadAdd" || event.code == "NumpadSubtract" || 
        event.code == "NumpadMultiply" || event.code == "NumpadDivide" ){
        decimalPointAllowed = true;
    }
});

setClickEventListeners(printables);
setClickEventListeners(numbers);

decimalKey.addEventListener("click", allowDecimalPoint);

resetKey.addEventListener("click", clearAll);

delKey.addEventListener("click", deleteValue);

equalsKey.addEventListener("click", getResult);


