import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity) private readonly TodoRepository: Repository<TodoEntity>
  ) {}

  getAll(): Observable<Todo[]> {
    return from(this.TodoRepository.find());
  }

  getById(id: string): Observable<Todo> {
    return from(this.TodoRepository.findOne(id));
  }

  create(todo: CreateTodoDto): Observable<Todo> {
    return from(this.TodoRepository.save(todo));
  }

  update(id: string, todo: Todo): Observable<any> {
    return from(this.TodoRepository.update(id, todo));
  }

  delete(id: string): Observable<any> {
    return from(this.TodoRepository.delete(id));
  }
}
