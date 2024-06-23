import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  input,
  model,
} from '@angular/core';
import { getYearBE as BE } from '../../utilities/date';

@Component({
  selector: 'app-month-year-selector',
  standalone: true,
  imports: [NgClass],
  templateUrl: './month-year-selector.component.html',
  styleUrl: './month-year-selector.component.scss',
})
export class MonthYearSelectorComponent implements AfterViewInit {
  minYear = input(1970);
  maxYear = input(2100);

  @ViewChild('monthCtn') monthRef!: ElementRef<HTMLUListElement>;
  @ViewChild('yearCtn') yearRef!: ElementRef<HTMLUListElement>;

  selectedYear = model(2024);
  selectedMonth = model(5);

  getYearBE = BE;

  itemSize = 40;

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

  ngAfterViewInit(): void {
    this.scrollToIndex(this.yearRef, this.selectedYear() - this.minYear());
    this.scrollToIndex(this.monthRef, this.selectedMonth());
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  scrollToIndex(ref: ElementRef<HTMLElement>, index: number) {
    const ctnHeight = ref.nativeElement.clientHeight;
    const idxHeight = index * this.itemSize;

    ref.nativeElement.scrollTo({
      top: idxHeight + this.itemSize / 2 - ctnHeight / 2,
      behavior: 'smooth',
    });
  }

  selectYear(year: number) {
    this.scrollToIndex(this.yearRef, year - this.minYear());
    this.selectedYear.set(year);
  }

  selectMonth(month: number) {
    this.scrollToIndex(this.monthRef, month);
    this.selectedMonth.set(month);
  }
}
