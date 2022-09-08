import { makeAutoObservable } from "mobx";
import { TodoItem } from "./types";

class Todo {
  todos: Array<TodoItem> = [];

  constructor() {
    makeAutoObservable(this)
  }

  addTodo(todo: TodoItem) {
    this.todos.push(todo);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  completeTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
  }

  filterTodo(type: string) {
    switch (type) {
      case "all": {
        return this.todos;
      }
      case "completed": {
        return this.todos.filter((todo) => todo.completed === true);
      }
      case "incomplete": {
        return this.todos.filter((todo) => todo.completed === false);
      }
      default: {
        return this.todos;
      }
    }
  }
}

export default new Todo();