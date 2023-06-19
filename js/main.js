let toggle = document.getElementById("toggle");
let darkmode = localStorage.getItem("darkmode");
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");
let keys = document.querySelectorAll(".key");
let display_input = document.querySelector(
  ".calculator__display--content__input"
);
let display_output = document.querySelector(
  ".calculator__display--content__output"
);

const inputModifier = (input) => {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = '<span class="operator">x</span>';
    } else if (input_array[i] == "/") {
      input_array[i] = '<span class="operator">÷</span>';
    } else if (input_array[i] == "+") {
      input_array[i] = '<span class="operator">+</span>';
    } else if (input_array[i] == "-") {
      input_array[i] = '<span class="operator">-</span>';
    } else if (input_array[i] == "(") {
      input_array[i] = '<span class="brackets">(</span>';
    } else if (input_array[i] == ")") {
      input_array[i] = '<span class="brackets">)</span>';
    }
  }
  return input_array.join("");
};

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = inputModifier(input);
    } else if (value == "=") {
      let result = eval(input);

      display_output.innerHTML = result;
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }

      display_input.innerHTML = inputModifier(input);
    } else {
      input += value;
      display_input.innerHTML = inputModifier(input);
    }
  });
}

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "enabled");
};
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "enabled") {
  enableDarkMode();
  toggle.classList.add("active");
  darkIcon.classList.add("active");
  lightIcon.classList.remove("active");
} else {
  lightIcon.classList.add("active");
}

toggle.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "enabled") {
    enableDarkMode();
    toggle.classList.add("active");
    darkIcon.classList.add("active");
    lightIcon.classList.remove("active");
    console.log(darkmode);
  } else {
    disableDarkMode();
    toggle.classList.remove("active");
    darkIcon.classList.remove("active");
    lightIcon.classList.add("active");
    console.log(darkmode);
  }
});
