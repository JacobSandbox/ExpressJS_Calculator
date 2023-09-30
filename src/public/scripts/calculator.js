//// calculator app

// display
// math
// input

var result = 0;
var inBuf = 0;
var input = null;
var operation = null;
const numButtons = document.querySelectorAll(".num-input");
const opButtons = document.querySelectorAll(".op-input");
const display  = document.querySelector("#display");
const bufOpDsp = document.querySelector("#buf-op");

// Helper funtions
function insertCharAt(str, char, index) {
    return str.slice(0, index) + char + str.slice(index, str.length);
}

// Input functions

function handleEqualInput() {
    // Perform stored operation on input buffers
    // and reset calculator
    switch (operation) {
        case "+":
            console.log("adding");
            result = inBuf + input;
            break;

        case "-":
            result = inBuf - input;
            break;

        case "*":
            result = inBuf * input;
            break;

        case "/":
            result = inBuf / input;
            break;

        default:
            console.log("ERROR: Invalid operation.");
            return;
    }

    inBuf = result;
    input = null;
    operation = null;
    display.textContent = result.toString();
    bufOpDsp.textContent = "-"
}

function handleOpInput() {
    let op = this.getAttribute("data-operation")
    if ( op === "c" ) {
        clearCalc();
        return;
    }

    if ( op === "=" ) {
        handleEqualInput();
        return;
    }

    if ( operation ) {
        operation = op;
        inBuf = input;
        input = null;
        handleEqualInput();
        return;
    }

    // Store input and operation then clear input
    operation = op;
    inBuf = input;
    input = null;

    let ending = (operation == null) ? " " : operation;
    bufOpDsp.textContent = inBuf + " " + ending;
}

function handleNumInput() {
    // Append number input as new digit
    let inp = Number(this.getAttribute("data-value"));
    input = (input === null) ? inp : (input * 10) + inp;

    updateDisplay();
}

function clearCalc() {
    // Clear display and input vars
    input = null;
    inBuf = 0;
    operation = null;
    updateDisplay();
}

// Display functions

function updateDisplay() {
    // Update display element to reflect data
    if ( input === null )
        display.textContent = "---";
    else {
        // Format display and update
        let inStr = input.toString();
        let str = "";
        for ( let i = 0; i < inStr.length; i++ ) {
            if ( i % 3 == 0 && i > 0 ) {
                str += ",";
            }

            str += inStr[i];
        }

        display.textContent = str;
    }
}


// buttons

for (let btn of numButtons) {
    btn.addEventListener("click", handleNumInput);
}

for (let btn of opButtons) {
    btn.addEventListener("click", handleOpInput);
}
