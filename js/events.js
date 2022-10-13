import {
  todos,
  RENDER_EVENT,
} from "./constant.js";

import {
  generateId,
  generateTodoObject,
  saveData,
  findTodo,
  findTodoIndex,
} from "./utils.js";

export function addTodo() {
	const textTodo = document.getElementById('title').value;
	const timestamp = document.getElementById('date').value;
  const clock = document.getElementById('time').value;

	const generatedID = generateId();
	const todoObject = generateTodoObject(
		generatedID,
		textTodo,
		timestamp,
    clock,
		false
	);
	todos.push(todoObject);

	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

export function addTaskToCompleted(todoId) {
	const todoTarget = findTodo(todoId);

	if (todoTarget == null) return;

	todoTarget.isCompleted = true;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}


export function removeTaskFromCompleted(todoId) {
	const todoTarget = findTodoIndex(todoId);

	if (todoTarget === -1) return;

	todos.splice(todoTarget, 1);
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

export function undoTaskFromCompleted(todoId) {
	const todoTarget = findTodo(todoId);

	if (todoTarget == null) return;

	todoTarget.isCompleted = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}
