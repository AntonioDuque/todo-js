import "./styles.css";

import { Todo, TodoList } from "./classes"; // Por defecto buscara el archivo index.js para las importaciones
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

console.log('todos', todoList.todos )


