import { Directive, ElementRef, Input, HostListener } from "@angular/core";


@Directive({
  selector: "[appNegativeNumberDirective]",
})
export class NegativeNumberDirective {
  constructor(private el: ElementRef) {}
  @Input()
  appNegativeNumberDirective: boolean;
  @HostListener("keydown", ["$event"])
  onKeyDown(event) {
    const e = <KeyboardEvent>event;
    if (this.appNegativeNumberDirective) {
      if (
        [46, 8, 9, 27, 13, 109, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39) ||
        (e.keyCode === 189 && e.shiftKey === false) ||
        (e.keyCode === 173 && e.shiftKey === false)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    }
  }
}
