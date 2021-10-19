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

//todo: show everything (number, operators) after click (or keydown)

for(let i = 0; i < printable.length; i++){
    if(printable[i] === numbers){
        for(let num of numbers){
            num.addEventListener("click", function(){
                display.textContent += num.textContent;
            });
        }
    } else {
        printable[i].addEventListener("click", function(){
            display.textContent += printable[i].textContent;
        });
    }
}

decimalKey.addEventListener("click", function(){ //todo: let's check how can we insert only one decimal point
    if(display.textContent.includes(".")){
        display.textContent += "";
    } else {
        display.textContent += decimalKey.textContent;
    }
});

//todo: reset deletes everything

resetKey.addEventListener("click", function(){
    display.textContent = "";
});

//todo: del deletes the last character
delKey.addEventListener("click", function(){
    display.textContent = display.textContent.slice(0, -1); //* returns all the string except from the part starting from -1
});

//todo: equals triggers the calculation

equalsKey.addEventListener("click", function(){
    let expression = display.textContent;
    
});
