const loginInput = document.querySelector("#logemail");
const passwordInput = document.querySelector("#logpass");
const btnLogin = document.querySelector(".btn");
const registration = document.querySelector(".registration");

const modalWindow = document.querySelector(".modal-alert");
const modalText = document.querySelector(".text-alert");
const signOutBtn = document.querySelector(".sign-in");
const modalList = document.querySelector(".whole");

window.onload = () => {
  main = document.querySelector(".main-main");
  main.classList.toggle("blur");
  signOutBtn.classList.toggle("hidden");
  const divStorage = localStorage.getItem("whole");
  if (divStorage) {
    modalList.innerHTML = divStorage;
  }
  const localData = localStorage.getItem("login");
  if (localData === "true") {
    alertMessage("Добро пожаловать!");
    signOutBtn.classList.toggle("hidden");
  }
};

signOutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

let disableTimeout;

function alertMessage(text) {
  let forSetTimeout;
  modalWindow.classList.toggle("gonne");

  modalText.innerHTML = text;

  modalWindow.classList.toggle("active");

  registration.classList.toggle("hidden");
  main.classList.toggle("blur");

  const closeBtn = document.querySelector(".close-modal");
  closeBtn.addEventListener("click", () => {
    modalWindow.classList.toggle("active");
    clearTimeout(forSetTimeout);
    clearTimeout(disableTimeout);
    addBtn.disabled = false;
    addBtn.classList.remove("disabledBtn");
  });

  forSetTimeout = setTimeout(() => {
    modalWindow.classList.toggle("active");
  }, 4000);
}
function alertMessageEror(text) {
  modalWindow.classList.remove("gonne");
  modalWindow.classList.add("active");
  // modalWindow.classList.toggle("active");
  modalText.innerHTML = text;
  setTimeout(() => {
    modalWindow.classList.remove("active");
    modalWindow.classList.add("gonne");
  }, 4000);
}
function disableFunctionBTN() {
  addBtn.disabled = true;
  addBtn.classList.toggle("disabledBtn");
  disableTimeout = setTimeout(() => {
    addBtn.disabled = false;
    addBtn.classList.toggle("disabledBtn");
  }, 4000);
}
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  if (loginInput.value === "test" && passwordInput.value === "1234") {
    alertMessage("Добро пожаловать!");
    localStorage.setItem("login", true);
  } else {
    localStorage.setItem("login", false);
    alertMessageEror("Не верный логин или пароль!");
  }
});

const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");

let i = 0;

addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const inputValue = input.value;

  if (inputValue.trim().length === 0) {
    alertMessageEror("Поле ввода не должно быть пустым!");
    disableFunctionBTN();
    return;
  }

  // const createElement = document.createElement("div");
  const htmlCode = `
    <div class="block block${i}">
      <div class="btn-main">
        <div class="buttons">
        <button>
          <img class="doneBtn" src="check_5610944.png" alt="">
          </button>
          <button>
          <img class="cancelBtn cancel${i}" src="delete_10100000.png" alt="">
          </button>
        </div>
      </div>
      <div class="input-answer">
        <p class="dolist-text text${i}">
          ${inputValue}
        </p>
      </div>
    </div>`;
  modalList.insertAdjacentHTML("beforeend", htmlCode);
  const doneButtons = document.querySelectorAll(".doneBtn");
  const textInput = document.querySelectorAll(".dolist-text");
  const block = document.querySelectorAll(".block");
  const cancelButtons = document.querySelectorAll(".cancelBtn");

  doneButtons.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      textInput[index].classList.add("cross");
      alertMessageEror(`Что бы отменить выполнение нажмите 
      <br> на текст задачи!`)
      localStorage.setItem("whole", modalList.innerHTML);
    });
  });

  textInput.forEach((item, i) => {
    item.addEventListener("click", () => {
      textInput[i].classList.remove("cross");
      localStorage.setItem("whole", modalList.innerHTML);
    });
  });


  let forCancelTimeout;
  cancelButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      alertMessageEror("Очистка!");
      const closeBtn = document.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        modalWindow.classList.remove("active");
        clearTimeout(forCancelTimeout);
      });
      forCancelTimeout = setTimeout(() => {
        block[index].remove();
      }, 4000);
      localStorage.setItem("whole", modalList.innerHTML);
    });
  });

  input.value = "";
  localStorage.setItem("whole", modalList.innerHTML);
});
