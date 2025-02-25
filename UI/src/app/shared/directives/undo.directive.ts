import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appUndoDirective]",
})
export class UndoDirective {
  @Input()
  appUndoDirective: boolean;
  @HostListener("keydown", ["$event"]) onKeyDown(event) {
    const e = <KeyboardEvent>event;
    if (this.appUndoDirective && e.ctrlKey) {
      if (e.keyCode === 90 && e.ctrlKey) {
        e.preventDefault();
      } else if (e.keyCode === 86 && e.ctrlKey) {
        e.preventDefault();
      }
    }
  }
  constructor() {}
}
