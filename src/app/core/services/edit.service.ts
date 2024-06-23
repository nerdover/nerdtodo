import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo';
import { Switch } from '../../shared/utilities/switch';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  currentEditTodo  = signal<Todo | undefined>(undefined);
  editTodoPanel = new Switch();
}
