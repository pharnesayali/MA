import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/admin/admin.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { GridOptions } from "ag-grid-community";
import { DatePipe } from "@angular/common";
import { NotifierService } from 'src/app/shared/services/notifier.service';
declare var $: any;
let PAGESIZE = 50;
import { MrpActionRendererComponent } from '../../templates/mrp-action-renderer/mrp-action-renderer.component';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/shared/models/user";
import { ErrorLogRendererComponent } from '../../templates/error-log-renderer/error-log-renderer.component';
@Component({
  selector: 'app-mrp',
  templateUrl: './mrp.component.html',
  styleUrls: ['./mrp.component.scss']
})
export class MrpComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
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
  isCSV: boolean;
  isFileSelected = true;
  mrpName: any;
  pageSize: number;
  paginationPageSize: number;
  MrpData = [];
  selectedBuyer: any;
  selectedYear: any;
  minDate: Date;
  updatedDate: Date;
  fileList: any[];
  mrpViewClicked: boolean;
  importFrameworkComponents: any;
  currentUser: User;
  months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  monthList = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // columnDefs = [
  //   {
  //     headerName: "MRP Name",
  //     field: "mrp_Name",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "MRP Name",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Zone Code",
  //     field: "zone_Code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Zone Code",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Plant Name",
  //     field: "plant_Name",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Plant Name",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Type",
  //     field: "type",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Type",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Date",
  //     field: "date",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Date",
  //     width: 250,
  //     editable: false,
  //     // valueFormatter: (params) => {
  //     //   if (params.value !== undefined) {
  //     //     const date = new Date(params.value);
  //     //     const datepipe: DatePipe = new DatePipe("en-US");
  //     //     return datepipe.transform(date, "MM/dd/yyyy");
  //     //   }
  //     // },
  //   },
  //   {
  //     headerName: "Revision",
  //     field: "revision",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Revision",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "File",
  //     field: "file",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "File",
  //     width: 250,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Action",
  //     field: "id",
  //     filter: false,
  //     headerTooltip: "Action",
  //     width: 250,
  //     cellRenderer: "mrpActionRenderer",
  //     editable: false,
  //   },
  // ];

  // columnDefs = [

  //   {
  //     headerName: "Zone Code",
  //     field: "zone_Code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Zone Code",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Plant Code",
  //     field: "plant_Code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Plaant Code",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Part Number",
  //     field: "part_no",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Part Number",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Supplier Code",
  //     field: "supplier_Code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Supplier Code",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Buyers",
  //     field: "buyers",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Buyers",
  //     width: 150,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_1",
  //     field: "M_1",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_1",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_2",
  //     field: "M_2",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_2",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_3",
  //     field: "M_3",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_3",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_4",
  //     field: "M_4",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_4",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_5",
  //     field: "M_5",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_5",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_6",
  //     field: "M_6",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_6",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_7",
  //     field: "M_7",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_7",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_8",
  //     field: "M_8",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_8",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_9",
  //     field: "M_9",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_9",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_10",
  //     field: "M_10",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_10",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_11",
  //     field: "M_11",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_11",
  //     width: 100,
  //     editable: false,
  //   },
  //   {
  //     headerName: "M_12",
  //     field: "M_12",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "M_12",
  //     width: 100,
  //     editable: false,
  //   },
  //       {
  //     headerName: "Project",
  //     field: "project",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Project",
  //     width: 150,
  //     editable: false,
  //   },
  //   {
  //     headerName: "Customer",
  //     field: "customer",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Customer",
  //     width: 150,
  //     editable: false,
  //   },
  // ]

  MrpListColumnDef = [
    {
      headerName: "Month",
      field: "monthName",
      filter: "agTextColumnFilter",
      headerTooltip: "Month",
      width: 200,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      // cellStyle: {
      //   textAlign: 'center'
      // },
    },
    {
      headerName: "Upload Date",
      field: "Date",
      filter: false,
      headerTooltip: "Upload Date ",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
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
      headerName: "Revision",
      field: "Revision",
      filter: false,
      headerTooltip: "Revision",
      width: 200,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Action",
      field: "id",
      filter: false,
      headerClass: 'text-center',
      // headerTooltip: "Generated By",
      cellRenderer: function (params) {
        if (
          params !== null &&
          params !== undefined &&
          params.data !== undefined &&
          params.data !== null
        ) {
          return '<a class="padding-left-20 c-pointer"> <i class="fa fa-eye" aria-hidden="true" ></i></a>';
        }
      },
      width: 140,
      editable: false,
    },
  ]

  columnDefs = [];
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
  defaultColDef = {
    sortable: true,
    resizable: true,
    headerClass: 'grid-cell-centered'
  };
  MrpListdefaultColDef = {
    sortable: true,
    resizable: true,
    headerClass: 'grid-cell-centered'
  };
  buyerlist: any;
  uploadedDate: Date;
  plantList: any;
  isxlsx: boolean;
  mrpImport: any;
  importgridApi: any;
  importgridColumnApi: any;
  importdefaultColDef: any;
  fileUploadedList: any;
  MrpgridApi: any;
  MrpgridColumnApi: any;
  MrpListData: any;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onMrpListGridReady(params) {
    this.MrpgridApi = params.api;
    this.MrpgridColumnApi = params.columnApi;
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
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    const gridSize = 6;
    this.fileUploadedList = [];
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 4;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.mrpViewClicked = false;
    this.frameworkComponents = {
      mrpActionRenderer: MrpActionRendererComponent
    }

    this.importFrameworkComponents = {
      errorLogRendererComponent: ErrorLogRendererComponent
    }
    this.selectedYear = new Date()
    this.minDate = new Date();
    this.adminService.deleteDocument$.subscribe((value) => {
      if (value) {
        this.deleteDocument(value);
      }
    });

    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });

    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.updatedDate = new Date;
    this.fileList = new Array<any>();

    this.importdefaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.MrpListData = [];
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
  }


  ngOnInit(): void {
    // this.getMRPDetails();
    //   this.getBuyerList();
    this.getPlantList();
    this.getFileUploadedDetails();
    this.getMRPList();
  }

  getMRPList() {
    this.spinner.show();
    let data
    if (this.currentUser !== null &&
      this.currentUser !== undefined &&
      this.currentUser.RoleCode !== null &&
      this.currentUser.RoleCode !== undefined &&
      (this.currentUser.RoleCode === "Admin" ||
        this.currentUser.RoleCode === "admin")) {
      data = {
        BuyerCode: ""
      }
    }
    else{
      data = {
        BuyerCode: this.currentUser.EmployeeCode
      }
    }

    // this.http.get<any>("http://localhost:3000/MRPList").subscribe(res => {
    this.adminService.getMrpList(data).subscribe(res => {
      if (res.Message) {
        this.MrpListData = [];
        this.spinner.hide();
      }
      else
        if (res && !res.message) {
          let mrpList = res.Result.Table;
          const date = new Date().getMonth() + 1;
          let mrp = [];
          mrpList.forEach((data) => {
            if (data.Month === date) {
              data.monthName = this.months[(data.Month)]
              mrp.push(data);
            }
          })
          this.MrpListData = mrp;
          mrp = [];
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
        }
    },
      (err) => {
        this.spinner.hide();
        //  this.notifier.notify(err.message, 4);
      })
  }
  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("year");
  }


  resetData() {

  }


  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".invoice, .common-bg").show();
    document.getElementById('last-updated-mrp-data').style.display = 'block';
  }

  closeModal() {
    $(".invoice, .common-bg").hide();
    document.getElementById('last-updated-mrp-data').style.display = 'none';
  }
  getPlantList() {
    this.spinner.show();

    this.adminService.getPlantList().subscribe(
      (res) => {
        // this.http.get<any>("http://localhost:3000/plantLocation").subscribe(res => {

        if (res) {
          this.spinner.hide();
          this.plantList = res.Result;

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
  getBuyerList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/buyerList").subscribe(res => {
    this.adminService.getBuyerList().subscribe(
      (res) => {
        if (res) {
          this.buyerlist = res;
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

  // getBuyerList() {
  //   this.http.get<any>("http://localhost:3000/buyerList").subscribe(res => {
  //       if (res) {
  //         this.buyerlist = res;
  //         this.spinner.hide();
  //       }
  //       else {
  //         this.spinner.hide();
  //       }
  //     },
  //       (err) => {
  //         this.spinner.hide();
  //       })
  // }
  // getSelectedData(){
  //   if(this.selectedYear !== null && 
  //     this.selectedYear !== undefined &&
  //      this.selectedBuyer !== null &&
  //      this.selectedBuyer !== undefined){
  //       this.getMRPDetails();
  //       this.selectedYear= this.selectedYear.getFullYear();
  //       this. columnDefs = [
  //         {
  //           headerName: "Date",
  //           field: "date",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Date",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "Item Code",
  //           field: "item_code",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Item Code",
  //           width: 100,
  //           editable: false,
  //         },
  //         {
  //           headerName: "Item Description",
  //           field: "item_description",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Item Description",
  //           width: 100,
  //           editable: false,
  //         },
  //         {
  //           headerName: "Supplire Code",
  //           field: "supplier_code",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Supplier Code",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "Buyer",
  //           field: "buyer",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Buyer",
  //           width: 100,
  //           editable: false,
  //         },
  //         {
  //           headerName: "Plant",
  //           field: "plant",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Plant",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "Description",
  //           field: "description",
  //           filter: "agTextColumnFilter",
  //           headerTooltip: "Description",
  //           width: 100,
  //           editable: false,
  //         },
  //         {
  //           headerName: "January (" + this.selectedYear + ")" ,
  //           field: "January",
  //           filter: false,
  //           headerTooltip: "January",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "February (" + this.selectedYear + ")",
  //           field: "February",
  //           filter: false,
  //           headerTooltip: "February",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "March(" + this.selectedYear + ")",
  //           field: "March",
  //           filter: false,
  //           headerTooltip: "March",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "April  (" + this.selectedYear + ")",
  //           field: "April",
  //           filter: false,
  //           headerTooltip: "April",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "May (" + this.selectedYear + ")",
  //           field: "May",
  //           filter: false,
  //           headerTooltip: "May",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "June (" + this.selectedYear + ")",
  //           field: "June",
  //           filter: false,
  //           headerTooltip: "June",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "July  (" + this.selectedYear + ")",
  //           field: "July",
  //           filter: false,
  //           headerTooltip: "July",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "August  (" + this.selectedYear + ")",
  //           field: "August",
  //           filter: false,
  //           headerTooltip: "April",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "September (" + this.selectedYear + ")",
  //           field: "September",
  //           filter: false,
  //           headerTooltip: "September",
  //           width: 100,
  //           editable: false,
  //         },
  //         {
  //           headerName: "October  (" + this.selectedYear + ")",
  //           field: "October",
  //           filter: false,
  //           headerTooltip: "October",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "November  (" + this.selectedYear + ")" ,
  //           field: "November",
  //           filter: false,
  //           headerTooltip: "November",
  //           width: 100,
  //           editable: false,
  //           cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //         {
  //           headerName: "December (" + this.selectedYear + ")",
  //           field: "December",
  //           filter: false,
  //           headerTooltip: "December",
  //           width: 100,
  //           editable: false,cellStyle: {
  //             textAlign: 'center'
  //           }
  //         },
  //       ]
  //      }
  // }

  // getMRPDetails() {
  //   this.spinner.show();
  //   this.http.get<any>("http://localhost:3000/MrpData").subscribe(res => {
  //     if (res) {
  //       this.buyerlist = res;
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   },
  //     (err) => {
  //       this.spinner.hide();
  //     })
  // }
  getSelectedData() {
    if (
      this.selectedBuyer !== null &&
      this.selectedBuyer !== undefined) {
      this.getMRPDetails();
      //    this.getMRPDetails();
      //   this.getPlantList();
      //  this.selectedYear = this.selectedYear.getFullYear();

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
            if (element.FileType === "MRP") {
              this.updatedDate = element.Date;
            }
          });
        }
      })

  }

  getMRPDetails() {
    this.spinner.show();
    let date = new Date();
    const data = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 100
      },
      BuyerID: this.selectedBuyer,
      //   BuyerID: "E104",
      StartMonth: date.getMonth() + 1,
      // StartMonth: 1,
      StartYear: date.getFullYear()
    };
    this.adminService.getMrpDetails(data).subscribe(
      (res) => {
        if (res) {
          if (res.message || res.Message) {
            this.MrpData = [];
            this.notifier.notify(res.message, 1);
            this.spinner.hide();

          }
          else {
            this.MrpData = res;
            this.columnDefs = MRPColumnDefs();
            let dateList = [];
            let date = new Date();
            const datepipe: DatePipe = new DatePipe("en-US");
            let start_date = datepipe.transform(new Date(), "dd/MM/yyyy");
            const start = start_date.split("/");
            let endYear;
            let endMonth
            let startYear = start[2];
            let startMonth = start[1];
            if (start[1] === "01") {
              endMonth = 12
              endYear = +startYear;
            }
            else if (start[1] === "12") {
              endMonth = 11
              endYear = +startYear + 1;
            }
            else {
              endYear = +startYear + 1;
              endMonth = +startMonth - 1;
            }
            dateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, endMonth, +start[0])));

            if (this.columnDefs !== null &&
              this.columnDefs !== undefined) {
              if (this.plantList !== null &&
                this.plantList !== undefined &&
                this.plantList.length > 0) {
                this.plantList.forEach((colDef) => {

                  let plantName = colDef.PlantCode + "-" + colDef.PlantName
                  const column = {
                    headerName: plantName,
                    headerClass: 'grid-cell-centered ',
                    children: [
                    ]
                  }

                  dateList.forEach((element) => {
                    const elementArr = element.split("-");
                    let key = null;
                    // const yearCount = new Date(elementArr[0], elementArr[1], 1).toLocaleDateString('en', {year: '2-digit'})
                    const yearCount = elementArr[0].substring(2, 4);
                    // key =this.months[+elementArr[1]]+ "_" +yearCount;
                    const col = {
                      headerName: this.monthList[+elementArr[1]] + "-" + yearCount,
                      // field:plantName,
                      field: colDef.PlantCode + "_" + this.months[+elementArr[1]] + "_" + yearCount,
                      //   field: colDef.PlantCode + "_" + this.months[+elementArr[1]] + "_" + yearCount,
                      width: 100,
                      suppressSizeToFit: true,
                      headerClass: 'text-center',
                      cellStyle: {
                        textAlign: 'center'
                      },
                      // cellStyle: {
                      //   textAlign: 'center',
                      //   headerClass: 'grid-cell-centered ',
                      // },
                      valueFormatter: dollerFormatter,
                    };
                    column.children.push(col)

                  });

                  this.columnDefs.push(column);
                })
              }
            }
            this.spinner.hide();
          }
        }
        else {
          this.MrpData = [];
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      }
    );
    // this.http.get<any>("http://localhost:3000/plantMaster").subscribe(
    //   (res) => {
    //     if (res) {
    //       console.log(res)
    //       // this.MrpData = res.MRPList;
    //       this.plantList = res;
    //       this.http.get<any>("http://localhost:3000/mrpDetails").subscribe(
    //         (res) => {
    //           if (res) {
    //             let dateList = [];
    //             console.log(res)
    //             // this.MrpData = res.MRPList;
    //             this.columnDefs = MRPColumnDefs();
    //             this.MrpData = res;
    //             let start_date = res[0].date;
    //             console.log(start_date);
    //             const start = start_date.split("/");
    //             let endYear;
    //             let endMonth
    //             console.log(start);
    //             let startYear = start[2];
    //             let startMonth = start[1];
    //             if (start[1] === "01") {
    //               endMonth = 12
    //               endYear = +startYear;
    //             }
    //             else if (start[1] === "12") {
    //               endMonth = 11
    //               endYear = +startYear + 1;
    //             }
    //             else {
    //               endYear = +startYear + 1;
    //               endMonth = +startMonth - 1;
    //             }
    //             dateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, endMonth, +start[0])));
    //             console.log(dateList);
    //             this.spinner.hide();
    //             // const currentYear = new Date().getFullYear();
    //             if (this.columnDefs !== null &&
    //               this.columnDefs !== undefined) {
    //               // for(let i=0; i<=this.plantList.length; i++){
    //               //   // console.log(this.plantList[i]);
    //               //   let plantData=[];
    //               //   plantData.push(this.plantList[i])
    //               //   console.log(plantData)
    //               // } 
    //               this.plantList.forEach((colDef) => {
    //                 console.log(colDef)
    //                 let plantName = colDef.plant_code + "-" + colDef.plant_name
    //                 const column = {
    //                   headerName: plantName,
    //                   headerClass: 'grid-cell-centered ',
    //                   children: [
    //                   ]
    //                 }
    //                 dateList.forEach((element) => {
    //                   const elementArr = element.split("-");
    //                   let key = null;
    //                   // const yearCount = new Date(elementArr[0], elementArr[1], 1).toLocaleDateString('en', {year: '2-digit'})
    //                   const yearCount = elementArr[0].substring(2, 4);
    //                   // key =this.months[+elementArr[1]]+ "_" +yearCount;
    //                   const col = {
    //                     headerName: this.months[+elementArr[1]] + "-" + yearCount,
    //                     field: colDef.plant_code + "_" + this.months[+elementArr[1]] + "_" + yearCount,
    //                     width: 100,
    //                     suppressSizeToFit: true,
    //                     cellStyle: {
    //                       textAlign: 'center'
    //                     },
    //                     valueFormatter: dollerFormatter,
    //                   };
    //                   column.children.push(col)

    //                 });

    //                 this.columnDefs.push(column);
    //               })
    //               this.columnDefs.push(
    //                 {
    //                   headerName: "Project",
    //                   field: "project",
    //                   filter: "agTextColumnFilter",
    //                   headerTooltip: "Project",
    //                   width: 100,
    //                   editable: false,
    //                 },
    //                 {
    //                   headerName: "Customer",
    //                   field: "customer",
    //                   filter: "agTextColumnFilter",
    //                   headerTooltip: "Customer",
    //                   width: 100,
    //                   editable: false,
    //                 },
    //               )
    //             }
    //           }
    //           else {
    //             this.spinner.hide();
    //           }
    //         },
    //         (err) => {
    //           this.spinner.hide();
    //         })
    //     }
    //     else {
    //       this.spinner.hide();
    //     }
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   })

    // this.http.get<any>("http://localhost:3000/MrpData").subscribe(res => {
    // this.adminService.getMrpList(data).subscribe(




  }

  MRPForm(form: NgForm) {
    if (form.valid) {
      const data = {
        mrpName: this.mrpName,
        plantName: this.plantName,
        revision: this.revision,
        status: this.selectedStatus
      }
    }
  }

  deleteDocument(value: any) {
    this.MrpData.splice(value.data);
    this.rowData = this.MrpData;
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
    this.getImportSummaryList();
  }

  getImportSummaryList() {
    this.spinner.show();
    const data = {
      FileType: "MRP"
    }

    this.adminService.importSummaryList(data).subscribe((res) => {
      if (res) {
        if (res.Response) {
          //     this.notifier.notify("No Data Available ", 1);
          this.mrpImport = [];
          this.spinner.hide();
        }
        else {
          this.mrpImport = res.List;
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
      this.adminService.ImportFile(this.fileList[0], 'MRP').subscribe(
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

  onCellClicked(event) {
    if (event !== null &&
      event !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.headerName !== null &&
      event.colDef.headerName !== undefined &&
      event.colDef.headerName === "Action") {
      this.mrpViewClicked = true;

      const data = {
        PageCriteria: {
          PageNumberToFetch: 1,
          PageSize: 100
        },
        Revision: event.data.Revision,
        StartMonth: event.data.Month,
        StartYear: event.data.year
      }
      this.spinner.show();
      this.adminService.getMrpDetailData(data).subscribe(
        (res) => {
          if (res) {
            if (res.message || res.Message) {
              this.MrpData = [];
              this.notifier.notify(res.message, 1);
              this.spinner.hide();
            }
            else {
              this.MrpData = res;
              this.columnDefs = MRPColumnDefs();
              let dateList = [];
              let date = new Date();
              const datepipe: DatePipe = new DatePipe("en-US");
              let start_date = datepipe.transform(new Date(), "dd/MM/yyyy");
              const start = start_date.split("/");
              let endYear;
              let endMonth
              let startYear = start[2];
              let startMonth = start[1];
              if (start[1] === "01") {
                endMonth = 12
                endYear = +startYear;
              }
              else if (start[1] === "12") {
                endMonth = 11
                endYear = +startYear + 1;
              }
              else {
                endYear = +startYear + 1;
                endMonth = +startMonth - 1;
              }
              dateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, endMonth, +start[0])));

              if (this.columnDefs !== null &&
                this.columnDefs !== undefined) {
                if (this.plantList !== null &&
                  this.plantList !== undefined &&
                  this.plantList.length > 0) {
                  this.plantList.forEach((colDef) => {

                    let plantName = colDef.PlantCode + "-" + colDef.PlantName
                    const column = {
                      headerName: plantName,
                      // headerClass: (params) => {
                      //   for (let i = 0; i <= this.plantList.length; i++) {
                      //     let list=params.colDef.headerName.split("-");
                      //     if(this.plantList[i].PlantCode ===list[0] ){
                      //       if(i %2 ===0){
                      //         return "rag-2002"
                      //       }
                      //       else{
                      //         return "rag-2007"
                      //       }
                      //     }
                      //   }
                      // },
                      headerClass: (params) => {
                        if (params !== null &&
                          params !== undefined &&
                          params.colDef !== null &&
                          params.colDef !== undefined

                        ) {
                          if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2001")
                          ) {
                            
                            return "rag-2001"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2002")
                          ) {
                            return "rag-2002"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2003")
                          ) {
                            return "rag-2003"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2004")
                          ) {
                            return "rag-2004"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2005")
                          ) {
                            return "rag-2005"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2006")
                          ) {
                            return "rag-2006"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2007")
                          ) {
                            return "rag-2007"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2009")
                          ) {
                            return "rag-2009"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2010")
                          ) {
                            return "rag-2010"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2012")
                          ) {
                            return "rag-2012"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2015")
                          ) {
                            return "rag-2015"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2018")
                          ) {
                            return "rag-2018"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2019")
                          ) {
                            return "rag-2019"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2022")
                          ) {
                            return "rag-2022"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2025")
                          ) {
                            return "rag-2025"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2051")
                          ) {
                            return "rag-2051"
                          }
                          else if (
                            params.colDef.headerName !== null &&
                            params.colDef.headerName !== undefined &&
                            params.colDef.headerName.includes("2053")
                          ) {
                            return "rag-2053"
                          }
                          else {
                            return "rag-any"
                          }
                        }
                      },
                      children: [
                      ]
                    }

                    dateList.forEach((element) => {
                      const elementArr = element.split("-");
                      let key = null;
                      // const yearCount = new Date(elementArr[0], elementArr[1], 1).toLocaleDateString('en', {year: '2-digit'})
                      const yearCount = elementArr[0].substring(2, 4);
                      // key =this.months[+elementArr[1]]+ "_" +yearCount;
                      const col = {
                        headerName: this.monthList[+elementArr[1]] + "-" + yearCount,
                        // field:plantName,
                        field: colDef.PlantCode + "_" + this.months[+elementArr[1]] + "_" + yearCount,
                        //   field: colDef.PlantCode + "_" + this.months[+elementArr[1]] + "_" + yearCount,
                        width: 100,
                        suppressSizeToFit: true,
                        // headerClass: (params) => {
                        //   for (let i = 0; i <= this.plantList.length; i++) {
                        //     let list=params.colDef.field.split("_");
                        //     if(this.plantList[i].PlantCode ===list[0] ){
                        //       if(i %2 ===0){
                        //         return "rag-2002"
                        //       }
                        //       else{
                        //         return "rag-2007"
                        //       }
                        //     }

                        //   }
                        // },
                        //   headerClass: 'text-center',
                        headerClass: (params) => {
                          if (params !== null &&
                            params !== undefined &&
                            params.colDef !== null &&
                            params.colDef !== undefined

                          ) {
                            if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2001")
                            ) {
                              return "rag-2001"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2002")
                            ) {
                              return "rag-2002"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2003")
                            ) {
                              return "rag-2003"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2004")
                            ) {
                              return "rag-2004"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2005")
                            ) {
                              return "rag-2005"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2006")
                            ) {
                              return "rag-2006"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2007")
                            ) {
                              return "rag-2007"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2009")
                            ) {
                              return "rag-2009"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2010")
                            ) {
                              return "rag-2010"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2012")
                            ) {
                              return "rag-2012"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2015")
                            ) {
                              return "rag-2015"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2018")
                            ) {
                              return "rag-2018"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2019")
                            ) {
                              return "rag-2019"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2022")
                            ) {
                              return "rag-2022"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2025")
                            ) {
                              return "rag-2025"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2051")
                            ) {
                              return "rag-2051"
                            }
                            else if (
                              params.colDef.field !== null &&
                              params.colDef.field !== undefined &&
                              params.colDef.field.includes("2053")
                            ) {
                              return "rag-2053"
                            }
                            else {
                              return "rag-any"
                            }
                          }
                        },
                        cellStyle: {
                          textAlign: 'right'
                        },
                        // cellStyle: {
                        //   textAlign: 'center',
                        //   headerClass: 'grid-cell-centered ',
                        // },
                        valueFormatter: dollerFormatter,
                      };
                      column.children.push(col)

                    });

                    this.columnDefs.push(column);

                  })

                  // const totalColumn = {
                  //   headerName: "Total",
                  //   headerClass :(params)=>{
                  //     console.log(params)
                  //     if(params !== null &&
                  //       params !== undefined &&
                  //       params.colDef !==  null && 
                  //       params.colDef !== undefined &&
                  //       params.colDef.headerName !== null &&
                  //       params.colDef.headerName !== undefined &&
                  //       params.colDef.headerName === "Total"
                  //       ){
                  //         return "rag-2053"
                  //       }
                  //   },
                  //   children:[]     
                  // }

                  // dateList.forEach((element)=>{
                  //   const elementArr = element.split("-");
                  //   let key = null;
                  //   // const yearCount = new Date(elementArr[0], elementArr[1], 1).toLocaleDateString('en', {year: '2-digit'})
                  //   const yearCount = elementArr[0].substring(2, 4);
                  //   // key =this.months[+elementArr[1]]+ "_" +yearCount;
                  //   const col = {
                  //     headerName: this.monthList[+elementArr[1]],
                  //     // field:plantName,
                  //     field: "_" + this.months[+elementArr[1]] + "_" + yearCount,
                  //     //   field: colDef.PlantCode + "_" + this.months[+elementArr[1]] + "_" + yearCount,
                  //     width: 100,
                  //     suppressSizeToFit: true,
                  //     // headerClass: 'text-center',
                  //     headerClass :(params)=>{
                  //       console.log(params)
                  //       if(params !== null &&
                  //         params !== undefined &&
                  //         params.colDef !==  null && 
                  //         params.colDef !== undefined 
                  //         // &&
                  //         // params.colDef.headerName !== null &&
                  //         // params.colDef.headerName !== undefined &&
                  //         // (params.colDef.headerName === "Jan" ||
                  //         // params.colDef.headerName === "Feb" ||
                  //         // params.colDef.headerName === "Mar" ||
                  //         // params.colDef.headerName === "Apr" ||
                  //         // params.colDef.headerName === "May" ||
                  //         // params.colDef.headerName === "June" || 
                  //         // params.colDef.headerName === "July" ||
                  //         // params.colDef.headerName === "Aug" ||
                  //         // params.colDef.headerName === "Sep"||
                  //         // params.colDef.headerName === "Oct" ||
                  //         // params.colDef.headerName === "Nov" ||
                  //         // params.colDef.headerName === "Dec")
                  //         ){
                  //           return "rag-2053"
                  //         }
                  //     },
                  //   };
                  //   totalColumn.children.push(col)
                  // })
                  // this.columnDefs.push(totalColumn);
                }
              }
              this.spinner.hide();
            }
          }
          else {
            this.notifier.notify("Data Not Found", 1);
            this.spinner.hide()
          }
        },
        (err) => {
          this.MrpData = [];
          this.notifier.notify("Data Not Found", 1);
          this.spinner.hide();
          //this.notifier.notify(err.message, 4);
        })


    }
  }

}

