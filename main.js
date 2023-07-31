const form = document.querySelector('.main')
const input = document.querySelector('.input');
const taskList = document.querySelector('.whole')

const block = document.querySelector('.registration')
const password = document.querySelector('#logpass');
const login = document.querySelector('#logemail');
const main = document.querySelector('.main-main');

const btnOut = document.querySelector('.sign-in');
const modal = document.querySelector('.modal-alert');
const modalText = document.querySelector('.text-alert');
const closeModalPrevent = document.querySelector('.close-modal');


let tasks = [];
window.onload = () => {
  let forTimeout;
  if (localStorage.getItem('login') === 'true') {
    block.classList.add('hidden');
    main.classList.remove('blur')
    createNotify('Добро пожаловать!')
  }
}
if (localStorage.getItem('login') === true) {
  if (login.value === 'test' && password.value === '1234') {
    block.classList.add('hidden');
    main.classList.remove('blur')
    localStorage.setItem('login', true);

  }
}
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    renderTask(task)
  });
}

btnOut.addEventListener('click', signout)

form.addEventListener('submit', addTask);

taskList.addEventListener('click', doneTask);

taskList.addEventListener('click', deleteTask)
function addTask(event) {

  event.preventDefault();

  const inputValue = input.value;
  if (inputValue.trim().length === 0) {
    return createNotify('Поле ввода не должно быть пустым!')

  }
  const info = {
    id: Date.now(),
    text: inputValue,
    done: false
    ,
  }
  tasks.push(info)
  saveToLS()
  renderTask(info)
  input.value = '';
  input.focus()
}

function doneTask(event) {
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.block');

  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  task.done = !task.done

  const taskTitle = parentNode.querySelector('.dolist-text');

  taskTitle.classList.toggle('dolist-text--cross');

  saveToLS()
}

function deleteTask(event) {
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.block');
  const id = Number(parentNode.id);
  parentNode.remove()
  const index = tasks.findIndex((task) => (task.id === id));
  tasks.splice(index, 1);

  saveToLS()

}

function saveToLS() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
  const cssStyle = task.done ? 'dolist-text--cross' : 'dolist-text';
  const taskHTML = `
  <div class="block" id="${task.id}">
  <div class="btn-main">
    <div class="buttons">
    <button>
      <img class="doneBtn" data-action="done" src="check_5610944.png" alt="">
      </button>
      <button>
      <img class="cancelBtn" data-action="delete" src="delete_10100000.png" alt="">
      </button>
    </div>
  </div>
  <div class="input-answer">
    <p class="dolist-text ${cssStyle}" >
    ${task.text}
    </p>
  </div>
</div>
`
  taskList.insertAdjacentHTML('beforeend', taskHTML);
}


document.querySelector('.btn').addEventListener('click', loginE);

function loginE(e) {
  e.preventDefault()
  if (login.value === 'test' && password.value === '1234') {
    block.classList.add('hidden');
    main.classList.remove('blur')
    localStorage.setItem('login', true);
    createNotify('Добро пожаловать!')
  }
}

function signout() {
  localStorage.clear()
  location.reload()
};

function createNotify(text) {

  modal.classList.toggle('gonne');
  modal.classList.toggle('active')
  modalText.innerHTML = text

  forTimeout = setTimeout(() => {
    modal.classList.toggle('gonne');
    modal.classList.toggle('active')
  }, 4000)

  closeModalPrevent.addEventListener('click', closeModalPermanent);
}

function closeModalPermanent() {
  modal.classList.toggle('gonne');
  modal.classList.toggle('active')
  clearTimeout(forTimeout);

}