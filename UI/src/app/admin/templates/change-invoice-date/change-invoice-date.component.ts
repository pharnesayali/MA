import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-change-invoice-date',
  templateUrl: './change-invoice-date.component.html',
  styleUrls: ['./change-invoice-date.component.scss']
})
export class ChangeInvoiceDateComponent implements ICellRendererAngularComp {
  selectedInovoiceDate: any;
  invoiceChange: boolean = false;
  selectedExpAtFactory: any;
  expAtFactory: boolean = false;
  selectedExpDelivery: any;
  expDelivery: boolean = false;
  selectedExpAtPort: any;
  expAtPort: boolean = false;
  param: any;
  constructor(
    private adminService: AdminService
  ) { }

  // ngOnInit(): void {
  // }
  agInit(params: any): void {
    this.param = params;
    if (params !== null &&
      params !== undefined &&
      params.colDef !== null &&
      params.colDef !== undefined &&
      params.colDef.field !== undefined &&
      params.colDef.field !== null &&
      params.colDef.field === "inovice_Date"
    ) {
       this.invoiceChange = true;
      this.expAtFactory = false;
      this.expDelivery = false;
      this.expAtPort = false;
      this.selectedInovoiceDate = params.data.inovice_Date;
    }
    if (params !== null &&
      params !== undefined &&
      params.colDef !== null &&
      params.colDef !== undefined &&
      params.colDef.field !== undefined &&
      params.colDef.field !== null &&
      params.colDef.field === "exp_atFactory"
    ) {
      this.invoiceChange = false;
      this.expAtFactory = true;
      this.expDelivery = false;
      this.expAtPort = false;
      this.selectedExpAtFactory = params.data.exp_atFactory;
    }
    if (params !== null &&
      params !== undefined &&
      params.colDef !== null &&
      params.colDef !== undefined &&
      params.colDef.field !== undefined &&
      params.colDef.field !== null &&
      params.colDef.field === "exp_deliveryDate") {
      this.invoiceChange = false;
      this.expAtFactory = false;
      this.expDelivery = true;
      this.expAtPort = false;
      this.selectedExpDelivery = params.data.exp_deliveryDate;
    }
    else if (params !== null &&
      params !== undefined &&
      params.colDef !== null &&
      params.colDef !== undefined &&
      params.colDef.field !== undefined &&
      params.colDef.field !== null &&
      params.colDef.field === "exp_atPort") {
      this.invoiceChange = false;
      this.expAtFactory = false;
      this.expDelivery = true;
      this.expAtPort = false;
      this.selectedExpDelivery = params.data.exp_atPort;
    }
  }

  refresh(): boolean {
    return false;
  }
  onDateChange(event, type) {
    if (event !== null && event !== undefined) {
      if (this.invoiceChange !== null &&
        this.invoiceChange !== undefined &&
        type !== null &&
        type !== undefined &&
        type === "inovice_Date") {
        this.selectedInovoiceDate = event;
      }
      else if (this.expAtFactory !== null &&
        this.expAtFactory !== undefined &&
        this.param.colDef.field === "exp_atPort") {
        this.selectedExpAtPort = event;
      }
      else if (this.expAtFactory !== null &&
        this.expAtFactory !== undefined &&
        this.param.colDef.field === "exp_deliveryDate") {
        this.selectedExpDelivery = event;
      }
      else if (this.expAtFactory !== null &&
        this.expAtFactory !== undefined &&
        this.param.colDef.field === "exp_atFactory") {
        this.selectedExpAtFactory = event;
      }
    }
    this.adminService.getchangedDates(this.param)

  }

  onchange(event) {
  }
}
