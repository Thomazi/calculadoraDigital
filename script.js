const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOperationText, currentOperationText){
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
    }

    // adicionar digito na tela da calculadora
    addDigit(digit){
    //checar se a operação tem ponto

    if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
    }

    this.currentOperation = digit;
    this.updateScreen();
    }

    //processar os valores da operação

    processOperation(operation){
        //checando se o valor de baixo esta vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            // mude operação
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        

        // receber antes e depois os valores
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
                    
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperation();
                 break;

            case "C":
                this.processClearAllOperation();
                 break;
            case "=":
                this.processEqualOperator();
                break;                              
            default:
                return; 
        }
    }
  
    //escolher os valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ){
     console.log(operationValue, operation, current, previous);
     if(operationValue === null){
        this.currentOperationText.innerText += this.currentOperation; 
     }else{
        //checando se o valor é zero
        if(previous === 0){
            operationValue = current
        }

        //jogue o valor de baixo para cima
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
     }           
    }
    // escolhe a operação matematica
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //deletar ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //limpar os digitos de baixo
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }
    //limpar tudo
    processClearAllOperation(){
        this.currentOperationText.innerText ="";
        this.previousOperationText.innerText ="";
    }
    //resultado
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }


}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
    });
});
