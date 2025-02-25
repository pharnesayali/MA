import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { User } from "src/app/shared/models/user";
import { ErrorLogRendererComponent } from '../../templates/error-log-renderer/error-log-renderer.component';
declare var $: any;
let PAGESIZE = 100;
@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  fileList: any[];
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  MRPName: any;
  frameworkComponents: any;
  Month: any;
  revision: any;
  plantName: any;
  rowGroupPanelShow: string;
  rowData: any;
  Status: any;
  selectedStatus: any
  zoneCode: any;
  zoneCodes: any;
  formData: FormData;
  uploadForm: any;
  filename1: string;
  changedtCodes = [];
  changedDescription = [];
  isxlsx: boolean;
  isFileSelected = true;
  mrpName: any;
  defaultColDef: any;
  importdefaultColDef: any;
  itemData: any;
  pageSize: number;
  paginationPageSize: number;
  itemMasterImport: any;
  uploadedDate = new Date();
  deletedList: any;
  fileUploadedList: any;
  currentUser: User;
  columnDefs = [
    {
      headerName: "Yazaki Part No.",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "YazakiPrt No.",
      width: 130,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
      pinned: "left"
    },
    {
      headerName: "Yazaki T codes",
      field: "TPartNumber",
      filter: false,
      headerTooltip: "Yazaki T codes",
      width: 120,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Description",
      field: "Description",
      filter: false,
      headerTooltip: "Description",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Parent Part No.",
      field: "ParentPart",
      filter: "agTextColumnFilter",
      headerTooltip: "Parent Part No.",
      width: 140,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    // {
    //   headerName: "Action",
    //   field: "action",
    //   width: 100,
    //   cellRenderer: function (params) {
    //     if (
    //       params !== null &&
    //       params !== undefined &&
    //       params.data !== undefined &&
    //       params.data !== null &&
    //       params.data.ParentPart !== null &&
    //       params.data.ParentPart !== undefined &&
    //       params.data.ParentPart !== ""
    //     ) {
    //       return '<span class="padding-left-20"> <img src="assets/images/grid-delete-icon.svg" /></span>';
    //     }
    //   },
    //   editable: false,
    //   filter: false,
    //   colId: "action",
    // },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 140,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Supplier Name",
      field: "SupplierName",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Old Supplier Code",
      field: "OldSupplierCode",
      filter: false,
      headerTooltip: "Old Supplier Code",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Old Supplier Name",
      field: "OldSupplierName",
      filter: false,
      headerTooltip: "Old Supplier Name",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Source ",
      field: "Source",
      filter: "agTextColumnFilter",
      headerTooltip: "Source (Local /Import/Local Billing)",
      width: 100,
      editable: true,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Source Change Date",
      field: "SourceChangedate",
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
        if (params.value !== undefined &&
          params.value !== null &&
          params.value !== ""
        ) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
    },
    {
      headerName: "Maker Name",
      field: "Maker",
      filter: false,
      headerTooltip: "Maker Name",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Maker Part Number",
      field: "MakerPartNumber",
      filter: false,
      headerTooltip: "Maker Part Number",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Commodity",
      field: "Commodity",
      filter: "agTextColumnFilter",
      headerTooltip: "Commodity",
      width: 100,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Price",
      field: "Price",
      filter: false,
      headerTooltip: "Price",
      valueFormatter: dollerFormatter,
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Currency",
      field: "Currency",
      filter: false,
      headerTooltip: "Currency",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Price Per Unit",
      field: "RatePerUnit",
      filter: false,
      headerTooltip: "Price Per Unit",
      width: 120,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "UOM",
      field: "UOM",
      filter: false,
      headerTooltip: "UOM",
      width: 100,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "MOQ",
      field: "MOQ",
      filter: false,
      headerTooltip: "MOQ",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "SPQ",
      field: "SPQ",
      filter: false,
      headerTooltip: "SPQ",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Lead Time",
      field: "LeadTime",
      filter: false,
      headerTooltip: "Lead Time",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Inco Terms",
      field: "IncoTerm",
      filter: false,
      headerTooltip: "INco Terms",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Unit Weight (GM)",
      field: "UnitWeight",
      filter: false,
      headerTooltip: "Unit Weight(GM)",
      width: 130,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Dispatch Location",
      field: "DispatchLocation",
      filter: false,
      headerTooltip: "Dispatch Location",
      width: 130,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Country Of Origin",
      field: "OriginCountry",
      filter: false,
      headerTooltip: "Country Of Origin",
      width: 130,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Payment Terms",
      field: "PaymentTerms",
      filter: false,
      headerTooltip: "Payment Terms",
      width: 130,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Cost Approval",
      field: "CostApproval",
      filter: false,
      headerTooltip: "Cost Approval",
      width: 120,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Remarks",
      field: "Remarks",
      filter: false,
      headerTooltip: "Remarks",
      width: 230,
      headerClass: 'text-center',
      editable: false,
    },
  ];

  importColumnDef = [
    {
      headerName: "Upload Date",
      field: "Date",
      filter: false,
      headerTooltip: "Upload Date ",
      width: 145,
      editable: false,
      enableRowGroup: true,
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
      //cellRenderer: "errorLogRendererComponent",
    },
  ]
  currentDate: Date;
  updatedDate = new Date();
  importgridApi: any;
  importgridColumnApi: any;
  selectedFile: string;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onImportGridReady(params) {
    this.importgridApi = params.api;
    this.importgridColumnApi = params.columnApi;
    this.importgridApi.sizeColumnsToFit();
  }
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
    this.fileList = new Array<any>();
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
    this.fileUploadedList = []
    this.importdefaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.itemData = [];
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    this.deletedList = [];
    this.frameworkComponents= {
      errorLogRendererComponent : ErrorLogRendererComponent
    }
  }

  ngOnInit(): void {
    this.getItemDetails();
    this.getFileUploadedDetails()
  }
  getItemDetails() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/materialMasterData").subscribe(res => {
    //   if (res) {
    //     this.itemData = res;
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // },
    //   (err) => {
    //     this.spinner.hide();
    //   })
    const data = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: "1000"
      },
      PartNo: "",
      ParentPart: "",
      SuppierCode: "",
      SupplierName: "",
      Source: ""
    }

    this.adminService.getItemMasterList(data).subscribe(
      (res) => {
        if (res) {
          this.itemData = res.List;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        //this.notifier.notify(err.message, 4);
      }
    );
  }

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "Item_Master") {
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

  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "M_Items"
    }

    this.adminService.importSummaryList(data).subscribe((res) => {
      if (res) {
        if (res.Message || res)
          this.itemMasterImport = res.List;
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
      this.adminService.ImportFile(this.fileList[0], 'M_Items').subscribe(
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
  // onCellValueChanged(event) {
  //   if (event !== null &&
  //     event !== undefined &&
  //     event.column !== null &&
  //     event.column !== undefined &&
  //     event.column.colId !== null &&
  //     event.column.colId !== undefined &&
  //     event.column.colId === "t_codes") {
  //     this.changedtCodes.push(event.data)
  //   }
  //   if (event !== null &&
  //     event !== undefined &&
  //     event.column !== null &&
  //     event.column !== undefined &&
  //     event.column.colId !== null &&
  //     event.column.colId !== undefined &&
  //     event.column.colId === "description") {
  //     this.changedDescription.push(event.data)
  //   }
  // }


  // apply() {
  //   // this.adminService.deleteItemMaster(this.deletedList).subscribe((res)=>{

  //   this.adminService.deleteItemMaster(this.deletedList).subscribe(
  //     (res) => {
  //       if (res) {
  //         //this.itemData = res.List;
  //         this.getItemDetails();
  //         this.spinner.hide();
  //       } else {
  //         this.spinner.hide();
  //       }
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //       // this.getItemDetails();
  //       this.notifier.notify(err.message, 4);
  //     }
  //   );
  // }

  // cancel() {
  //   //   this.getItemDetails();
  // }


  getData() {
    this.uploadedDate = new Date();
    $(".invoice, .common-bg").show();
    document.getElementById('last-updated-data').style.display = 'block';
  }
  closeModal() {
    $(".invoice, .common-bg").hide();
    document.getElementById('last-updated-data').style.display = 'none';
  }

  onCellClicked(event) {

    if (event !== null &&
      event !== undefined &&
      event.column !== null &&
      event.column !== undefined &&
      event.column.colId !== undefined &&
      event.column.colId !== null &&
      event.column.colId === "action"
    ) {
      for (let i = 0; i < this.itemData.length; i++) {
        if (this.itemData[i]["Id"] === event.data.Id) {
          this.itemData.splice(i, 1);
          break;
        }
      }
      if (this.deletedList !== null &&
        this.deletedList !== undefined &&
        this.deletedList.length === 0) {
        if (event.data !== null &&
          event.data !== undefined) {
          const obj = {
            id: event.data.Id
          }
          this.deletedList.push(obj);
          //this.itemData.splice(obj, 1);
        }
      }
      else {
        if (event.data !== null &&
          event.data !== undefined) {
          const obj = {
            id: event.data.Id
          }
          this.deletedList.push(obj);
        }
      }
      this.gridApi.refreshCells();
      this.gridApi.refreshView();
      this.gridApi.setRowData(
        this.gridOptions.rowData
      );
    }
  }
}

function dollerFormatter(params) {
  if (params.value === undefined || null) {
  } else {
    if (params.value < 0) {
      return "(" + formatNumber(params.value * -1) + ")";
    } else {
      return "" + formatNumber(params.value);
    }
  }
}


function formatNumber(num: number) {
  if (num % 1 !== 0) {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
  } else {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
  }
}