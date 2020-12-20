import { Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { TodosService } from './todos.service'
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Observable } from 'rxjs';

// Route "/todos"
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll(): Observable<Todo[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Todo> {
    return this.todosService.getById(id);
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto): Observable<Todo> {
    return this.todosService.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto): Observable<any> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Observable<any> {
    return this.todosService.delete(id);
  }

}
