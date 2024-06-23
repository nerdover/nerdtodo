import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, input, model, signal } from '@angular/core';
import { getYearBE as BE } from '../../utilities/date';
import { MonthYearSelectorComponent } from '../month-year-selector/month-year-selector.component';
import { Switch } from '../../utilities/switch';

type CalendarPaneItem = { date: number; isCurrentMonth: boolean };

@Component({
  selector: 'Calendar',
  standalone: true,
  imports: [NgClass, DatePipe, MonthYearSelectorComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  weekdays = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  months = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  getYearBE = BE;

  minYear = 1970;
  maxYear = 2100;

  selecting = model<Date>(new Date());

  mnthyrPanel = new Switch();

  selectedDate = computed(() => this.selecting().getDate());
  selectedMonth = computed(() => this.selecting().getMonth());
  selectedYear = computed(() => this.selecting().getFullYear());
  selectedBEYear = computed(() => this.getYearBE(this.selectedYear()));

  calendarPane = computed(() =>
    this.getCalendarPane(
      new Date(this.selectedYear(), this.selectedMonth(), this.selectedDate())
    )
  );

  changeSelecting(date: number) {
    let prevSelecting = this.selecting();
    this.selecting.set(
      new Date(prevSelecting.getFullYear(), prevSelecting.getMonth(), date)
    );
  }

  changeMonth(month: number) {
    let prevSelecting = this.selecting();
    this.selecting.set(new Date(prevSelecting.getFullYear(), month, 1));
  }

  changeYear(year: number) {
    let prevSelecting = this.selecting();
    this.selecting.set(new Date(year, prevSelecting.getMonth(), 1));
  }

  getCalendarPane(date: Date): CalendarPaneItem[] {
    let calendarPane: CalendarPaneItem[][] = [];

    const prevMonthDayCount = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const dayStart = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayCount = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    let nextMonthDate = 0;
    let currentDate = 0;
    let weekCount = 0;

    while (currentDate < dayCount) {
      let week: CalendarPaneItem[] = [];
      weekCount++;
      for (let day = 0; day < 7; day++) {
        if (weekCount === 1) {
          day >= dayStart
            ? week.push({ date: ++currentDate, isCurrentMonth: true })
            : week.push({
                date: prevMonthDayCount - dayStart + day + 1,
                isCurrentMonth: false,
              });
        } else {
          currentDate++;
          currentDate <= dayCount
            ? week.push({ date: currentDate, isCurrentMonth: true })
            : week.push({ date: ++nextMonthDate, isCurrentMonth: false });
        }
      }
      calendarPane.push(week);
    }

    return calendarPane.flat();
  }

  incrementMonth() {
    let currentMonth = this.selecting();
    currentMonth.setMonth(currentMonth.getMonth() + 1, 1);
    this.selecting.set(new Date(currentMonth));
  }

  decrementMonth() {
    let currentMonth = this.selecting();
    currentMonth.setMonth(currentMonth.getMonth() - 1, 1);
    this.selecting.set(new Date(currentMonth));
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  scrollToYearIndex(index: number) {}
}
