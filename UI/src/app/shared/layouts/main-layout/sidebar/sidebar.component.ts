import { OnInit, Component } from "@angular/core";
import { User } from "src/app/shared/models/user";
declare var $: any;
declare var settings: any;
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: [],
})
export class SidebarComponent implements OnInit {
  currentUser: User;
  public isMenuCollapsed = false;
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
  }

  ngOnInit() {
    $(".custom-dropdown > a").click(function () {
      $(".drop-submenu").slideUp(200);
      if ($(this).parent().hasClass("active")) {
        $(".custom-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
      } 
      else {
        $(".custom-dropdown").removeClass("active");
        $(this).next(".drop-submenu").slideDown(200);
        $(this).parent().addClass("active");
      }
    });

    // $(".drop-submenu > li > a").click(function () {
    //   const element = document.getElementById("sidebar-left");
    //   element.classList.add("w-275");
    //   element.classList.remove("w-275");
    //   $(".btn-sidebar").show();
    //   $(".btn-close-sidebar-panel").hide();
    //   $(
    //     ".menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link"
    //   ).hide();
    //   $(".main-container").removeClass("main-left-275");
    // });
    // $(".drop-submenu > li > a").click(function () {
    //   const element = document.getElementById("sidebar-left");
    //   element.classList.add("w-275");
    //   element.classList.remove("w-275");
    //   $(".btn-sidebar").show();
    //   $(".btn-close-sidebar-panel").hide();
    //   $(
    //     ".menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link"
    //   ).hide();
    //   $(".main-container").removeClass("main-left-275");
    // });

    // $(".s-dropdown>  a").click(function () {
    //   const element = document.getElementById("sidebar-left");
    //   element.classList.add("w-60");
    //   element.classList.remove("w-275");
    //   $(".btn-sidebar").show();
    //   $(".drop-submenu").hide();
    //   $(".custom-dropdown").removeClass("active");
    //   $(".btn-close-sidebar-panel").hide();
    //   $(
    //     ".menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link"
    //   ).hide();
    //   $(".main-container").removeClass("main-left-275");
    // });
  }
}
