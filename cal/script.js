let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let answer = "";
let prevAnswer = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.innerText;

    if (value === "AC") {
      answer = "";
      display.innerText = "0";
    } else if (value === "del") {
      answer = answer.slice(0, -1);
      display.innerText = answer || "0";
    } else if (value === "=") {
      try {
        prevAnswer = answer;
        answer = eval(answer.replace("√", "Math.sqrt"));
        display.innerText = answer;
      } catch {
        display.innerText = "Error";
      }
    } else if (value === "ans") {
      answer += prevAnswer;
      display.innerText = answer;
    } else if (value === "√") {
      answer += "√(";
      display.innerText = answer;
    } else {
      answer += value;
      display.innerText = answer;
    }
  });
});
