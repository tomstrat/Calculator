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

document.addEventListener("keydown", function(e){
    if(e.key == "="){
        equals.classList += " equalsDown";
        secondNumber = parseInt(display.innerHTML)
        switch(operator){
            case "+":
                display.innerHTML = add(firstNumber, secondNumber);
            case "-":
                display.innerHTML = subtract(firstNumber, secondNumber);
            case "x":
                display.innerHTML = multiply(firstNumber, secondNumber);
            case "/":
                display.innerHTML = divide(firstNumber, secondNumber);
        }
    }
    for(i=0;i<operators.length;i++){
        if(e.key == operators[i].innerHTML){
            operators[i].classList += " operatorsDown";
            firstNumber = parseInt(display.innerHTML);
            operator = e.target.innerHTML;
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

equals.addEventListener("click", function (e){
    secondNumber = parseInt(display.innerHTML)
    switch(operator){
        case "+":
            display.innerHTML = add(firstNumber, secondNumber);
        case "-":
            display.innerHTML = subtract(firstNumber, secondNumber);
        case "x":
            display.innerHTML = multiply(firstNumber, secondNumber);
        case "/":
            display.innerHTML = divide(firstNumber, secondNumber);
    }
});
equals.addEventListener("transitionend", function(e){
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