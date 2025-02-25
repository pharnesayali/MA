import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-maturity-renderer',
  templateUrl: './order-maturity-renderer.component.html',
  styleUrls: ['./order-maturity-renderer.component.scss']
})
export class OrderMaturityRendererComponent implements ICellRendererAngularComp {
  params: any;
  selectedOrderStatus: any;
  orderStatus: boolean;
  orderdate: boolean;
  selectedOrderMaturityDate: Date;
  orderStatusList = [
    {
      id: 1,
      name: "Closed"
    },
    {
      id: 2,
      name: "In Transit"
    },
    {
      id: 3,
      name: "Open Order"
    },

  ];


  constructor(
    private adminService: AdminService,
    private datepipe: DatePipe,
  ) {
    this.orderStatus = false;
    this.orderdate = false;
  }

  ngOnInit(): void {
  }

  agInit(param: any): void {
    this.params = param;
    if (param !== null &&
      param !== undefined &&
      param.column !== null &&
      param.column !== undefined &&
      param.column.colId !== null &&
      param.column.colId !== undefined &&
      param.column.colId === "OrderMaturityDate") {
      this.orderStatus = false;
      this.orderdate = true;
      if (param.data !== null &&
        param.data !== undefined &&
        param.data.OrderMaturityDate !== null &&
        param.data.OrderMaturityDate !== undefined
      ) {
        console.log(param.data)
        this.selectedOrderMaturityDate = new Date(param.data.OrderMaturityDate)
      }
    } else if (param !== null &&
      param !== undefined &&
      param.column !== null &&
      param.column !== undefined &&
      param.column.colId !== null &&
      param.column.colId !== undefined &&
      param.column.colId === "OrderStatus"
    ) {
      this.orderStatus = true;
      this.orderdate = false;
      if (param.data !== null &&
        param.data !== undefined &&
        param.data.OrderStatus !== null &&
        param.data.OrderStatus !== undefined
      ) {
        this.selectedOrderStatus = param.data.OrderStatus
      }
    }

  }

  refresh(): boolean {
    return false;
  }

  OnMonthChange() {
    if (this.params != null && this.params !== undefined) {
      this.params.data.OrderMaturityDate = this.datepipe.transform(this.selectedOrderMaturityDate , 'YYYY-MM-dd')
      this.adminService.getChangedOrderMaturityDate(this.params);
    }
   }

  onOrderStatusChange() {
    if (this.params != null && this.params !== undefined) {
      this.params.data.OrderStatus = this.selectedOrderStatus;
      this.adminService.getchangedMaturityStatus(this.params);
    }

  }
}
