import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
import { FormBuilder } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-daily-shipment',
  templateUrl: './daily-shipment.component.html',
  styleUrls: ['./daily-shipment.component.scss']
})
export class DailyShipmentComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  uploadedDate: Date;
  updatedDate = new Date();
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  DailyShipmentList: any;
  filename1: any;
  isFileSelected = true;
  isxlsx: boolean;
  formData: any;
  fileList: any[];
  importgridApi: any;
  rowSelection: string;
  uploadForm: any;
  fromDate: any;
  toDate: any;
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
      field: "total_Records",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Successful Records",
      field: "success_Records",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Failure Records",
      field: "failed_Records",
      filter: false,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    // {
    //   headerName: "Remark",
    //   field: "remark",
    //   filter: false,
    //   headerTooltip: "Remark",
    //   width: 150,
    //   editable: false,
    //   enableRowGroup: true,
    // },
  ]
  importdefaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  fileUploadedList: any;
  importSummaryList: any;
  onImportGridReady(params) {
    this.importgridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.importgridApi.sizeColumnsToFit();
  }
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.DailyShipmentList = [];
    this.rowSelection = "multiple";
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    let fromDates = new Date(new Date().setDate(new Date().getDate() - 1));
    this.fromDate = this.datepipe.transform(fromDates, 'yyyy-MM-dd');
    // this.isFileSelected= false;
    this.fileUploadedList = [];
    this.importSummaryList = [];
    this.fileList = new Array<any>();
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    this.updatedDate = null;

  }

  columnDefs = [
    {
      headerName: "Port",
      field: "PortNo",
      headerTooltip: "Port",
      width: 120,
      //   cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Plant",
      field: "Plant",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Pickup Req Date from Buyer",
      field: "PickupReqDate",
      headerTooltip: "Pickup Req Date from Buyer",
      width: 190,
      cellStyle: { textAlign: 'center' },
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
      headerName: "Forwarder Name",
      field: "Forwarder",
      headerTooltip: "Forwarder Name",
      width: 150,
      //  cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Shipper Name",
      field: "ShipperName",
      headerTooltip: "Shipper Name",
      width: 150,
      filter: "agTextColumnFilter",
      //  cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Invoice No",
      field: "InvoiceNo",
      filter: "agTextColumnFilter",
      headerTooltip: "Invoice No",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Invoice Date",
      field: "InvoiceDate",
      headerTooltip: "Invoice Date",
      width: 170,
      cellStyle: { textAlign: 'center' },
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
      headerName: "Invoice Value",
      field: "InvoiceValue",
      headerTooltip: "Invoice Value",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
    },
    {
      headerName: "No of Packages",
      field: "Packages",
      headerTooltip: "No of Packages",
      width: 140,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Weight of Shipment in Kg",
      field: "WeightShipment",
      headerTooltip: "Weight of Shipment in Kg",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "MBL",
      field: "MBL",
      headerTooltip: "MBL",
      width: 170,
      // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "HBL",
      field: "HBL",
      headerTooltip: "HBL",
      width: 170,
      // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    }, {
      headerName: "C Type",
      field: "CType",
      headerTooltip: "C Type",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Liner",
      field: "Liner",
      headerTooltip: "Liner",
      width: 170,
      //  cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Container No",
      field: "Container",
      headerTooltip: "Container No",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "ETD",
      field: "ETD",
      headerTooltip: "ETD",
     // filter: "agTextColumnFilter",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "MM/dd/yyyy");
        }
      },
    },
    {
      headerName: "ETA Port",
      field: "ETAPort",
      headerTooltip: "ETA Port",
    //  filter: "agTextColumnFilter",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "MM/dd/yyyy");
        }
      },
    },
    {
      headerName: "JOB No",
      field: "JOBNo",
      headerTooltip: "JOB No",
      filter: "agTextColumnFilter",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Proceed",
      field: "Proceed",
      headerTooltip: "Proceed",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "IGM",
      field: "IGM",
      headerTooltip: "IGM",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Inward",
      field: "Inward",
      headerTooltip: "Inward",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "CFS",
      field: "CFS",
      headerTooltip: "CFS",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Fine",
      field: "Fine",
      headerTooltip: "Fine",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Checklist Received Date",
      field: "ChecklistDate",
      headerTooltip: "Checklist Received Date",
      width: 170,
      cellStyle: { textAlign: 'center' },
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
      headerName: "BE No",
      field: "BENo",
      headerTooltip: "BE No",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "BE Date",
      field: "BEDate",
      headerTooltip: "BE Date",
      width: 170,
      cellStyle: { textAlign: 'center' },
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
      headerName: "G/rms",
      field: "Grms",
      headerTooltip: "G/rms",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Ass",
      field: "Ass",
      headerTooltip: "Ass",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Duty Payment",
      field: "DutyPayment",
      headerTooltip: "Duty Payment",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "OOC",
      field: "OOC",
      headerTooltip: "OOC",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "DO",
      field: "DO",
      headerTooltip: "DO",
      width: 140,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Cleared Dt",
      field: "ClearedDt",
      headerTooltip: "Cleared Dt",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Status",
      field: "Status",
      headerTooltip: "Status",
      width: 170,
      //  cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Remarks",
      field: "Remarks",
      headerTooltip: "Remarks",
      width: 170,
      //   cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },

  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getDailyShipmentList();
    this.getFileUploadedDetails();
  }

  getFileUploadedDetails() {

    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "Daily Shipment") {
              this.updatedDate = element.Date;
            }
          });

        }
      })
  }

  getDailyShipmentList() {
    this.spinner.show();
    this.fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    const data = {

      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 10
      },
      StartDate: this.fromDate,
      EndDate: this.toDate

    }
    // // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getDailyShipmentList(data).subscribe(
      res => {
        if (res) {
          if (res.Message) {
            // this.notifier.notify(res.Message,1);
            this.DailyShipmentList = [];
            this.spinner.hide();
          }
          else {
            this.DailyShipmentList = res.Result;
            this.getFileUploadedDetails();
            this.spinner.hide();
          }
          // this.plantDivisionList = res;

        }
        else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify(err.message, 4);
      })
  }



  getData() {
    // this.uploadedDate = new Date();
    $(".last-updated-item-daily-shipment-data, .common-bg").show();
    document.getElementById('last-updated-item-daily-shipment-data').style.display = 'block';
  }

  closeModal() {
    document.getElementById('last-updated-item-daily-shipment-data').style.display = 'none';
    $(".last-updated-item-daily-shipment-data, .common-bg").hide();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
    this.getImportSummaryList();
  }
  hideImport() {
    this.isFileSelected = true;
    this.filename1 = null;
    $(".box-import, .common-bg").hide();
  }


  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "DailyShipment"
    }

    this.adminService.importSummaryList(data).subscribe((res) => {
      if (res) {
        this.importSummaryList = res.List;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
        //   this.notifier.notify(err.message, 4);
      });
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
      //    this.hideImport();
      this.spinner.show();
      this.adminService.ImportSupplierMasterFile(this.fileList[0], 'DailyShipment').subscribe(
        (res) => {
          if (res) {
            this.isxlsx = false;
            this.formData = null;
            this.filename1 = null;
            //  this.GetUserList();
            // this.adminService.importSummaryList('M_Items' ).subscribe(res => {
            //   if (res) {
            //     this.itemMasterImport = res;
            //     this.spinner.hide();
            //   }
            //   else {
            //     this.spinner.hide();
            //   }
            // },
            //   (err) => {
            //     this.spinner.hide();
            //   })
            this.notifier.notify(res.Message, 1);
            this.getImportSummaryList();
            //    this.spinner.hide();
            // const msg =
            //   res.message.summary +
            //   '\n <b class="text-success">Successful Records : </b>' +
            //   res.pass_record +
            //   '\n <b class="text-danger"> Failure Records : </b>' +
            //   res.fail_record;
            // this.notifier.notify(msg, 1);
          } else {
            this.isxlsx = false;
            this.filename1 = null;
            this.spinner.hide();
            // this.notifier.notify(res.message.summary, 3);
          }
        },
        (err) => {
          //this.isCSV = false;
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );
    } else {
      this.isFileSelected = false;
    }
  }

  reset() {
    this.fromDate = null;
    this.toDate = null;
  }

  apply() {
    this.getDailyShipmentList();
  }

  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
  }
}

function dollerFormatter(params) {
  if (params.value === undefined || null) {
    return params.value = 0;
  } else {
    if (params.value < 0) {
      return "" + formatNumber(params.value) + "";
    } else {
      return "" + formatNumber(params.value);
    }
  }
}

function formatNumber(num: number) {
  if (+num % 1 !== 0) {
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