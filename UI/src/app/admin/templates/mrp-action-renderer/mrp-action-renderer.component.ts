import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-mrp-action-renderer',
  templateUrl: './mrp-action-renderer.component.html',
  styleUrls: ['./mrp-action-renderer.component.scss']
})
export class MrpActionRendererComponent implements ICellRendererAngularComp {
  param:any;
  id:any;
  constructor(
    private adminService : AdminService,
    private router :Router
  ) { }

  ngOnInit(): void {
  }

  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.param = params;
    this.id = params.data.sr_No;
   // 
  }

  openDocument(){
    this.router.navigate(["/admin/ViewDoc"],
    {
      queryParams: {
      
      },
    });
  }

  deleteDocument(){
    this.adminService.deletedoc(this.param);
  }
}
