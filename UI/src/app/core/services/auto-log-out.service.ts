import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
const MINUTES_UNITL_AUTO_LOGOUT = 60; // in mins
const CHECK_INTERVAL = 2000; // in ms
const STORE_KEY = "lastAction";
declare var settings: any;
@Injectable({
  providedIn: "root",
})
export class AutoLogOutService {
  auto_logout = MINUTES_UNITL_AUTO_LOGOUT;
  isTimeout: any;
  private eventCallback = new Subject<string>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream
  public getLastAction() {
    return JSON.parse(sessionStorage.getItem("lastAction"));
  }
  public setLastAction(lastAction: number) {
    sessionStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    // if (settings.Auto_Logout !== null || settings.Auto_Logout !== undefined) {
    //   this.auto_logout = settings.Auto_Logout;
    // }
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener("click", () => this.reset());
    document.body.addEventListener("mouseover", () => this.reset());
    document.body.addEventListener("mouseout", () => this.reset());
    document.body.addEventListener("keydown", () => this.reset());
    document.body.addEventListener("keyup", () => this.reset());
    document.body.addEventListener("keypress", () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + this.auto_logout * 60000;
    const diff = timeleft - now;
    this.isTimeout = diff < 0;
    const currentRoute = this.router.url;
    if (this.isTimeout && currentRoute !== "/") {
      this.eventCallback.next(this.isTimeout);
    }
  }
}
