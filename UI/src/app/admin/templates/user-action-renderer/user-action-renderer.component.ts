import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-user-action-renderer',
  templateUrl: './user-action-renderer.component.html',
  styleUrls: ['./user-action-renderer.component.scss']
})
export class UserActionRendererComponent implements ICellRendererAngularComp {
  user: any;
  public userId: any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  agInit(user: any): void {
    if (user !== null &&
      user !== undefined &&
      user.data !== null &&
      user.data !== undefined) {
      this.user = user.data;
    }

  }
  refresh(): boolean {
    return false;
  }
  updateUserStatus(data) {
    this.user.isActive = data ? 1 : 0;
    this.adminService.refreshUserChange(this.user);
    document.getElementById('box-delete-user').style.display = 'block';
    $('.common-bg').show();
  }

  openEditUser(data) {
    this.adminService.isUserUpdate = true;
    this.adminService.refreshUserChange(this.user);
    document.getElementById('create-user-right').style.right = '0px';
    return data;
  }
}
