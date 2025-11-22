let display = document.getElementById("display");

function appendToDisplay(value) {
  if (display.innerText === "0" && value !== ".") {
    display.innerText = value;
  } else if (display.innerText === "0" && value === ".") {
    display.innerText = "0.";
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function factorial(numb) {
  if (isNaN(numb)) throw new Error("Invalid factorial");
  let result = 1;
  for (let i = 2; i <= numb; i++) result *= i;
  return result;
}

function handleParentheses(eval_str) {
  let openCount = 0;
  let closeCount = 0;

  for (let char of eval_str) {
    if (char === "(") openCount++;
    if (char === ")") closeCount++;
  }
  while (openCount > closeCount) {
    eval_str += ")";
    closeCount++;
  }
  return eval_str;
}

function inputValidation(eval_str) {
  try {
    eval_str = eval_str.replace(/π/g, "(3.142)");
    eval_str = eval_str.replace(/÷/g, "/");
    eval_str = eval_str.replace(/([\d.]+)\(/g, "$1*(");
    eval_str = eval_str.replace(/\)(?=[\d.])/g, ")*");
    eval_str = eval_str.replace(/√/g, "Math.sqrt");
    eval_str = eval_str.replace(/log/g, "Math.log10(");
    eval_str = eval_str.replace(/mod/g, "%");
    eval_str = eval_str.replace(/(\d+)!/g, "factorial($1)");
    eval_str = eval_str.replace(/([\d.]+)Math/g, "$1*Math");
    eval_str = handleParentheses(eval_str);
  } catch {
    display.innerText = "Error";
  }
  return eval_str;
}

function calculate() {
  let eval_str = inputValidation(display.innerText);
  try {
    let result = eval(eval_str);
    if (!isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    result = Number(result.toPrecision(4));
    display.innerText = result;
  } catch (error) {
    display.innerText = "Error";
    setTimeout(clearDisplay, 1500);
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (
    (key >= "0" && key <= "9") ||
    key === "." ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/"
  ) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Escape" || key === "Delete" || key === "c") {
    clearDisplay();
  } else if (key === "(" || key === ")") {
    appendToDisplay(key);
  } else if (key === "Backspace") {
    event.preventDefault();
    backspace();
  }
});
