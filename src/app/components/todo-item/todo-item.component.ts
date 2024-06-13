import { Component, inject, input } from '@angular/core';
import { Todo } from '../../core/models/todo';
import { DatePipe } from '@angular/common';
import { TodoService } from '../../core/services/todo.service';
import { Switch } from '../../shared/utilities/switch';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [DatePipe, EditTodoComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  private readonly todos = inject(TodoService);

  todo = input<Todo>({ title: 'Todo Title', done: false, dueDate: new Date() });

  editPanel = new Switch();

  setToFinished() {
    if (!this.todo().id) return;
    this.todos.update(this.todo().id!, { done: true }).subscribe();
  }

  deleteTodo() {
    if (!this.todo().id) return;
    this.todos.delete(this.todo().id!).subscribe();
  }
}
