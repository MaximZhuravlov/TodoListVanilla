'use strict';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let state = 'reading';
let addingNewTodo = false;
let editingTodo = false;

const scope = document.getElementById('scope');
const active = document.getElementById('active');
const successful = document.getElementById('successful');
const todosList = document.querySelector('.todos__list');

scope.innerText = 0;
active.innerText = 0;
successful.innerText = 0;

// Retrieve data from the local storage
if (localStorage.getItem('todos')) {
  const todosFromStorage = JSON.parse(localStorage.getItem('todos'));

  scope.innerText = todosFromStorage.length;

  todosFromStorage.forEach(todo => addTodo(todo.name, todo.date, todo.isCompleted));
}

/**
 * Adds new todo item to the DOM.
 * @param {string} name name of the todo.
 * @param {string} date date of the todo.
 * @param {boolean} isCompleted status of the todo.
 */
function addTodo(name, date, isCompleted) {
  const todosItem = document.createElement('div');
  todosItem.classList.add('todos__item');
  if (isCompleted) {
    todosItem.classList.add('todos__item--completed');
  } else {
    todosItem.classList.add('todos__item--active');
  }

  const todosItemActions = document.createElement('div');
  todosItemActions.classList.add('todos__item-actions');

  // Adding container for checkbox and date
  const dateCheckboxContainer = document.createElement('div');
  dateCheckboxContainer.classList.add('todos__item-left');
  todosItemActions.appendChild(dateCheckboxContainer);

  // Adding checkbox
  const inputCheckbox = document.createElement('input');
  inputCheckbox.classList.add('todos__item-checkbox');
  inputCheckbox.type = 'checkbox';
  inputCheckbox.checked = isCompleted;
  inputCheckbox.disabled = false;
  dateCheckboxContainer.appendChild(inputCheckbox);

  // Adding date
  const day = document.createElement('span');
  day.classList.add('todos__item-date');
  day.innerText = date;
  dateCheckboxContainer.appendChild(day);

  // Adding container for buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('todos__item-right');
  todosItemActions.appendChild(buttonsContainer);

  // Add and remove button
  const editButton = document.createElement('i');
  editButton.classList.add('fas', 'fa-edit', 'button', 'button-edit');
  const removeButton = document.createElement('i');
  removeButton.classList.add('far', 'fa-trash-alt', 'button', 'button-remove');
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(removeButton);

  // Adding input
  const todosItemInput = document.createElement('input');
  todosItemInput.classList.add('todos__item-input');
  todosItemInput.type = 'text';
  todosItemInput.value = name;
  todosItemInput.placeholder = 'Please enter task description';
  todosItemInput.autocomplete = "off";
  todosItemInput.disabled = true;

  todosItem.appendChild(todosItemActions);
  todosItem.appendChild(todosItemInput);
  todosList.appendChild(todosItem);
}

/**
 * Saves todo to the local storage.
 * @param {string} name name of the todo.
 * @param {string} date date of the todo.
 * @param {boolean} isCompleted status of the todo.
 */
function saveToLocalStorage(name, date, isCompleted) {
  const todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];
  
  todos.push({ name, date, isCompleted });

  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Removes todo from the local storage.
 * @param {string} name name of the todo.
 * @param {string} date date of the todo.
 * @param {boolean} isCompleted status of the todo.
 */
function removeFromLocalStorage(name, date, isCompleted) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const index = todos.findIndex(todo =>
    todo.name === name && todo.date === date && todo.isCompleted === isCompleted);
  todos.splice(index, 1);

  if (todos.length !== 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    localStorage.clear();
  }
}

function editInLocalStorage() {}

