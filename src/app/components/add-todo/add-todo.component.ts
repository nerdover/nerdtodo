import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import {
  getOneMoreHourFromNow,
  getDateString,
  getTimeString,
  joinDateAndTime,
} from '../../shared/utilities/date';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { removeUndefinedProperties } from '../../shared/utilities/object';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CalendarComponent, SwitchComponent],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent implements AfterViewInit {
  readonly todos = inject(TodoService);

  close = output();

  titleRef = viewChild<ElementRef<HTMLElement>>('titleRef');

  title = '';
  description = '';

  now = signal(getOneMoreHourFromNow());
  date = computed(() => getDateString(this.now()));
  time = computed(() => getTimeString(this.now()));

  titlePlaceholder = 'สิ่งที่ต้องทำ';
  descriptionPlaceholder = 'เพิ่มคำอธิบาย';
  dueDateLabel = 'วันที่';
  dueTimeLabel = 'เวลา';

  isDueDateRequired = true;
  isTimeRequired = false;

  ngAfterViewInit(): void {
    this.titleRef()?.nativeElement.focus();
  }

  addTodo() {
    if (!this.validateTodo()) return;
    this.todos.add(this.buildTodo()).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.now.set(getOneMoreHourFromNow());
        this.isDueDateRequired = true;
        this.isTimeRequired = false;
        this.close.emit();
      },
    });
  }

  validateTodo() {
    if (!(this.title && this.title.length)) return false;
    if (!this.date) return false;
    return true;
  }

  cancel = () => this.close.emit();

  buildTodo = () =>
    removeUndefinedProperties({
      title: this.title,
      description: this.description,
      dueDate: this.isDueDateRequired
        ? new Date(
            joinDateAndTime(
              this.date(),
              this.isTimeRequired ? this.time() : '00:00'
            )
          )
        : undefined,
    });

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
