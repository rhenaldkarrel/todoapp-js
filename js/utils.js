import {
  todos,
  STORAGE_KEY,
  SAVED_EVENT,
  RENDER_EVENT
} from "./constant.js";

import {
  addTaskToCompleted,
  removeTaskFromCompleted,
  undoTaskFromCompleted,
} from "./events.js";


export function generateId() {
	return +new Date();
}

export function generateTodoObject(id, task, timestamp, clock, isCompleted) {
	return {
		id,
		task,
		timestamp,
    clock,
		isCompleted,
	};
}

export function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(todos);
		localStorage.setItem(STORAGE_KEY, parsed);
		document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

export function isStorageExist() {
	if (typeof Storage === undefined) {
		alert('Browser kamu tidak mendukung local storage');
		return false;
	}

	return true;
}

export function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);

	if (data !== null) {
		for (const todo of data) {
			todos.push(todo);
		}
	}

	document.dispatchEvent(new Event(RENDER_EVENT));
}

export function makeTodo(todoObject) {
	const textTitle = document.createElement('h2');
	textTitle.innerText = todoObject.task;

	const textTimestamp = document.createElement('p');
	textTimestamp.innerText = todoObject.clock + ' on ' + todoObject.timestamp;

	const textContainer = document.createElement('div');
	textContainer.classList.add('inner');
	textContainer.append(textTitle, textTimestamp);

	const container = document.createElement('div');
	container.classList.add('item', 'shadow');
	container.append(textContainer);
	container.setAttribute('id', `todo-${todoObject.id}`);

	if (todoObject.isCompleted) {
		const undoButton = document.createElement('button');
		undoButton.classList.add('undo-button');

		undoButton.addEventListener('click', function () {
			undoTaskFromCompleted(todoObject.id);
		});

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');

		trashButton.addEventListener('click', function () {
			removeTaskFromCompleted(todoObject.id);
		});

		container.append(undoButton, trashButton);
	} else {
		const checkButton = document.createElement('button');
		checkButton.classList.add('check-button');

		checkButton.addEventListener('click', function () {
			addTaskToCompleted(todoObject.id);
		});

		container.append(checkButton);
	}

	return container;
}

export function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

export function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }

  return -1;
}