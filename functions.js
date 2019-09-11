//Globals
let display = document.getElementById("display");
let error = document.getElementById("error");
let firstNumber = 0;
let secondNumber = 0;
let totalCount = 0;
let operator = "";
// This will determine overwriting the display or not
let displaySwitch = true;
// This is just for first operation to display no equasion
let operationSwitch = true;

//Run this on startup
//Buttons for Events
let numbers = document.querySelectorAll(".number")
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let cancel = document.querySelector(".cancel");

//Event Listeners
document.addEventListener("keydown", function(e){
    if(e.key == "="){
        equals.classList += " equalsDown";
        operate(e);
        return;
    } else if (e.key == "c"){
        cancel.classList += " equalsDown";
        cancelScreen(e);
        return;
    } else if (e.key == "."){
        displaySwitch = false;
        let decimal = /\./;
        if(decimal.test(display.innerHTML)){
            return;
        } 
    }

    for(i=0;i<operators.length;i++){
        if(e.key == operators[i].innerHTML){
            operators[i].classList += " operatorsDown";
            firstOperation(e);
            return;
        }
    }
    for(i=0;i<numbers.length;i++){
        if(e.key == numbers[i].innerHTML){
            numbers[i].classList += " numbersDown";
            if(screenFull()){
                displayError();
            } else {
                pushNumber(numbers[i]);
            }
        } 
    }
});

numbers.forEach(function(number){
    number.addEventListener("click", function(e){
        if(screenFull()){
            displayError();
        } else {

            if (number.innerHTML == "."){
                displaySwitch = false;
                let decimal = /\./;
                if(decimal.test(display.innerHTML)){
                    return;
                }
            }
            pushNumber(e);
        }
    });
    number.addEventListener("transitionend", function(e){
        e.target.classList.remove("numbersDown");
    });
});

operators.forEach(function(operator){
    operator.addEventListener("click", firstOperation);
    operator.addEventListener("transitionend", function(e){
        e.target.classList.remove("operatorsDown");
    });
});

equals.addEventListener("click", operate);
cancel.addEventListener("click", cancelScreen);

equals.addEventListener("transitionend", function(e){
    e.target.classList.remove("equalsDown");
});
cancel.addEventListener("transitionend", function(e){
    e.target.classList.remove("equalsDown");
});


//Mathematic functions
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a == 0 || b == 0 ? displayError(): b / a;
}

function firstOperation(e){
    firstNumber = +display.innerHTML;
    operator = e.key != undefined ? e.key: e.target.innerHTML;
    operationSwitch ? null : operate(e);
    secondNumber = display.innerHTML;
    totalCount = +display.innerHTML;
    displaySwitch = true;
    operationSwitch = false;
}

function operate (e){
    if(e.key == "=" || e.target.innerHTML == "="){
        operationSwitch = true;
        secondNumber = display.innerHTML;
    }
    switch(operator){
        case "+":
            displayToScreen(add(+firstNumber, +secondNumber));
            break;
        case "-":
            displayToScreen(subtract(+firstNumber, +secondNumber).toFixed(2));
            break;
        case "x":
            displayToScreen(multiply(+firstNumber, +secondNumber));
            break;
        case "/":
            displayToScreen(divide(+firstNumber, +secondNumber));
            break;
    }
}

//Misc Functions including screen manipulation
function screenFull(){
    return display.innerHTML.length > 9 ? true : false;
}

function displayError(){
    if(error.innerHTML.length > 0){
        return;
    } else {
        error.innerHTML = "E"
        return "";
    }
}

function displayToScreen(number){
    error.innerHTML == "E" ? number = display.innerHTML : null;
    number = number.toString();
    if(number.length > 9){
        number = number.substring(0, 10);
        display.innerHTML = (number);
        displayError();
    } else {
        display.innerHTML = (number);
    }
}

function cancelScreen(e){
    error.innerHTML = "";
    firstNumber = 0;
    secondNumber = 0
    operator = "";
    display.innerHTML = "0";
    displaySwitch = true;
    operationSwitch = true;
}

function pushNumber(number){

    if(displaySwitch){
        displaySwitch = false;
        display.innerHTML = number.innerHTML != undefined ? 
            number.innerHTML : number.target.innerHTML;
    } else {
        display.innerHTML += number.innerHTML != undefined ? 
            number.innerHTML : number.target.innerHTML;
    }
        
}