import { Injectable, inject, signal } from '@angular/core';
import { DatabaseService } from './database.service';
import { CreateTodoDto, Todo, UpdateTodoDto } from '../models/todo';
import { from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = inject(DatabaseService).db.todos;

  todoList = signal<Todo[] | undefined>(undefined);

  loadTodoList = () => this.getAll().subscribe((tds) => this.todoList.set(tds));

  getAll = () => from(this.todos.toArray());

  get = (key: number) => from(this.todos.get(key));

  add = (createTodo: CreateTodoDto) =>
    from(this.todos.add({ ...createTodo, done: false })).pipe(
      tap(() => {
        this.loadTodoList();
      })
    );

  update = (idx: number, updateTodo: UpdateTodoDto) =>
    from(this.todos.update(idx, updateTodo)).pipe(
      tap(() => {
        this.loadTodoList();
      })
    );

  delete = (idx: number) =>
    from(this.todos.delete(idx)).pipe(
      tap(() => {
        this.loadTodoList();
      })
    );
}
