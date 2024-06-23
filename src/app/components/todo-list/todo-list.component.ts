import { Component, inject, input } from '@angular/core';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../../core/models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Switch } from '../../shared/utilities/switch';
import { EditService } from '../../core/services/edit.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, AddTodoComponent, EditTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoList = input<Todo[]>([]);

  readonly editService = inject(EditService);

  addTodoPanel = new Switch();

  clearEditData() {
    this.editService.currentEditTodo.set(undefined);
    this.editService.editTodoPanel.close();
  }
}
