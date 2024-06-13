import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import {
  getOneMoreHourFromNow,
  getDateString,
  getTimeString,
  joinDateAndTime,
} from '../../shared/utilities/date';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  readonly todos = inject(TodoService);

  title = '';
  description = '';

  now = getOneMoreHourFromNow();
  date = getDateString(this.now);
  time = getTimeString(this.now);

  isTimeRequired = false;

  addTodo() {
    if (!this.validateTodo()) return;
    this.todos
      .add({
        title: this.title,
        description: this.description,
        dueDate: new Date(
          joinDateAndTime(this.date, this.isTimeRequired ? this.time : '00:00')
        ),
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.description = '';
          this.now = getOneMoreHourFromNow();
          this.date = getDateString(this.now);
          this.time = getTimeString(this.now);
          this.isTimeRequired = false;
        },
      });
  }

  validateTodo() {
    if (!(this.title && this.title.length)) return false;
    if (!this.date) return false;
    return true;
  }
}
