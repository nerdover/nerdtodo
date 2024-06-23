import { Component, inject, input } from '@angular/core';
import { Todo } from '../../core/models/todo';
import { DatePipe, NgClass } from '@angular/common';
import { TodoService } from '../../core/services/todo.service';
import { Switch } from '../../shared/utilities/switch';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { EditService } from '../../core/services/edit.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [DatePipe, EditTodoComponent, NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  private readonly todos = inject(TodoService);
  readonly editService = inject(EditService);

  todo = input<Todo>({ title: 'Todo Title', done: false, dueDate: new Date() });

  menuPanel = new Switch();
  editPanel = new Switch();

  setToFinished() {
    if (!this.todo().id) return;
    this.todos.update(this.todo().id!, { done: true }).subscribe();
  }

  deleteTodo() {
    if (!this.todo().id) return;
    this.todos.delete(this.todo().id!).subscribe();
  }

  transferEditTodoData() {
    this.editService.currentEditTodo.set(this.todo());
    this.editService.editTodoPanel.open();
    this.menuPanel.close();
  }
}
