'use strict';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let state = 'reading';

const scope = document.getElementById('scope');
const active = document.getElementById('active');
const successful = document.getElementById('successful');
const todosList = document.querySelector('.todos__list');

scope.innerText = 0;
active.innerText = 0;
successful.innerText = 0;

document.querySelector('.button-add').addEventListener('click', event => {
  if (state === 'reading') {
    state = 'adding new todo';
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
  if (event.target.classList.contains('button-approve')) {
    const inputField = event.target.parentElement.parentElement.parentElement.querySelector('.todos__item-input');
    const checkboxField = event.target.parentElement.parentElement.querySelector('.todos__item-checkbox');

    if (inputField.value.trim() !== '') {
      inputField.disabled = true;
      checkboxField.disabled = false;
      event.target.classList.add('far', 'fa-edit');
      event.target.classList.remove('fas', 'fa-check');      
    }
  }
});