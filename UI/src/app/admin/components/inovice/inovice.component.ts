import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridOptions, ServerSideStoreType } from 'ag-grid-community';
import { AdminService } from '../../admin.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChangeInvoiceDateComponent } from '../../templates/change-invoice-date/change-invoice-date.component';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ErrorLogRendererComponent } from '../../templates/error-log-renderer/error-log-renderer.component';
declare var settings: any;
const baseURL = settings.api;
declare var $: any;
let PAGESIZE = 100;
@Component({
  selector: 'app-inovice',
  templateUrl: './inovice.component.html',
  styleUrls: ['./inovice.component.scss']
})
export class InoviceComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  formData: FormData;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  MRPName: any;
  frameworkComponents: any;
  Chagedatedata: any;
  Month: any;
  revision: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  uploadForm: any;
  invoiceData: any;
  pageSize: number;
  paginationPageSize: number;
  updatedDate: Date;
  public serverSideStoreType: ServerSideStoreType = 'partial';
  importFrameworkComponents: any;
  cacheBlockSize: number;
  rowBuffer: number;
  rowModelType: string;
  invoiceNo: any;
  formDate = new Date();
  invoicenumber: any;
  poNumber: any;
  billNumber: any;
  expectedAtFactory: boolean;
  expectedAtPort: boolean;
  expDelivery: boolean;
  fileList: any[];
  // columnDefs=[
  //   {
  //     headerName :"Sr. no",
  //     field: "sr_No",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "sr No",
  //     width: 250,
  //   },
  //   {
  //     headerName :"MRP Name",
  //     field: "mrp_Name",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "MRP Name",
  //     width: 250,
  //   },
  //   {
  //     headerName :"Date",
  //     field: "date",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Date",
  //     width: 250,
  //   },
  //   {
  //     headerName :"Revision",
  //     field: "revision",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Revision",
  //     width: 250,
  //   },
  //   {
  //     headerName :"File",
  //     field: "file",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "File",
  //     width: 250,
  //   },

  // ];
  // changeDateCloumnDefs = [
  //   {
  //     headerName: "Inovice Number",
  //     field: "Inovice_Number",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Inovice Number",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     }
  //   },
  //   {
  //     headerName: "Inovice Date",
  //     field: "inovice_Date",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Inovice Date",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     },
  //     valueFormatter: (params) => {
  //       if (params.value !== undefined) {
  //         const date = new Date(params.value);
  //         const datepipe: DatePipe = new DatePipe("en-US");
  //         return datepipe.transform(date, "MM/dd/yyyy");
  //       }
  //     },
  //   },

  //   {
  //     headerName: "PO Number",
  //     field: "PO_Number",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "PO Number",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     }
  //   },
  //   {
  //     headerName: "Expected Arrival At Factory",
  //     field: "exp_atFactory",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Expected Arrival At Factory",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     },
  //     valueFormatter: (params) => {
  //       if (params.value !== undefined) {
  //         const date = new Date(params.value);
  //         const datepipe: DatePipe = new DatePipe("en-US");
  //         return datepipe.transform(date, "MM/dd/yyyy");
  //       }
  //     },
  //   },
  //   {
  //     headerName: "Expected Delivery Date",
  //     field: "exp_deliveryDate",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Expected Delivery Date",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     },
  //     valueFormatter: (params) => {
  //       if (params.value !== undefined) {
  //         const date = new Date(params.value);
  //         const datepipe: DatePipe = new DatePipe("en-US");
  //         return datepipe.transform(date, "MM/dd/yyyy");
  //       }
  //     },
  //   },
  //   {
  //     headerName: "Expected Arrival At Port",
  //     field: "exp_atPort",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Expected Arrival At Port",
  //     width: 150,
  //     cellStyle: {
  //       textAlign: 'center'
  //     },
  //     valueFormatter: (params) => {
  //       if (params.value !== undefined) {
  //         const date = new Date(params.value);
  //         const datepipe: DatePipe = new DatePipe("en-US");
  //         return datepipe.transform(date, "dd/MM/yyyy");
  //       }
  //     },
  //   },

  // ]

  columnDefs = [
    {
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "plant",
      width: 100,
      cellStyle: {
        textAlign: 'right'
      },
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "PO No.",
      field: "PONumber",
      filter: false,
      headerTooltip: "PO No.",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Supplier Invoice No.",
      field: "InvoiceNumber",
      filter: false,
      headerTooltip: "Supplier Invoice No.",
      width: 140,
      // cellStyle: {
      //   textAlign: 'right'
      // },
      headerClass: 'text-center',
    },
    {
      headerName: " Invoice Date",
      field: "InvoiceDate",
      //   filter: false,
      headerTooltip: " Invoice Date",
      width: 160,
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
      filter: 'agDateColumnFilter',
      filterParams: {
        browserDatePicker: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          const datepipe: DatePipe = new DatePipe("en-US");
          const cellValue1 = datepipe.transform(
            cellValue,
            "dd-MM-yyyy"
          );
          var dateAsString = cellValue1;
          var dateParts = dateAsString.split("-");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[0]) - 1,
            Number(dateParts[1])
          );
          if (
            filterLocalDateAtMidnight.getTime() === cellDate.getTime()
          ) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
      },
    },
    {
      headerName: " Job NO",
      field: "JobNumber",
      filter: false,
      headerTooltip: " Job No",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: " BL NO",
      field: "BLNumber",
      filter: false,
      headerTooltip: " BL No",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }

    },
    {
      headerName: " Order Name",
      field: "OrderName",
      filter: false,
      headerTooltip: "Order Name",
      width: 100,
      headerClass: 'text-center',
    },
    {
      headerName: " Mode",
      field: "Mode",
      filter: false,
      headerTooltip: "Mode",
      width: 100,
      headerClass: 'text-center',
    },
    {
      headerName: " Yazaki Part No.",
      field: "ItemCode",
      filter: false,
      headerTooltip: "Yazaki Part No.",
      width: 130,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: " Qty.",
      field: "Quantity",
      filter: false,
      headerTooltip: "Qty",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: " Part Value",
      field: "PartValue",
      filter: false,
      headerTooltip: "Part Value",
      width: 100,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Expected Arrival At Factory  ",
      field: "ExpectedArrivalAtFactory",
      filter: false,
      headerTooltip: "Expected Arrival At Factory",
      width: 180,
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
      cellStyle: {
        textAlign: 'center'
      }
    },
    {
      headerName: "Week No.(ETAF) ",
      field: "WeekNumber",
      filter: false,
      headerTooltip: "Week No.(ETAF)",
      width: 130,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Expected Delivery Date ",
      field: "ExpectedDeliveryDate",
      filter: false,
      headerTooltip: "Expected Delivery Date",
      width: 180,
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
      cellStyle: {
        textAlign: 'center'
      }
    },
    {
      headerName: "Expected Arrival Date At Port",
      field: "ExpectedArrivalDateAtPort",
      filter: false,
      headerTooltip: "Expected Arrival Date At Port",
      width: 200,
      headerClass: 'text-center',
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "dd/MM/yyyy");
        }
      },
      cellStyle: {
        textAlign: 'center'
      }
    },



  ]
  // MrpData = [
  //   {
  //     sr_Date 1,
  //     mrp_Name: "test data1",
  //     date: "21/07/2022",
  //     revision: "ver 0.1",
  //     file: "file1",
  //   },
  //   {
  //     sr_No: 2,
  //     mrp_Name: "test data2",
  //     date: "22/07/2022",
  //     revision: "ver 0.2",
  //     file: "file1"
  //   },
  //   {
  //     sr_No: 3,
  //     mrp_Name: "test data3",
  //     date: "23/07/2022",
  //     revision: "ver 0.3",
  //     file: "file3"
  //   },
  //   {
  //     sr_No: 4,
  //     mrp_Name: "test data4",
  //     date: "21/07/2022",
  //     revision: "ver 0.4",
  //     file: "file4"
  //   },
  //   {
  //     sr_No: 5,
  //     mrp_Name: "test data5",
  //     date: "21/07/2022",
  //     revision: "ver 0.5",
  //     file: "file5"
  //   }
  // ]
  defaultColDef = {
    sortable: true,
    resizable: true,
    // flex: 1,
  };
  uploadedDate: Date;

  invoiceDate: string;
  expectedArrivalAtFactory: string;
  expectedDeliveryDate: string;
  expectedArrivalAtPort: string;
  InvoiceDate: any;
  isxlsx: boolean;
  invoiceImport: any;
  importgridApi: any;
  importgridColumnApi: any;
  importdefaultColDef: any;
  fileUploadedList: any;
  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onImportGridReady(params) {
    this.importgridApi = params.api;
    this.importgridColumnApi = params.columnApi;
    this.importgridApi.sizeColumnsToFit();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // const data =
    // {
    //   PageCriteria: {
    //     PageNumberToFetch: 1,
    //     PageSize: PAGESIZE
    //   },
    //   PlantCode: "",
    //   SupplierCode: "",
    //   ItemCode: "",
    //   Buyer: "",
    //   Year: ""

    // }
    // this.adminService.getInvoiceList(data).subscribe((res) => {
    //   if (res) {
    //      this.invoiceData = res.List;
    //     this.columnDefs = [
    //       {
    //         headerName: "Plant",
    //         field: "plant",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "plant",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Supplier Code",
    //         field: "supplier_code",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Supplier Code",
    //         width: 200,
    //       },
    //       {
    //         headerName: "PO No.",
    //         field: "po_no",
    //         filter: false,
    //         headerTooltip: "PO No.",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Supplier Invoice No.",
    //         field: "s_inviove_no",
    //         filter: false,
    //         headerTooltip: "Supplier Invoice No.",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Invoice Date",
    //         field: "i_date",
    //         filter: false,
    //         headerTooltip: " Invoice Date",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Job NO",
    //         field: "job_no",
    //         filter: false,
    //         headerTooltip: " Job No",
    //         width: 200,
    //       },
    //       {
    //         headerName: " BL NO",
    //         field: "bill_no",
    //         filter: false,
    //         headerTooltip: " BL No",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Order Name",
    //         field: "order_name",
    //         filter: false,
    //         headerTooltip: "Order Name",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Mode",
    //         field: "mode",
    //         filter: false,
    //         headerTooltip: "Mode",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Yazaki Part No.",
    //         field: "yazaki_part_no",
    //         filter: false,
    //         headerTooltip: "Yazaki Part No.",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Qty.",
    //         field: "qty",
    //         filter: false,
    //         headerTooltip: "Qty",
    //         width: 200,
    //       },
    //       {
    //         headerName: " Part Value",
    //         field: "part_value",
    //         filter: false,
    //         headerTooltip: "Part Value",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Expected Arrival At Factory  ",
    //         field: "expected_factory_arrival_date",
    //         filter: false,
    //         headerTooltip: "Expected Arrival At Factory",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Week No.(ETAF) ",
    //         field: "week_no",
    //         filter: false,
    //         headerTooltip: "Week No.(ETAF)",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Expected Delivery Date ",
    //         field: "expected_delivery_date",
    //         filter: false,
    //         headerTooltip: "Expected Delivery Date",
    //         width: 200,
    //       },
    //       {
    //         headerName: "Expected Arrival Date At Port",
    //         field: "expected_arrival_date_port",
    //         filter: false,
    //         headerTooltip: "Expected Arrival Date At Port",
    //         width: 200,
    //       },



    //     ]
    //     var datasource = this.createServerSideDatasourceCustom(
    //       res.List,
    //       res.Count
    //     );
    //     params.api.setServerSideDatasource(datasource);
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // },
    //   (err) => {
    //     this.spinner.hide();
    //   })
  }
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private datepipe: DatePipe,
    private notifier: NotifierService
  ) {
    this.fileUploadedList = [];
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    // this.columnDefs=[];
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    //this.invoiceData = [];
    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.updatedDate = new Date;
    this.rowModelType = "serverSide";
    this.rowBuffer = 0;
    this.formDate = new Date();
    this.fileList = new Array<any>();
    // date1 = datepipe.transform(new Date(), "dd/MM/yyyy");
    // this.invoiceDate = datepipe.transform(new Date(), 'dd/MM-YYYY');
    // this.expectedArrivalAtFactory = datepipe.transform(new Date(), 'dd/MM-YYYY');
    // this.expectedDeliveryDate = datepipe.transform(new Date(), 'dd/MM-YYYY');
    // this.expectedArrivalAtPort  = datepipe.transform(new Date(), 'dd/MM-YYYY');

    this.frameworkComponents = {
      changeInvoiceDate: ChangeInvoiceDateComponent
    }
    this.importFrameworkComponents={
      errorLogRendererComponent : ErrorLogRendererComponent
    }
    this.expectedAtFactory = false;
    this.expectedAtPort = false;
    this.expDelivery = false;
    this.importdefaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
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
      filter: false,
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
        textAlign: 'center'
      }
    },
    {
      headerName: "Successful Records",
      field: "SuccessRecord",
      filter: false,
      width: 100,
      headerClass: 'text-center',
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
      width: 150,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      //cellRenderer: "errorLogRendererComponent",
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

  ngOnInit(): void {
    this.getInvoiceData();
    this.getFileUploadedDetails();
  }

  createServerSideDatasourceCustom(data, count) {
    return {
      getRows: function (params) {
        var rowsForBlock = null;
        //  var lastRow = getLastRowIndex(params.request, rowsForBlock);
        if (
          +params.request.startRow === 0 &&
          Object.keys(params.request.filterModel).length === 0
        ) {
          rowsForBlock = data.slice(
            params.request.startRow,
            params.request.endRow
          );
          params.successCallback(rowsForBlock, count);
        } else {
          return setTimeout(async () => {
            await myFunction(params);
          });
        }
      },
    };
  }


  getInvoiceDate() {
    this.spinner.show();
    this.adminService.getInvoiceDetails(this.invoicenumber).subscribe(
      (res) => {
        if (res.Message) {
          this.notifier.notify("Invoice Data not found!", 1);
          this.spinner.hide();
        }
        else {
          if (res) {
            let detailInvoice = res.List[0]
            this.invoiceDate = this.datepipe.transform(detailInvoice.InvoiceDate, 'YYYY-MM-dd');
            // this.expectedArrivalAtFactory = detailInvoice.ExpectedArrivalAtFactory
            this.expectedArrivalAtFactory = this.datepipe.transform(detailInvoice.ExpectedArrivalAtFactory, 'YYYY/MM/dd');
            this.expectedArrivalAtPort = this.datepipe.transform(detailInvoice.ExpectedArrivalDateAtPort, 'YYYY/MM/dd');
            this.expectedDeliveryDate = this.datepipe.transform(detailInvoice.ExpectedDeliveryDate, 'YYYY/MM/dd');
            this.poNumber = detailInvoice.PONumber;
            if (detailInvoice.BLNumber !== null &&
              detailInvoice.BLNumber !== undefined) {
              this.billNumber = detailInvoice.BLNumber;
            }
            else {
              this.billNumber = 0;
            }

            // this.invoiceDate=detailInvoice.InvoiceDate;
            //     this.itemData = res.List;
            // for (let i = 0; i <= detailInvoice.length; i++) {
            //   this.invoiceDate = detailInvoice.InvoiceDate
            // }
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        }

      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      }
    );
  }


  getInvoiceData() {
    this.spinner.show();
    const data =
    {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: PAGESIZE
      },
      PlantCode: "",
      SupplierCode: "",
      ItemCode: "",
      Buyer: "",
      Year: ""
    }

    this.adminService.getInvoiceList(data).subscribe(

      // (res) => {
      //   if (res) {
      //     this.invoiceData = res.List;
      //     this.spinner.hide();
      //   } else {
      //     this.notifier.notify("Data Not Found", 1);
      //     this.spinner.hide();
      //   }
      // },
      // (err) => {
      //   this.spinner.hide();
      //   this.notifier.notify(err.message, 4);
      // }

      (res) => {
        if (res) {
          if (res.Message || res.message) {
            this.invoiceData = [];
            //  this.notifier.notify("Data Not Found", 1);
            this.spinner.hide();
          }
          else {
            this.invoiceData = res.List;
            this.getFileUploadedDetails();
            this.spinner.hide();
          }
        } else {
          this.invoiceData = [];
          this.spinner.hide();
        }
      },
      (err) => {
        this.invoiceData = [];
        this.spinner.hide();

        //   this.notifier.notify("Data Not Found", 1);
      }
    )

  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
    this.getImportSummaryList();
  }

  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "Invoice"
    }

    this.adminService.importSummaryList(data).subscribe(
      (res) => {
        if (res) {
          if (res.Response || res.Message || res.mseeage) {
            //   this.notifier.notify("Data Not Found ", 1);
            this.invoiceImport = [];
            this.spinner.hide();
          }
          else {
            this.invoiceImport = res.List;
            this.spinner.hide();
          }

        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        this.invoiceImport = [];
        this.notifier.notify("Data Not Found ", 1);
        // this.notifier.notify(err.message, 4);
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
      this.adminService.ImportFile(this.fileList[0], 'Invoice').subscribe(
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

  getFileUploadedDetails() {
    // this.adminService.getFileUploadedDate().subscribe(
    //   (res)=>{
    //    if(res){
    //     this.fileUploadedList= res.Result.Result;
    //    }
    //   }
    // )

    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "Invoice") {
              this.updatedDate = element.Date;
            }
          });


        }
      })
  }

  cancel() { }
  changeexpectedArrivalAtFactory() {
    this.expectedAtFactory = true;

  }

  changeexpectedArrivalAtPort() {
    this.expectedAtPort = true;
  }

  changeDeliveryDate() {
    this.expDelivery = true;
  }
  apply() {
    let ExpectedArrivalAtFactory;
    let ExpectedArrivalDateAtPort;
    let ExpectedDeliveryDate;
    if (this.expectedAtFactory !== null &&
      this.expectedAtFactory !== undefined &&
      this.expectedAtFactory === true) {
      ExpectedArrivalAtFactory = this.datepipe.transform(new Date(this.expectedArrivalAtFactory), 'yyyy/MM/dd');
      //  ExpectedArrivalAtFactory = this.expectedArrivalAtFactory
    }
    else {
      // ExpectedArrivalAtFactory = this.datepipe.transform(new Date(this.expectedArrivalAtFactory), 'yyyy/MM/dd');\
      ExpectedArrivalAtFactory = this.expectedArrivalAtFactory;
      console.log(this.datepipe.transform(new Date(this.expectedArrivalAtFactory), 'dd/MM/yyyy'))
    }

    if (this.expectedAtPort !== null &&
      this.expectedAtPort !== undefined &&
      this.expectedAtPort === true) {
      ExpectedArrivalDateAtPort = this.datepipe.transform(new Date(this.expectedArrivalAtPort), 'yyyy/MM/dd');
    }
    else {
      // ExpectedArrivalDateAtPort = this.datepipe.transform(new Date(this.expectedArrivalAtPort), 'yyyy/MM/dd');
      ExpectedArrivalDateAtPort = this.expectedArrivalAtPort
    }

    if (this.expDelivery !== null &&
      this.expDelivery !== undefined &&
      this.expDelivery === true) {
      ExpectedDeliveryDate = this.datepipe.transform(new Date(this.expectedDeliveryDate), 'yyyy/MM/dd');
    }
    else {
      // ExpectedDeliveryDate = this.datepipe.transform(new Date(this.expectedDeliveryDate), 'yyyy/MM/dd');
      ExpectedDeliveryDate = this.expectedDeliveryDate
    }
    //  if(this.expectedArrivalAtFactory.includes())
    // if (this.expectedArrivalAtFactory !== null &&
    //   this.expectedArrivalAtFactory !== undefined &&
    //   this.expectedArrivalAtPort !== null &&
    //   this.expectedArrivalAtPort !== undefined &&
    //   this.expectedDeliveryDate !== null &&
    //   this.expectedDeliveryDate !== undefined) {
    //   console.log("(this.expectedArrivalAtFactory",this.expectedArrivalAtFactory)
    // ExpectedArrivalAtFactory = this.datepipe.transform(new Date(this.expectedArrivalAtFactory), 'YYYY-MM-dd');
    // ExpectedArrivalDateAtPort = this.datepipe.transform(new Date(this.expectedArrivalAtPort), 'YYYY-MM-dd');
    // ExpectedDeliveryDate = this.datepipe.transform(new Date(this.expectedDeliveryDate), 'YYYY-MM-dd');

    const data = {
      InvoiceNumber: this.invoicenumber,
      // ExpectedArrivalAtFactory: this.datepipe.transform(this.expectedArrivalAtFactory, 'dd/MM/YYYY'),
      ExpectedArrivalAtFactory: ExpectedArrivalAtFactory,
      // ExpectedArrivalDateAtPort: this.datepipe.transform(this.expectedArrivalAtPort, 'dd/MM/YYYY'),
      ExpectedArrivalDateAtPort: ExpectedArrivalDateAtPort,
      ExpectedDeliveryDate: ExpectedDeliveryDate,
      // InvoiceDate: this.datepipe.transform(this.invoiceDate, 'dd/MM/YYYY'),
      //InvoiceDate: this.invoiceDate
    }
    console.log(data)

    this.adminService.updateDate(data).subscribe((res) => {
      if (res.Message) {
        //   this.invoiceData = res.List;

        this.notifier.notify(res.Message, 1);
        this.getInvoiceData();
        this.spinner.hide();
        this.expDelivery = false;
        this.expectedAtPort = false;
        this.expectedAtFactory = false;
        this.closeChangeDateModal();
      }
      else {
        this.getInvoiceData();
        this.spinner.hide();
        this.closeChangeDateModal();
      }
    },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
        this.closeChangeDateModal();
      })

    // }


  }
  onOpenYearCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("day");
  }


  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".invoice, .common-bg").show();
    document.getElementById('last-updated-inovice-data').style.display = 'block';
  }

  closeModal() {
    $(".invoice, .common-bg").hide();
    document.getElementById('last-updated-inovice-data').style.display = 'none';
  }
  changeDate() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".change-date, .common-bg").show();
    document.getElementById('change-date').style.display = 'block';
  }

  closeChangeDateModal() {
    this.invoicenumber = null;
    this.invoiceDate = null;
    this.poNumber = null;
    this.billNumber = null;
    this.expectedArrivalAtFactory = null;
    this.expectedArrivalAtPort = null;
    this.expectedDeliveryDate = null
    $(".change-date, .common-bg").hide();
    document.getElementById('change-date').style.display = 'none';
  }

  // getInvoicedata(){

  //   this.Chagedatedata=[
  //     {
  //       "inovice_Date":"30-10-2022",
  //       "exp_atFactory":"5-11-2022",
  //       "exp_deliveryDate":"7-11-2022",
  //       "exp_atPort":"3-11-2022"
  //     }
  //   ];
  // }
  selectedInvoiceData() { }
}


