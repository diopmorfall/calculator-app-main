const themeSetter = document.querySelector(".switch");
const selectedTheme = document.querySelector(".switch-ball");
//todo: theme related things in another script
const display = document.querySelector(".result");
const delKey = document.querySelector(".del");
const resetKey = document.querySelector(".reset");
const equalsKey = document.querySelector(".equals");
const additionKey = document.querySelector(".add");
const substractionKey = document.querySelector(".substract");
const moltiplicationKey = document.querySelector(".times");
const divisionKey = document.querySelector(".divides");
const decimalKey = document.querySelector(".dec");
const numbers = document.querySelectorAll(".num");

const printables = [additionKey, substractionKey, moltiplicationKey, divisionKey, numbers];
const operators = [additionKey, substractionKey, moltiplicationKey, divisionKey, resetKey];
let decimalPointAllowed = true;

//todo: show everything (number, operators) after click (or keydown)

for(let item of printables){
    if(item === numbers){
        for(let num of numbers){
            num.addEventListener("click", function(){
                display.textContent = display.textContent.toString() + num.textContent.toString();
            });
        }
    } else {
        item.addEventListener("click", function(){
            display.textContent = display.textContent.toString() + item.textContent.toString();
        });
    }
}

decimalKey.addEventListener("click", function(){
    if(decimalPointAllowed === true){
        display.textContent += ".";
        decimalPointAllowed = false;
    }
});

for(let operator of operators){
    operator.addEventListener("click", function(){
        decimalPointAllowed = true;
    })
}

//todo: check how can we correct the accuracy loss in decimal operations

resetKey.addEventListener("click", function(){
    display.textContent = "";
});

delKey.addEventListener("click", function(){
    let lastValue = display.textContent.slice(-1);
    display.textContent = display.textContent.slice(0, -1); //* returns all the string except from the part starting from -1
    if(lastValue === "."){
        decimalPointAllowed = true;
    }
});

equalsKey.addEventListener("click", function(){
    let expression = display.textContent;

    let operatorPos = expression.search(/\+|-|x|÷/); //? position of the operator
    let operator = expression[operatorPos];
    let firstOperand = expression.slice(0, operatorPos);
    let secondOperand = display.textContent.slice(operatorPos+1);
    
    firstOperand = compute(firstOperand, operator, secondOperand);
    showResult(firstOperand);

    if(!firstOperand.includes(".")){
        decimalPointAllowed = true;
    }
});

function showResult(result){
    display.textContent = result;
}

function fixDecimals(num1, num2){
    let maxLength;
    let firstValueDecimals = num1.split(".")[1];
    let secondValueDecimals = num2.split(".")[1];
    if(firstValueDecimals && secondValueDecimals){
        maxLength = Math.max(firstValueDecimals.length, secondValueDecimals.length);
        console.log(firstValueDecimals, secondValueDecimals, maxLength);
        
    } else if (firstValueDecimals || secondValueDecimals){
        maxLength = firstValueDecimals || secondValueDecimals;
        maxLength = maxLength.length;
        console.log(maxLength);
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
    }
    return result.toString();
}

