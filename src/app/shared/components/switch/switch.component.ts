import { Component, EventEmitter, Input, Output, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Input() bind = false;
  @Output() bindChange = new EventEmitter<boolean>();

  onToggle() {
    this.bindChange.emit(this.bind)
  }
}
