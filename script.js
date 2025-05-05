const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const historyList = document.getElementById('history-list');
let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    handleInput(value);

    document.getElementById('sqrt').addEventListener('click', () => {
        if (currentInput !== '') {
          const result = Math.sqrt(parseFloat(currentInput));
          addToHistory(`√(${currentInput}) = ${result}`);
          currentInput = result.toString();
          display.textContent = currentInput;
          resultDisplayed = true;
        }
      });
      
      document.getElementById('percent').addEventListener('click', () => {
        if (currentInput !== '') {
          const result = parseFloat(currentInput) / 100;
          addToHistory(`${currentInput}% = ${result}`);
          currentInput = result.toString();
          display.textContent = currentInput;
          resultDisplayed = true;
        }
      });
      
      document.getElementById('pow').addEventListener('click', () => {
        if (currentInput !== '') {
          const result = Math.pow(parseFloat(currentInput), 2);
          addToHistory(`(${currentInput})² = ${result}`);
          currentInput = result.toString();
          display.textContent = currentInput;
          resultDisplayed = true;
        }
      });
      
  });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if('0123456789+-*/.'.includes(key)) {
        handleInput(key);
    }else if (key === 'Enter'){
        handleInput('=');
    }else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
    }else if (key.toLowerCase() === 'c') {
        handleInput('C');
    }
});

function handleInput(value) {
    //if (currentInput.length >= 15) return;

    if (value === 'C') {
        currentInput = '';
        display.textContent = '0';
        return;
      }
    
      if (value === '=') {
        try {
          const result = eval(currentInput);
          addToHistory(`${currentInput} = ${result}`)
          currentInput = result.toString();
          display.textContent = currentInput;
          resultDisplayed = true;
        } catch {
          display.textContent = 'Error';
          currentInput = '';
        }
        return;
      }
    
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
    
      currentInput += value;
      display.textContent = currentInput;  
}

function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.prepend(li);
  }

  const themeToggleBtn = document.getElementById('toggle-theme');

themeToggleBtn.addEventListener('click', () => {
  if(document.body.classList.contains('dark')){
    themeToggleBtn.textContent = "Dark mode";
    document.body.classList.toggle('dark');
  }else{
    document.body.classList.toggle('dark');
    themeToggleBtn.textContent = "light mode";
  }
 
});

