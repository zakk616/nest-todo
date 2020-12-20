import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity])
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
