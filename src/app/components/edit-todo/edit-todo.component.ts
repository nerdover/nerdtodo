import { Component, inject, input, model, output } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import {
  getDateString,
  getOneMoreHourFromNow,
  getTimeString,
  joinDateAndTime,
} from '../../shared/utilities/date';
import { FormsModule } from '@angular/forms';
import { removeUndefinedProperties } from '../../shared/utilities/object';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent {
  readonly todos = inject(TodoService);

  id = input<number | undefined>(undefined);
  title = model<string>('');
  description = model<string | undefined>('');

  now = getOneMoreHourFromNow();
  date = getDateString(this.now);
  time = getTimeString(this.now);

  isUsePreviousTime = true;
  isTimeRequired = false;

  close = output();

  updateTodo() {
    if (!this.id()) return;
    this.todos.update(this.id()!, this.buildDto()).subscribe();
  }

  buildDto = () =>
    removeUndefinedProperties({
      title: this.title(),
      description: this.description(),
      dueDate: this.buildDueDate(),
    });

  buildDueDate = () =>
    this.isUsePreviousTime
      ? undefined
      : new Date(
          joinDateAndTime(this.date, this.isTimeRequired ? this.time : '00:00')
        );

  cancel() {
    this.close.emit();
  }
}
