class Calculator{
    constructor(previous, current){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement  = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    append(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        debugger
        if(this.currentOperand === '') return;
        if(!this.previousOperand){
            this.compete();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    competeSpecialOperator(operation){
        let computation = '';
        const current = parseFloat(this.currentOperand);
        if(this.currentOperand === '') return;
        
        switch(operation){
            case '+/-':
            computation = current * -1;
            break;
            case '1/x':
            computation = 1 / current; 
            break;
            case 'x2':
            computation =  current * current;
            break;
            case '':
            computation = Math.sqrt(current);
            break;
        }
        this.currentOperandTextElement.innerText = this.getDisplayNumber(computation);
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    compete(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev)||isNaN(current)) return;
        switch(this.operation){
            case '+': 
            computation = prev + current;
            break;
            case '-': 
            computation = prev - current;
            break;
            case 'x':
            computation = prev * current;
            break;
            case '/':
            computation = prev / current;
            break;
         
            default: return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText = '';
        }
       
    }

}


const btn = document.querySelector("#togBtn");
const theme = document.querySelector("#theme-link");
const numberBtns = document.querySelectorAll(".btn-number");
const oprationBtns = document.querySelectorAll(".btn-operator");
const specialOperator = document.querySelectorAll(".btn-round");
const equalBtn = document.querySelector(".btn-equal");
const delAllBtn = document.getElementById("clear");
const delBtn = document.querySelector(".btn-backspace");
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);
// Lắng nghe sự kiện click vào button
btn.onchange = function () {
  // Nếu URL đang là "ligh-theme.css"
  if (theme.getAttribute("href") == "light-theme.css") {
    // thì chuyển nó sang "dark-theme.css"
    theme.href = "dark-theme.css";
  } else {
    // và ngược lại
    theme.href = "light-theme.css";
  }
};

numberBtns.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.append(button.innerText);
        calculator.updateDisplay();
    })
})


specialOperator.forEach(button=>{
    button.addEventListener("click", ()=>{
        debugger
        calculator.competeSpecialOperator(button.innerText);
        
    })
})

oprationBtns.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalBtn.addEventListener("click", ()=>{
        calculator.compete();
        calculator.updateDisplay();
})

delAllBtn.addEventListener("click", ()=>{
    calculator.clear();
    calculator.updateDisplay();
})


delBtn.addEventListener("click", ()=>{
    calculator.delete();
    calculator.updateDisplay();
})