let taskInput = document.getElementById('new-task');
let addButton = document.querySelector('.task-section__button');
let incompleteTaskHolder = document.querySelector('.task-list--incompleted');
let completedTasksHolder = document.querySelector('.task-list--completed');

const createNewTaskElement = function (taskString) {
  let listItem = document.createElement('li')
  let checkBox = document.createElement('input');
  let label = document.createElement('label');
  let editInput = document.createElement('input');
  let editButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let deleteButtonImg = document.createElement('img');

  listItem.classList.add('task-item');
  label.innerText = taskString;
  label.className = 'task-item__label';

  checkBox.type = 'checkbox';
  checkBox.classList.add('task-item__checkbox')
  editInput.type = 'text';
  editInput.classList.add('task-item__input-text');

  editButton.innerText = 'Edit';
  editButton.classList.add('task-item__button', 'task-item__button--edit');

  deleteButton.classList.add('task-item__button', 'task-item__button--delete');
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

/**
 * Create a new list item with the text from the #new-task:
 */
const addTask = function () {
  if (!taskInput.value) return;

  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

/**
 * Edit an existing task.
 */
const editTask = function () {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector('.task-item__input-text');
  let label = listItem.querySelector('label');
  let editBtn = listItem.querySelector('.task-item__button--edit');
  let containsClass = listItem.classList.contains('task-item--editing');
  //If class of the parent is .task-item--editing
  if (containsClass) {
    //switch to .task-item--editing
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task-item--editing');
};

/**
 * Delete task.
 */
const deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

/**
 * Mark task completed
 */
const taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

/**
 * Mark task incompleted
 */
const taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

/**
 * Binds event handlers to a task list item.
 *
 * This function connects the task item's checkbox, edit button, and delete button
 * to their respective event handlers so that user interactions are properly handled.
 *
 * @param {HTMLElement} taskListItem
 * @param {Function} checkBoxEventHandler - The function to call when the checkbox changes state
 *                                          (e.g., marking the task as complete or incomplete).
 */
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector('.task-item__checkbox');
  let editButton = taskListItem.querySelector('.task-item__button--edit');
  let deleteButton = taskListItem.querySelector('.task-item__button--delete');
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

[...incompleteTaskHolder.children].forEach(task => bindTaskEvents(task, taskCompleted));
[...completedTasksHolder.children].forEach(task => bindTaskEvents(task, taskIncomplete));

// TODO: prevent creation of empty tasks.
// TODO: Change edit to save when you are in edit mode.