import {
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import {
  getDateString,
  getOneMoreHourFromNow,
  getTimeString,
  joinDateAndTime,
} from '../../shared/utilities/date';
import { FormsModule } from '@angular/forms';
import { removeUndefinedProperties } from '../../shared/utilities/object';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule, SwitchComponent, CalendarComponent],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent {
  readonly todos = inject(TodoService);

  id = input<number | undefined>(undefined);
  title = model<string>('');
  description = model<string | undefined>('');

  now = model(getOneMoreHourFromNow());
  date = computed(() => getDateString(this.now()));
  time = computed(() => getTimeString(this.now()));

  titlePlaceholder = 'สิ่งที่ต้องทำ';
  descriptionPlaceholder = 'เพิ่มคำอธิบาย';
  dueDateLabel = 'วันที่';
  usePreviousTimeLabel = 'ใช้กำหนดการเดิม';
  dueTimeLabel = 'เวลา';

  isDueDateRequired = true;
  isUsePreviousTime = true;
  isTimeRequired = false;

  close = output();

  updateTodo() {
    if (!this.id()) return;
    this.todos
      .update(this.id()!, this.buildDto())
      .subscribe(() => this.close.emit());
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
          joinDateAndTime(
            this.date(),
            this.isTimeRequired ? this.time() : '00:00'
          )
        );

  cancel() {
    this.close.emit();
  }

  setNow(date: Date) {
    this.now.set(new Date(date));
  }

  setTime(time: string) {
    const [h, m] = time.split(':').map((str) => Number(str));
    if (isNaN(h) || isNaN(m)) {
      return;
    }
    let currentDate = this.now();
    currentDate.setHours(h, m);
    this.now.set(new Date(currentDate));
  }
}