function dateRange(startDate, endDate) {
  const start = startDate.split("-");
  const end = endDate.split("-");
  let startMonth = start[1];
  let startYear = parseInt(start[0]);
  const endYear = parseInt(end[0]);
  if (start[1] === '00') {
    startMonth = '12';
    startYear = parseInt(start[0]) - 1;
  }

  const dates = [];
  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYear ? parseInt(startMonth) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth, "01"].join("-"));
    }
  }
  return dates;
}

function MRPColumnDefs() {
  return [
    // {
    //   headerName: "Date",
    //   field: "date",
    //   filter: false,
    //   headerTooltip: "Date",
    //   width: 100,
    //   editable: false,
    //   headerClass: 'text-center',
    // },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 130,
      editable: false,
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
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Supplier Name",
      field: "SupplierName",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 150,
      editable: false,
      headerClass: 'text-center',

    },
    {
      headerName: "Buyer Code",
      field: "BuyerCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Buyer Code",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      // cellStyle: {
      //   textAlign: 'right'
      // },
    },
    {
      headerName: "Buyer Name",
      field: "BuyerName",
      filter: "agTextColumnFilter",
      headerTooltip: "Buyer Name",
      width: 150,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Map",
      field: "Map",
      filter: "agTextColumnFilter",
      headerTooltip: " Map",
      width: 150,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Unit",
      field: "Unit",
      filter: "agTextColumnFilter",
      headerTooltip: " Unit",
      width: 100,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Customer",
      field: "Customer",
      // filter: "agTextColumnFilter",
      headerTooltip: " Customer",
      width: 200,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Project",
      field: "Project",
      filter: "agTextColumnFilter",
      headerTooltip: "Project",
      width: 200,
      editable: false,
      headerClass: 'text-center',
    },

    // {
    //   headerName: "Plant",
    //   field: "PlantCode",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Plant",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "PlantCode",
    //   // field:"PlantCode"
    //   children: [
    //     {
    //       headerName: "sep",
    //       field: "sep"
    //     },
    //     {
    //       headerName: "oct",
    //       field: "oct"
    //     },
    //     {
    //       headerName: "Nov",
    //       field: "nov"
    //     },
    //     {
    //       headerName: "Dec",
    //       field: "dec"
    //     }
    //   ]
    // },
    // {
    //   headerName: "PlantCode",
    //   // field:"PlantCode"
    //   children: [
    //     {
    //       headerName: "sep",
    //       field: "sep"
    //     },
    //     {
    //       headerName: "oct",
    //       field: "oct"
    //     },
    //     {
    //       headerName: "Nov",
    //       field: "nov"
    //     },
    //     {
    //       headerName: "Dec",
    //       field: "dec"
    //     }
    //   ]
    // }



    // {
    //   headerName: "Description",
    //   field: "description",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Description",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Jan ",
    //   field: "M1",
    //   filter: false,
    //   headerTooltip: "Jan",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Feb ",
    //   field: "M2",
    //   filter: false,
    //   headerTooltip: "Feb",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "March",
    //   field: "M3",
    //   filter: false,
    //   headerTooltip: "March",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "April ",
    //   field: "M4",
    //   filter: false,
    //   headerTooltip: "April",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "May ",
    //   field: "M5",
    //   filter: false,
    //   headerTooltip: "May",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "June ",
    //   field: "M6",
    //   filter: false,
    //   headerTooltip: "June",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "July ",
    //   field: "M7",
    //   filter: false,
    //   headerTooltip: "July",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Aug  ",
    //   field: "M8",
    //   filter: false,
    //   headerTooltip: "Aug",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Sept ",
    //   field: "M9",
    //   filter: false,
    //   headerTooltip: "Sept",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Oct ",
    //   field: "M10",
    //   filter: false,
    //   headerTooltip: "Oct",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Nov",
    //   field: "M11",
    //   filter: false,
    //   headerTooltip: "Nov",
    //   width: 100,
    //   editable: false,
    // },
    // {
    //   headerName: "Dec ",
    //   field: "M12",
    //   filter: false,
    //   headerTooltip: "Dec",
    //   width: 100,
    //   editable: false,
    // },
  ]

}


function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth());
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
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