document.querySelector('.button-add').addEventListener('click', event => {
  if (state === 'reading') {
    state = 'adding new todo';
    addingNewTodo = true;
    const todosItem = document.createElement('div');
    todosItem.classList.add('todos__item', 'todos__item--active');
  
    const todosItemActions = document.createElement('div');
    todosItemActions.classList.add('todos__item-actions');

    // Adding container for checkbox and date
    const dateCheckboxContainer = document.createElement('div');
    dateCheckboxContainer.classList.add('todos__item-left');
    todosItemActions.appendChild(dateCheckboxContainer);

    // Adding checkbox
    const inputCheckbox = document.createElement('input');
    inputCheckbox.classList.add('todos__item-checkbox');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.disabled = true;
    dateCheckboxContainer.appendChild(inputCheckbox);

    // Adding date
    const now = new Date();
    const date = document.createElement('span');
    date.classList.add('todos__item-date');
    date.innerText = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    dateCheckboxContainer.appendChild(date);

    // Adding container for buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('todos__item-right');
    todosItemActions.appendChild(buttonsContainer);

    // Add and remove button
    const addButton = document.createElement('i');
    addButton.classList.add('fas', 'fa-check', 'button', 'button-approve');
    const removeButton = document.createElement('i');
    removeButton.classList.add('far', 'fa-trash-alt', 'button', 'button-remove');
    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(removeButton);
  
    // Adding input
    const todosItemInput = document.createElement('input');
    todosItemInput.classList.add('todos__item-input');
    todosItemInput.type = 'text';
    todosItemInput.id = 'new-todo';
    todosItemInput.placeholder = 'Please enter task description';
    todosItemInput.autocomplete = "off";
  
    todosItem.appendChild(todosItemActions);
    todosItem.appendChild(todosItemInput);
    todosList.appendChild(todosItem);

    document.getElementById('new-todo').focus();
  }

  if (state === 'adding new todo') {
    document.getElementById('new-todo').focus();
  }
});

todosList.addEventListener('click', event => {
  // Approving button
  if (event.target.classList.contains('button-approve')) {
    const inputField = event.target.parentElement.parentElement.parentElement.querySelector('.todos__item-input');
    const checkboxField = event.target.parentElement.parentElement.querySelector('.todos__item-checkbox');

    if (state === 'adding new todo') {
      if (inputField.value.trim() !== '') {
        // Disable input
        inputField.disabled = true;
  
        // Enable checkbox
        checkboxField.disabled = false;
  
        // input is no more new todo
        inputField.id = '';
  
        // Update stats
        scope.innerText++;
        active.innerText++;
  
        // Change approve button to edit
        event.target.classList.remove('fas', 'fa-check', 'button-approve');
        event.target.classList.add('far', 'fa-edit', 'button-edit');

        saveToLocalStorage(
          inputField.value,
          event.target.parentElement.parentElement.parentElement.querySelector('.todos__item-date').innerText,
          false
        );

        addingNewTodo = false;
      }
    }

    if (state === 'editing') {
      if (inputField.value.trim() !== '') {
        event.target.classList.remove('fas', 'fa-check', 'button-approve');
        event.target.classList.add('far', 'fa-edit', 'button-edit');

        // Disable input
        inputField.disabled = true;

        // Enable checkbox
        checkboxField.disabled = false;

        editingTodo = false;
      }
    }
  }

  // Removing button
  if (event.target.classList.contains('button-remove')) {
    if (!addingNewTodo && !editingTodo) {
      const todosItem = event.target.closest('.todos__item');
      const checked = todosItem.querySelector('.todos__item-checkbox').checked;
  
      todosItem.remove();
      scope.innerText--;
      if (checked) {
        successful.innerText--;
      } else {
        active.innerText--;
      }

      removeFromLocalStorage(
        todosItem.querySelector('.todos__item-input').value,
        todosItem.querySelector('.todos__item-date').innerText,
        checked
      );
    }
  }

  // Editing button
  if (event.target.classList.contains('button-edit')) {
    if (!addingNewTodo && !editingTodo) {
      if (state === 'adding new todo' || state === 'editing') {
        state = 'reading';
        return;
      }

      editingTodo = true;

      const todosItem = event.target.closest('.todos__item');
      todosItem.querySelector('.todos__item-checkbox').disabled = true;
      todosItem.querySelector('.todos__item-input').disabled = false;
      todosItem.querySelector('.todos__item-input').focus();
  
      // Change edit button to approve
      event.target.classList.remove('far', 'fa-edit', 'button-edit');
      event.target.classList.add('fas', 'fa-check', 'button-approve');
  
      state = 'editing';
    }
  }

  // Checkbox
  if (event.target.classList.contains('todos__item-checkbox')) {
    const todosItem = event.target.closest('.todos__item');

    if (event.target.checked) {
      todosItem.classList.remove('todos__item--active');
      todosItem.classList.add('todos__item--completed');

      active.innerText--;
      successful.innerText++;
    } else {
      todosItem.classList.remove('todos__item--completed');
      todosItem.classList.add('todos__item--active');

      active.innerText++;
      successful.innerText--;
    }
  }
});