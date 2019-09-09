let display = document.getElementById("display");
let error = document.getElementById("error");

//Run this on startup
//Event Listeners
let numbers = document.querySelectorAll(".number")

numbers.forEach(function(number){
    number.addEventListener("click", function(e){
        if(screenFull()){
            displayError();
        } else {
            display.innerHTML += e.target.innerHTML;
            return;
        }
    })
})
numbers.forEach(function(number){
    number.addEventListener("transitionend", function(e){
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove("numbersDown");
    })
})
document.addEventListener("keydown", function(e){
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
})

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

function operate(operator, a, b){
    switch(operator){
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
    }
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