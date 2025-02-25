import { OnInit, Component } from '@angular/core';
import { User } from '../../models/user';
declare var $: any;
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: []
})
export class MainLayoutComponent implements OnInit {
  currentUser: User;
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
  }

  ngOnInit() {
    $('.btn-sidebar').click(function () {
      $(this).hide();
      $(
        '.btn-close-sidebar-panel, .menu-name, .submenu-arrow-icon, .sidebar-title, .sidebar-header-links .home-link'
      ).show();
      $('.main-container').addClass('main-left-275');
    });
    $('.btn-close-sidebar-panel').click(function () {
      $(this).hide();
      $('.btn-sidebar').show();
      $(
        '.menu-name, .submenu-arrow-icon, .sidebar-left-panel .sidebar-title, .sidebar-header-links .home-link'
      ).hide();
      $('.main-container').removeClass('main-left-275');
    });

    $('[data-toggle="tooltip"]').tooltip()
  }

  openNav() {
    'use strict';
    document.getElementById('sidebar-left').style.width = '275px';
  }

  closeNav() {
    'use strict';
    document.getElementById('sidebar-left').style.width = '60px';
  }

}
