import {
  todos,
  RENDER_EVENT,
  STORAGE_KEY,
  SAVED_EVENT,
} from "./constant.js";

import {
  isStorageExist,
  loadDataFromStorage,
  makeTodo,
} from "./utils.js";

import {
  addTodo,
} from "./events.js";

document.addEventListener('DOMContentLoaded', function () {
	const submitForm = document.getElementById('form');
	submitForm.addEventListener('submit', function (event) {
		event.preventDefault();
		addTodo();
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

document.addEventListener(RENDER_EVENT, function () {
	const uncompletedTODOList = document.getElementById('todos');
	uncompletedTODOList.innerHTML = '';

	const completedTODOList = document.getElementById('completed-todos');
	completedTODOList.innerHTML = '';

	for (const todoItem of todos) {
		const todoElement = makeTodo(todoItem);
		if (!todoItem.isCompleted) uncompletedTODOList.append(todoElement);
		else completedTODOList.append(todoElement);
	}
});

document.addEventListener(SAVED_EVENT, function () {
	console.log(localStorage.getItem(STORAGE_KEY));
});