const form = document.querySelector('.main')
const input = document.querySelector('.input');
const taskList = document.querySelector('.whole')

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    renderTask(task)
  });
}

form.addEventListener('submit', addTask);

taskList.addEventListener('click', doneTask);

taskList.addEventListener('click', deleteTask)
function addTask(event) {

  event.preventDefault();

  const inputValue = input.value;

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
  taskTitle.classList.toggle('dolist-text--cross')

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
    <p class="${cssStyle}" >
    ${task.text}
    </p>
  </div>
</div>
`
  taskList.insertAdjacentHTML('beforeend', taskHTML);
}
