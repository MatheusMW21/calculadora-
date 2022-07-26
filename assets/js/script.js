"use strict";

var input = document.getElementById('input'), //botão de output e input
    number = document.querySelectorAll ('.numbers div'), //botão dos números
    operator = document.querySelectorAll ('.operators div'), //botão dos operadores
    result = document.getElementById ('result'), //botão do resultado
    clear = document.getElementById ('clear'), //botão de limpar
    resultDisplayed = false; //aviso para ver em qual saída será exibida

// adicionando manipuladores de cliques a botões numéricos
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {

        //armazena a string de entrada atual e seu último caractere em variáveis ​​- usado posteriormente
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // se o resultado não for exibido, somente mantenha adicionando
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×"|| lastChar === "÷") {
        // se o resultado for exibido no momento e o usuário pressionou um operador
        // precisamos continuar adicionando a string para a próxima operação
        resultDisplayed = false; 
        input.innerHTML += e.target.innerHTML;
        } else {
        // se o resultado é exibido e o usuário aperta um número
        // precisamos limpar a string de entrada e adicionar uma nova entrada de começo para a nova operação
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += e.target.innerHTML;
        }
    });
}

// adicionando manipuladores de cliques aos botões de operadores

for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
          } else if (currentString.length == 0) {
            // se a primeira chave for pressionada como um operador, não faça nada
            console.log("coloque um número primeiro");
        } else {
            // senão adicione o operador pressionado ao input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// ao clicar no botão de igual
result.addEventListener("click", function() {

    var inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");
// agora estamos fazendo um loop através do array realizando uma operação por vez.
// primeiro divide, depois multiplica, depois subtrai e depois soma.

var divide = operators.indexOf("÷");
while (divide != -1) {
  numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
  operators.splice(divide, 1);
  divide = operators.indexOf("÷");
}

var multiply = operators.indexOf("×");
while (multiply != -1) {
  numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
  operators.splice(multiply, 1);
  multiply = operators.indexOf("×");
}

var subtract = operators.indexOf("-");
while (subtract != -1) {
  numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
  operators.splice(subtract, 1);
  subtract = operators.indexOf("-");
}

var add = operators.indexOf("+");
while (add != -1) {
  // using parseFloat is necessary, otherwise it will result in string concatenation :)
  numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
  operators.splice(add, 1);
  add = operators.indexOf("+");
}

input.innerHTML = numbers[0];

resultDisplayed = true;
});

clear.addEventListener("click", function() {
    input.innerHTML = "";
});