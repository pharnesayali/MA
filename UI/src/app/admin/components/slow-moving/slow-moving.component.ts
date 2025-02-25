import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-slow-moving',
  templateUrl: './slow-moving.component.html',
  styleUrls: ['./slow-moving.component.scss']
})
export class SlowMovingComponent implements OnInit {
  
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  SlowMovingList: any;
  slowMovingList: any;
  updatedDate = new Date();
  fileUploadedList: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.SlowMovingList = [];
    this.fileUploadedList=[];
    this.updatedDate =new Date();
  }
  columnDefs = [
    {
      headerName: "Material Number",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Material Number",
      width: 150,
      cellStyle: {
        textAlign: 'right'
      },
      headerClass: 'text-center',
    },
    {
      headerName: "Maker Part Number",
      field: "MakerPartNumber",
      filter: false,
      headerTooltip: "Maker Part Number",
      headerClass: 'text-center',
      width: 150,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Supplier Name",
      field: "SupplierName",
      // filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      headerClass: 'text-center',
      width: 170,
    },
    {
      headerName: "Unit Price",
      field: "RatePerUnit",
      // filter: "agTextColumnFilter",
      headerTooltip: "Unit Price",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Unrestricted",
      field: "Unrestricted",
      // filter: "agTextColumnFilter",
      headerTooltip: "Unrestricted",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "In Qality Insp",
      field: "InQualityInsp",
      // filter: "agTextColumnFilter",
      headerTooltip: "In Qality Insp",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Transit Stock",
      field: "InTransitStock",
      // filter: "agTextColumnFilter",
      headerTooltip: "Transit Stock",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Total Qty",
      field: "total_stock",
      // filter: "agTextColumnFilter",
      headerTooltip: "Total Qty",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Value Unrestricted",
      field: "total_value",
      // filter: "agTextColumnFilter",
      headerTooltip: "Value Unrestricted",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    // {
    //   headerName: "SLOC",
    //   field: "sloc",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "SLOC",
    //   headerClass: 'text-center',
    //   width: 170,
    // },
    {
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      headerClass: 'text-center',
      width: 130,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "MRP - 6 Months",
      field: "MRP_sixmon",
      // filter: "agTextColumnFilter",
      headerTooltip: "MRP - 6 Months",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'},
      valueFormatter : decimalFormatter
    },
    {
      headerName: "Moving Parts",
      field: "Moving",
      // filter: "agTextColumnFilter",
      headerTooltip: "Moving Parts",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Slow Moving ",
      field: "slow_moving",
      // filter: "agTextColumnFilter",
      headerTooltip: "Slow Moving",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Non-Moving ",
      field: "non_moving",
      // filter: "agTextColumnFilter",
      headerTooltip: "Non-Moving",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
    {
      headerName: "Running Parts Value ",
      field: "moving_value",
      // filter: "agTextColumnFilter",
      headerTooltip: "Running Parts Value ",
      headerClass: 'text-center',
      width: 160,
      cellStyle: {textAlign: 'right'},
      valueFormatter: dollerFormatter,

    },
    {
      headerName: "Slow Moving Value ",
      field: "slow_moving_value",
      // filter: "agTextColumnFilter",
      headerTooltip: "Slow Moving Value",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'},
      valueFormatter: dollerFormatter,
    },
    {
      headerName: "Non Moving Value ",
      field: "non_moving_value",
      // filter: "agTextColumnFilter",
      headerTooltip: "Non Moving Value",
      headerClass: 'text-center',
      width: 140,
      cellStyle: {textAlign: 'right'}
    },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getSlowMovingList();
    this.getFileUploadedDetails();
  }

  getFileUploadedDetails(){
    // this.adminService.getFileUploadedDate().subscribe(
    //   (res)=>{
    //    if(res){
    //     this.fileUploadedList= res.Result.Result;
    //    }
    //   }
    // )
    
    this.adminService.getFileUploadedDate().subscribe(
      (res)=>{
        
      if(res){
       this.fileUploadedList =res.Result.Result;
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "slow-moving")
        {
         
          this.updatedDate = element.Date;
        }
       });
       
       
      }
     })
  }

  getSlowMovingList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getSlowMovingList ().subscribe(
      res => {
        if (res) {
          if(res.Message){
          //  this.notifier.notify(res.Message,1);
            this.slowMovingList=[];
            this.spinner.hide();
          }
          else{
            this.slowMovingList=res.Result;  
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


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getData() {
    this.uploadedDate = new Date();
    $(".GNR,.common-bg").show();
    document.getElementById('last-updated-slow-moving-data').style.display = 'block';
  }

  closeModal() {
    $(".GRN, .common-bg").hide();
    document.getElementById('last-updated-slow-moving-data').style.display = 'none';
  }

}

function dollerFormatter(params) {
  if (params.value === undefined || null) {
    return params.value = 0;
  } else {
    if (params.value < 0) {
      return "" + formatNumber(params.value ) + "";
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

function decimalFormatter(params){
  if (params.value === undefined || null) {
    return params.value = 0;
  } else {
    if (params.value < 0) {
      return "" + formatdecimalNumber(params.value ) + "";
    } else {
      return "" + formatdecimalNumber(params.value);
    }
  }
}

function formatdecimalNumber(num: number) {
  if (+num % 1 !== 0) {
    return Number(num)
      .toFixed(0)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return Number(num)
      .toFixed(0)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}