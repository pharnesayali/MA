import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { DatePipe } from "@angular/common";
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { User } from "src/app/shared/models/user";
import { ErrorLogRendererComponent } from '../../templates/error-log-renderer/error-log-renderer.component';
declare var $: any;
let PAGESIZE = 100;
@Component({
  selector: 'app-item-supplier-master',
  templateUrl: './item-supplier-master.component.html',
  styleUrls: ['./item-supplier-master.component.scss']
})
export class ItemSupplierMasterComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  rowGroupPanelShow: string;
  rowData: any;
  itemSupplierData: any;
  defaultColDef: any;
  itemData: any;
  isxlsx: boolean;
  filename1: string;
  selectedBuyer: any;
  isFileSelected = true;
  formData: FormData;
  uploadedDate = new Date();
  uploadForm: any;
  pageSize: number;
  paginationPageSize: number;
  buyerList: any;
  updatedDate: Date;
  importdefaultColDef:any;
  importgridApi: any;
  importgridColumnApi: any;
  itemSupplierMasterImport: any;
  fileList: any[];
  itemCodeList: any;
  sobChangeList: any;
  sobChanged: boolean;
  soblist: any;
  modalService: any;
  fileUploadedList: any;
  currentUser: User;
  disablebutton: boolean;
  importFrameworkComponents: any;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.importdefaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.itemSupplierData = [];
    this.itemCodeList = [];
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });

    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.sobChangeList = [];
    this.fileList = new Array<any>();
    this.sobChanged = false;
    this.fileUploadedList = [];
    this.disablebutton = false;
    this.importFrameworkComponents={
      errorLogRendererComponent : ErrorLogRendererComponent
    }
  }

  ngOnInit(): void {
    this.getSupplierMasterDetail();
    this.getFileUploadedDetails();
  }

 /*****   import Column Defination  ******/  
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
      filter: "agTextColumnFilter",
      headerTooltip: "File Name",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Status",
      field: "Status",
      filter: false,
      headerTooltip: "Status",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Total Records",
      field: "TotalRecord",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Successful Records",
      field: "SuccessRecord",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Failure Records",
      field: "FailedRecords",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Error Message",
      field: "ErrorMessage",
      filter: false,
      headerTooltip: "Error Log",
      width: 150,
      editable: false,
      enableRowGroup: true,
    //  cellRenderer: "errorLogRendererComponent",
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

  /**** item supplier column defination *****/
  columnDefs = [
    {
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 150,
      editable: false,
      pinned: "left",
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 150,
      editable: false,
      pinned: "left",
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Item Description",
      field: "Description",
      filter: false,
      headerTooltip: "Item Description",
      width: 150,
      editable: false,
      pinned: "left",
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "left",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'left'
          }
        }
      },
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 150,
      headerClass: 'text-center',
      editable: false,
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Supplier",
      field: "SupplierName",
      filter: false,
      headerTooltip: "Supplier",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "left",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'left'
          }
        }
      },
    },
    {
      headerName: "Location",
      field: "Location",
      filter: false,
      headerTooltip: "Location",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "left",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'left'
          }
        }
      },
    },
    {
      headerName: "Distance",
      field: "Distance",
      filter: false,
      headerTooltip: "Distance",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Pitch Time(Days)",
      field: "PitchTime",
      filter: false,
      headerTooltip: " Pitch Time",
      width: 130,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Transit Lead Time (Days)",
      field: "TransitLeadTime",
      filter: false,
      headerTooltip: "Transit Lead Time (Days)",
      width: 180,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Supplier Lead Time (Days)",
      field: "SupplierLeadTime",
      filter: false,
      headerTooltip: "Supplier Lead Time (Days)",
      width: 180,
      editable: false,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Possible Variation In Supply (Days) ",
      field: "VariationInSupply",
      filter: false,
      headerTooltip: "Possible Variation In Supply (Days)",
      width: 240,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "Internal Lead Time (PR To PO days)",
      field: "InternalLeadTime",
      filter: false,
      headerTooltip: "Internal Lead Time",
      width: 230,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(255 236 246)",
          };
        }
        else {
          return {
            textAlign: 'right'
          }
        }
      },
    },
    {
      headerName: "SOB",
      field: "SOB",
      filter: false,
      headerTooltip: "SOB",
      width: 100,
      enableRowGroup: false,
      cellEditor: "numericCellEditor",
      headerClass: 'text-center',
      valueFormatter: percentageFormatter,
      valueSetter: (params) => {
        if (+params.newValue <= 100 && +params.newValue >= 0) {
          params.data[params.colDef.field] = params.newValue;
          return true;
        }
      },
      editable(params) {
        if (params !== null &&
          params !== undefined &&
          params.data !== null &&
          params.data !== undefined &&
          params.data.count !== null &&
          params.data.count !== undefined &&
          params.data.count > 1) {
          return true;
        }
        else {
          return true;
        }
      },
      cellStyle(params) {
        if (params.data !== undefined && params.data !== undefined &&
          params.data.sobChanged !== null &&
          params.data.sobChanged !== undefined &&
          params.data.sobChanged
        ) {
          return {
            textAlign: "right",
            background: "rgb(247 255 0 / 22%) ",
          };
        }
        else {
          return {
            textAlign: 'right',
            background: "#f7ff0029",
          }
        }
      },
      pinned: "right",
    },

  ];

  /***** item supplier list  *****/
  getSupplierMasterDetail() {
    this.spinner.show();
    const data = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 100
      },
      PlantCode: "",
      BuyerID: "",
      SupplierCode: "",
      ItemCode: ""
    }
    this.adminService.getItemSpplierList(data).subscribe((res) => {
      if (res) {
        this.itemSupplierData = res.List;
        this.getFileUploadedDetails();
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
      })

  }

  /***** File upload data *****/
  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "Plant Supplier Master") {
              this.updatedDate = element.Date;
            }
          });
        }
      })
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
    this.getImportSummaryList();
  }

  /*****  get the import summary list  *****/
  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "Plant_supplier_master"
    }
    this.adminService.importSummaryList(data).subscribe((res) => {
      if (res) {
        this.itemSupplierMasterImport = res.List;
        this.spinner.hide();
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
      this.adminService.ImportSupplierMasterFile(this.fileList[0], 'Plant_supplier_master').subscribe(
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
            // this.notifier.notify(res.message.summary, 3);
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


  apply() {
    $(".item-supplier-SOB, .common-bg").show();
    document.getElementById('change-sob').style.display = 'block';
  }

  /***** Method to change the SOB ******/
  changeSob() {
    this.spinner.show();
    const data = {
      data: this.sobChangeList
    }
    this.adminService.updateSob(data).subscribe(
      (res) => {
        if (res) {
          //  this.itemData = res.List;
          this.notifier.notify("SOB updated Successfully ", 1);
          this.closeSobModal();
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
    this.sobChangeList = [];
  }

  cancel() {
    // this.spinner.show();
    //this.closeSobModal();
    this.getSupplierMasterDetail();
  }

  getData() {
    this.uploadedDate = new Date();
    $(".item-supplier, .common-bg").show();
    document.getElementById('last-updated-item-supplier-data').style.display = 'block';
  }

  closeModal() {
    $(".item-supplier, .common-bg").hide();
    document.getElementById('last-updated-item-supplier-data').style.display = 'none';
  }

  closeSobModal() {
    $(".item-supplier-SOB, .common-bg").hide();
    document.getElementById('change-sob').style.display = 'none';
  }

  /***** cell clicked event to change the SOB *****/
  onCellClicked(event) {
    this.itemCodeList = []
    if (event !== null &&
      event !== undefined &&
      event.data !== null &&
      event.data !== undefined &&
      event.data.ItemCode !== null &&
      event.data.ItemCode !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.headerName !== null &&
      event.colDef.headerName !== undefined &&
      event.colDef.headerName === "SOB"
    ) {

      this.itemSupplierData.find((x) => {
        if (x.ItemCode === event.data.ItemCode) {
          this.itemCodeList.push(x.ItemCode)
        }
      })
      var columnDefs1 = this.gridApi.getColumnDefs();
      if (this.itemCodeList.length > 0) {
        columnDefs1.forEach(function (coldef) {
          if (coldef.headerName !== null &&
            coldef.headerName !== undefined &&
            coldef.headerName === "SOB") {
            return coldef.editable = true;
          }
        })
      }
    }
  }

  onCellValueChanged(event) {
    let obj = {};
    if (event !== null && event !== undefined) {
      if (
        event.oldValue !== null &&
        event.oldValue !== undefined &&
        event.value !== null &&
        event.value !== undefined &&
        event.oldValue !== event.value) {
        this.sobChanged = true;
        event.data.sobChanged = true;
      }
      if (this.sobChangeList.length === 0) {
        if (event.data !== null &&
          event.data !== undefined &&
          event.data.Id !== null &&
          event.data.Id !== undefined &&
          event.value !== null &&
          event.value !== undefined) {
          const obj = {
            id: event.data.Id,
            SOB: event.value
          }
          this.sobChangeList.push(obj);
        }
      }
      else {
        const listIndex = this.sobChangeList.findIndex(
          (ele) =>
            ele.id === event.data.Id
        );
        if (listIndex !== null && listIndex !== undefined && listIndex !== -1) {
          this.sobChangeList.splice(listIndex, 1);
          const obj = {
            id: event.data.Id,
            SOB: event.value
          }
          this.sobChangeList.push(obj);
        }
        else {
          const obj = {
            id: event.data.Id,
            SOB: event.value
          }
          this.sobChangeList.push(obj);
        }
      }
      this.gridApi.refreshCells(event.data);
      this.gridApi.refreshView(event.data);
    }
    this.sobChanged = false;
  }
}


function dollerFormatter(params) {
  if (params.value === undefined || null) {
  } else {
    if (params.value < 0) {
      return "(" + formatNumber(params.value * -1) + ")";
    } else {
      return formatNumber(params.value);
    }
  }
}

function formatNumber(num: number) {
  if (num % 1 !== 0) {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

function percentageFormatter(params) {
  if (params.value === undefined || null) {
  } else {
    if (params.value < 0) {
      return "(" + formatPercentage(params.value * -1) + ")" + "\x25";
    } else {
      return formatPercentage(params.value) + "\x25";
    }
  }
}

function formatPercentage(per) {
  return Math.round(per).toFixed(0);
}       