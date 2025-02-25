import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderMaturityRendererComponent } from '../../templates/order-maturity-renderer/order-maturity-renderer.component';
import { ErrorLogRendererComponent } from '../../templates/error-log-renderer/error-log-renderer.component';
declare var $: any;
@Component({
  selector: 'app-order-maturity-tracking',
  templateUrl: './order-maturity-tracking.component.html',
  styleUrls: ['./order-maturity-tracking.component.scss']
})
export class OrderMaturityTrackingComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  importOrderMaturity: any;
  isxlsx: boolean;
  isFileSelected = true;
  updatedDate = new Date();
  uploadedDate = new Date();
  fileList: any[];
  formData: FormData;
  uploadForm: any;
  fileUploadedList: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  orderMaturityData: any;
  rowGroupPanelShow: string;
  orderMaturityImport: any;
  filename1: string;
  orderMaturityList: any;
  importdefaultColDef: any;
  updateOrderMaturityDate: Date;
  updatedOrderMaturityStatus: any;
  orderUpdateMaturityList: any;
  importFrameworkComponents: any;
  frameworkComponents = {
    orderMaturityTrackingRenderer: OrderMaturityRendererComponent
  };
  columnDefs = [
    {
      headerName: "Plant Code",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 120,
      editable: false,
      //  pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 150,
      editable: false,
      //  pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },

    {
      headerName: "Supplier Name",
      field: "SupplierName",
      //  filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 150,
      editable: false,
      //   pinned: "left",
      headerClass: 'text-center',
    },
    {
      headerName: "Invoice Number",
      field: "InvoiceNumber",
      filter: "agTextColumnFilter",
      headerTooltip: "Invoice Number",
      width: 150,
      editable: false,
      //  pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Purchase Order No.",
      field: "PurchaseOrderNo",
      filter: "agTextColumnFilter",
      headerTooltip: "Purchase Order No",
      width: 140,
      editable: false,
      //  pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Order Date",
      field: "OrderDate",
      filter: "agTextColumnFilter",
      headerTooltip: "Order Date",
      width: 150,
      editable: false,
      cellStyle: {
        textAlign: 'center'
      },
      //   pinned: "left",
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
      headerClass: 'text-center',

    },
    {
      headerName: "ETD Confirmation",
      field: "ETDConfirmation",
      filter: "agTextColumnFilter",
      headerTooltip: "ETD Confirmation",
      width: 150,
      editable: false,
      //   pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'center'
      },
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
    },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 130,
      editable: false,
      //   pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Item Description",
      field: "Description",
      filter: false,
      headerTooltip: "Item Code",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      // resizable:true
    },
    {
      headerName: "Order Qty",
      field: "OrderQty",
      filter: false,
      headerTooltip: "Order Qty",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
      // resizable:true
    },
    {
      headerName: "Order Maturity Date",
      field: "OrderMaturityDate",
      filter: false,
      headerTooltip: "Order Maturity Date",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      cellRenderer: "orderMaturityTrackingRenderer",
      cellStyle: {
        textAlign: 'right'
      },
      // valueFormatter: (params) => {
      //   if (params.value !== undefined) {
      //     const date = new Date(params.value);
      //     const datepipe: DatePipe = new DatePipe("en-US");
      //     return datepipe.transform(date, "dd/MM/yyyy");
      //   }
      // },

      // resizable:true
    },
    {
      headerName: "Order Status",
      field: "OrderStatus",
      filter: false,
      headerTooltip: "Order Status",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      cellRenderer: "orderMaturityTrackingRenderer"
      // resizable:true
    },

  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
    headerClass: 'grid-cell-centered',

    // flex: 1,
  };
  importgridApi: any;
  importgridColumnApi: any;
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
  ) {
    this.fileUploadedList = [];
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.orderMaturityData = [];
    this.rowGroupPanelShow = "always";
    this.orderMaturityList = [];
    this.orderMaturityImport = [];
    this.orderUpdateMaturityList = [];
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    this.fileList = new Array<any>();
    this.importdefaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.adminService.changedOrderMaturityStatus$.subscribe((value) => {
      if (value !== null &&
        value !== undefined &&
        value.data !== null &&
        value.data !== undefined
      ) {
        this.updatedOrderMaturityStatus = value.data;
        this.onOrderMaturityUpdate(value);
        this.adminService.getchangedMaturityStatus(null);
      }
    });

    this.adminService.changedOrderMaturityDate$.subscribe((value) => {
      if (value !== null &&
        value !== undefined &&
        value.data !== null &&
        value.data !== undefined
      ) {
        this.updateOrderMaturityDate = value.data;
        this.onOrderMaturityUpdate(value);
        this.adminService.getChangedOrderMaturityDate(null);
      }
    });

    this.importFrameworkComponents = {
      errorLogRendererComponent: ErrorLogRendererComponent
    }
  }

  importColumnDef = [
    {
      headerName: "Upload Date",
      field: "Date",
      filter: false,
      headerTooltip: "Upload Date ",
      width: 145,
      editable: false,
      enableRowGroup: true,
      cellStyle: {
        textAlign: 'center'
      },
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
    },
    {
      headerName: "File Name ",
      field: "FileName",
      filter: false,
      headerTooltip: "File Name",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
    },
    {
      headerName: "Status",
      field: "Status",
      filter: false,
      headerClass: 'text-center',
      headerTooltip: "Status",
      width: 100,
      editable: false,
      enableRowGroup: true,
    },
    {
      headerName: "Total Records",
      field: "TotalRecord",
      headerClass: 'text-center',
      filter: false,
      width: 100,
      cellStyle: {
        textAlign: 'center'
      }
    },
    {
      headerName: "Successful Records",
      field: "SuccessRecord",
      headerClass: 'text-center',
      filter: false,
      width: 100,
      cellStyle: {
        textAlign: 'center'
      }
    },
    {
      headerName: "Failure Records",
      field: "FailedRecords",
      filter: false,
      headerClass: 'text-center',
      width: 100,
      cellStyle: {
        textAlign: 'center'
      }
    },
    {
      headerName: "Error Message",
      field: "ErrorMessage",
      filter: false,
      headerTooltip: "Error Log",
      headerClass: 'text-center',
      width: 120,
      editable: false,
      enableRowGroup: true,
    //  cellRenderer: "errorLogRendererComponent",
      cellStyle: {
        textAlign: 'center'
      },
    },

  ]
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onImportGridReady(params) {
    this.importgridApi = params.api;
    this.importgridColumnApi = params.columnApi;
    this.importgridApi.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.getFileUploadedDetails();
    this.getOrderMaturityList();
  }

  getOrderMaturityList() {
    this.spinner.show();
    let data = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 10
      },
      PlantCode: "",
      SupplierCode: "",
      ItemCode: "",
      Invoice: ""
    };

    this.adminService.getOrderMaturityData(data).subscribe(
      (res) => {
        if (res) {
          this.orderMaturityData = res.List;
          this.spinner.hide();
        }
      }
    )


    // this.http.get<any>("http://localhost:3000/orderMaturity").subscribe(
    //   (res) => {
    //     if (res) {
    //       this.orderMaturityData = res;
    //       this.spinner.hide();
    //     }
    //   }
    // )
  }

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
        }
      })
  }


  onOrderMaturityUpdate(data) {
    let obj = {};
    if (data !== null &&
      data !== undefined &&
      data.data !== null &&
      data.data !== undefined) {
      if (this.orderUpdateMaturityList.length === 0) {

        const obj = {
          OrderMaturityDate: data.data.OrderMaturityDate,
          OrderStatus: data.data.OrderStatus,
          Id: data.data.Id
        };
        this.orderUpdateMaturityList.push(obj);
      }
      else {
        const listIndex = this.orderUpdateMaturityList.findIndex(
          (ele) =>
            ele.Id === data.data.Id
        );

        if (listIndex !== null &&
          listIndex !== undefined &&
          listIndex !== -1) {
          this.orderUpdateMaturityList.splice(listIndex, 1);
          const obj = {
            OrderMaturityDate: data.data.OrderMaturityDate,
            OrderStatus: data.data.OrderStatus,
            Id: data.data.Id
          };
          this.orderUpdateMaturityList.push(obj);
        }
        else {
          const obj = {
            OrderMaturityDate: data.data.OrderMaturityDate,
            OrderStatus: data.data.OrderStatus,
            Id: data.data.Id
          };
          this.orderUpdateMaturityList.push(obj);
        }
      }
    }
  }

  apply() {
    if (this.orderUpdateMaturityList !== null &&
      this.orderUpdateMaturityList !== undefined) {
      this.adminService.updateOrderMaturity(this.orderUpdateMaturityList).subscribe(
        (res) => {
          if (res) {
            this.notifier.notify("Order Maturity  updated Successfully ", 1);
            this.orderUpdateMaturityList = [];
            this.getOrderMaturityList();
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }

      );
    }
  }

  cancel() {
    this.getOrderMaturityList();
  }
  getData() {
    this.uploadedDate = new Date();
    $(".invoice, .common-bg").show();
    document.getElementById('last-updated-order-maturity-data').style.display = 'block';
  }
  closeModal() {
    $(".invoice, .common-bg").hide();
    document.getElementById('last-updated-order-maturity-data').style.display = 'none';
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
    this.getImportSummaryList();
  }

  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "OrderDetails"
    }

    this.adminService.importSummaryList(data).subscribe((res) => {
      if (res) {
        if (res.Response) {
          //     this.notifier.notify("No Data Available ", 1);
          this.orderMaturityImport = [];
          this.spinner.hide();
        }
        else {
          this.orderMaturityImport = res.List;
          this.spinner.hide();
        }
      } else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      });
  }
  hideImport() {
    this.isFileSelected = true;
    this.filename1 = null;
    $(".box-import, .common-bg").hide();
  }

  fileChange(event) {
    this.isFileSelected = true;
    this.formData = new FormData();
    const fileList: FileList = event.target.files;
    // this.fileList=event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileList[0] = file;
      this.uploadForm.get("myfile").setValue(file);
      const filename = file.name;
      if (filename.includes(".xlsx")) {
        this.isxlsx = true;
      } else {
        this.isxlsx = false;
      }
      this.filename1 = filename;
      this.formData.append("file", file, file.name);
      this.uploadForm.reset();
      this.myFIle.nativeElement.value = null;
    }
  }

  UploadFile() {
    if (this.formData !== null && this.formData !== undefined) {
      this.spinner.show();
      this.adminService.ImportFile(this.fileList[0], 'OrderDetails').subscribe(
        (res) => {
          if (res) {
            this.isxlsx = false;
            this.formData = null;
            this.filename1 = null;
            this.notifier.notify(res.Message, 1);
            this.getImportSummaryList();
          } else {
            this.isxlsx = false;
            this.filename1 = null;
            this.spinner.hide();
            this.notifier.notify(res.Message, 3);
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );
    } else {
      this.isFileSelected = false;
    }
  }
}
