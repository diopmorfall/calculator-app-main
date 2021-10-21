const themeSetter = document.querySelector(".switch");
const selectedTheme = document.querySelector(".switch-ball");

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

const printable = [additionKey, substractionKey, moltiplicationKey, divisionKey, decimalKey, numbers];
const operators = [additionKey, substractionKey, moltiplicationKey, divisionKey];

//todo: show everything (number, operators) after click (or keydown)

for(let item of printable){
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

/*decimalKey.addEventListener("click", function(){ //todo: let's check how can we insert only one decimal point
    if(display.textContent.includes(".")){
        return;
    }
});*/

//todo: check how can we correct the accuracy loss in decimal operations

resetKey.addEventListener("click", function(){
    display.textContent = "";
});

delKey.addEventListener("click", function(){
    display.textContent = display.textContent.slice(0, -1); //* returns all the string except from the part starting from -1
});

equalsKey.addEventListener("click", function(){
    let expression = display.textContent;

    let operatorPos = expression.search(/\+|-|x|÷/); //? position of the operator
    let operator = expression[operatorPos];
    let firstOperand = expression.slice(0, operatorPos);
    let secondOperand = display.textContent.slice(operatorPos+1);
    
    firstOperand = showResult(compute(firstOperand, operator, secondOperand));
});

function showResult(result){
    display.textContent = result;
}

function compute(firstValue, operation, secondValue){
    let result;
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);
    switch(operation){
        case "+":
            result = firstValue + secondValue;
            break;

        case "-":
            result = firstValue - secondValue;
            break;

        case "x":
            result = firstValue * secondValue;
            break;

        case "÷":
            result = firstValue / secondValue;
            break;
    }

    if(result === NaN || result === Infinity){
        result = "Error";
    }
    return result.toString();
}

