import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: [],
})
export class LoginLayoutComponent implements OnInit {
  constructor() {
    // const wshshell = new ActiveXObject("wscript.shell");
  }

  ngOnInit() {
    $(".full-height").height($(window).height());
  }
}
