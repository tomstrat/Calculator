//Globals
let display = document.getElementById("display");
let error = document.getElementById("error");
let firstNumber = 0;
let secondNumber = 0;
let operator = "";

//Run this on startup
//Event Listeners
let numbers = document.querySelectorAll(".number")
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let cancel = document.querySelector(".cancel");

document.addEventListener("keydown", function(e){
    if(e.key == "="){
        equals.classList += " equalsDown";
        operate(e);
    } else if (e.key == "c"){
        cancel.classList += " equalsDown";
        error.innerHTML = "";
        firstNumber = 0;
        secondNumber = 0
        operator = "";
        display.innerHTML = "";
        return;
    }

    for(i=0;i<operators.length;i++){
        if(e.key == operators[i].innerHTML){
            operators[i].classList += " operatorsDown";
            firstNumber = parseInt(display.innerHTML);
            operator = e.key;
            display.innerHTML = "";
            return;
        }
    }
    for(i=0;i<numbers.length;i++){
        if(e.key == numbers[i].innerHTML){
            numbers[i].classList += " numbersDown";
            if(screenFull()){
                displayError();
            } else {
                display.innerHTML += numbers[i].innerHTML;
                return;
            }
        } 
    }
});

numbers.forEach(function(number){
    number.addEventListener("click", function(e){
        if(screenFull()){
            displayError();
        } else {
            display.innerHTML += e.target.innerHTML;
            return;
        }
    });
    number.addEventListener("transitionend", function(e){
        e.target.classList.remove("numbersDown");
    });
});

operators.forEach(function(operator){
    operator.addEventListener("click", function (e){
        firstNumber = parseInt(display.innerHTML);
        operator = e.target.innerHTML;
        display.innerHTML = "";
    });
    operator.addEventListener("transitionend", function(e){
        e.target.classList.remove("operatorsDown");
    });
});

equals.addEventListener("click", operate);

equals.addEventListener("transitionend", function(e){
    e.target.classList.remove("equalsDown");
});

cancel.addEventListener("click", cancelScreen);

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

function cancelScreen(e){
    error.innerHTML = "";
    firstNumber = 0;
    secondNumber = 0
    operator = "";
    display.innerHTML = "";
}