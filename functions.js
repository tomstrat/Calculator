//Globals
let display = document.getElementById("display");
let error = document.getElementById("error");
let firstNumber = 0;
let secondNumber = 0;
let operator = "";

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
    return a / b;
}

function firstOperation(e){
    firstNumber = parseInt(display.innerHTML);
    operator = e.key != undefined ? e.key: e.target.innerHTML;
    display.innerHTML = "";
}

function operate (e){
    secondNumber = parseInt(display.innerHTML)
    switch(operator){
        case "+":
            display.innerHTML = add(firstNumber, secondNumber);
            break;
        case "-":
            display.innerHTML = subtract(firstNumber, secondNumber);
            break;
        case "x":
            display.innerHTML = multiply(firstNumber, secondNumber);
            break;
        case "/":
            display.innerHTML = divide(firstNumber, secondNumber);
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
    }
}

function cancelScreen(e){
    error.innerHTML = "";
    firstNumber = 0;
    secondNumber = 0
    operator = "";
    display.innerHTML = "0";
}

function pushNumber(number){

    if(display.innerHTML == "0"){
        display.innerHTML = number.innerHTML != undefined ? 
            number.innerHTML : number.target.innerHTML;
    } else {
        display.innerHTML += number.innerHTML != undefined ? 
            number.innerHTML : number.target.innerHTML;
    }
        
}