async function myFunction(params) {
  let pageID = null;
  let sub_key = null;
  let filterDataList = [];
  if (params.request.startRow !== undefined) {
    pageID = Number(+params.request.startRow / PAGESIZE) + 1;
  } else {
    pageID = 1;
  }
  if (Object.keys(params.request.filterModel).length !== 0) {
    for (const j in params.request.filterModel) {
      sub_key = j;
      filterDataList.push(
        sub_key + "-" + params.request.filterModel[sub_key].filter
      );
    }
  }
  var userdata = {
    //  type_OFLabel: "PROGRAM_GRID",
    pageId: pageID,
    pageSize: PAGESIZE,
    column: sub_key,
    filter: filterDataList,
  };

  var myHeaders = new Headers();
  // myHeaders.append(
  //   "Authorization",
  //   `Bearer ${sessionStorage.getItem("AccessToken")}`
  // );
  myHeaders.append("Content-Type", "application/json");
  return await fetch(baseURL + "Invoice/GetList", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(userdata),
  })
    .then((res) => res.json())
    .then((data) => {
      // iterate over users
      if (data.success) {
        params.successCallback(data.Result.LIST, data.Result.count);
      } else {
        params.failCallback();
      }
    })
    .catch((err) => {
      params.failCallback();
      console.error("Error: ", err);
    });
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