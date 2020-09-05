import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'My first NestJS App',
      description: 'Create Todo App',
      done: true,
    },
    {
      id: 2,
      title: 'Migrate BonAlim\' to NestJS',
      description: 'I prefer JS than PHP',
      done: false,
    },
  ];

  getAll(): Todo[] {
    return this.todos;
  }

  getById(id: string) {
    return this.todos.find(todo => todo.id === +id);
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  update(id: string, todo: Todo) {
    // Retrieve the todo to update
    const todoToUpdate = this.todos.find(todo => todo.id === +id);
    if(!todoToUpdate) {
      return new NotFoundException('Didn\'t find this todo.');
    }

    // Get data
    if(todo.title) {
      todoToUpdate.title = todo.title;
    }

    if(todo.description) {
      todoToUpdate.description = todo.description;
    }

    if(todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done;
    }

    // Apply modifications
    const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate)
    this.todos = [...updatedTodos];
    return { updatedTodo: 1, todo: todoToUpdate};
  }

  delete(id: string) {
    const nbOfTodosBeforeDelete = this.todos.length;
    this.todos.filter(t => t.id !== +id);
    if(this.todos.length < nbOfTodosBeforeDelete) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    } else {
      return { deletedTodos: 0, nbTodos: this.todos.length};
    }
  }
}
