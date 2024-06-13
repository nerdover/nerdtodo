export class Switch {
  isOpened = false;

  toggle() {
    this.isOpened = !this.isOpened;
  }

  open() {
    this.isOpened = true;
  }

  close() {
    this.isOpened = false;
  }
}
