import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-shortage-reports',
  templateUrl: './shortage-reports.component.html',
  styleUrls: ['./shortage-reports.component.scss']
})
export class ShortageReportsComponent implements OnInit {
  uploadedDate: Date;
  updatedDate = new Date();
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  ShortageReport:any;
  fileUploadedList: any;


  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) { 
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.ShortageReport = [];
    this.fileUploadedList=[];
    
  }
 
  columnDefs =[
    {
      headerName: "Alternate Part",
      field: "alternate_part",
      headerTooltip: "Alternate Part",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Code",
      field: "item_code",
      headerTooltip: "Item Code",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Trim",
      field: "trim",
      headerTooltip: "Trim",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Description",
      field: "description",
      headerTooltip: "Description",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "UOM",
      field: "UOM",
      headerTooltip: "UOM",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Supplier",
      field: "supplier",
      headerTooltip: "Supplier",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Buyers",
      field: "buyers",
      headerTooltip: "Buyers",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Current Inventory",
      field: "current_inventory",
      headerTooltip: "Current Inventory",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Max Designed Inventory",
      field: "max-designed_inventory",
      headerTooltip: "Max Designed Inventory",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "MOQ",
      field: "MOQ",
      headerTooltip: "MOQ",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "SS+BS",
      field: "SS+BS",
      headerTooltip: "SS+BS",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Rate",
      field: "Rate",
      headerTooltip: "Rate",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Value",
      field: "value",
      headerTooltip: "Value",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Shortage Week",
      field: "shortage_week",
      headerTooltip: "Shortage Week",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Line Stoppage   Week",
      field: "Line_Stoppage_Week",
      headerTooltip: "Line Stoppage   Week",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "jul-22",
      field: "jul-22",
      headerTooltip: "jul-22",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Per Day",
      field: "Per_Day",
      headerTooltip: "Per Day",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Stores Stock",
      field: "Stores_Stock",
      headerTooltip: "Stores Stock",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Bhiwadi Stock",
      field: "Bhiwadi_Stock",
      headerTooltip: "Bhiwadi Stock",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Interplant Transit - IDBG",
      field: "Interplant_Transit_IDBG",
      headerTooltip: "Interplant Transit - IDBG",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Interplant Transit - Bhwadi - YNA/YBL",
      field: "Interplant_Transit_Bhiwadi_YNA/YBL",
      headerTooltip: "Interplant Transit - Bhwadi - YNA/YBL",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Total",
      field: "total",
      headerTooltip: "Total",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Days Cov as per Dec MRP",
      field: "Days_Cov_as_per_Dec_MRP",
      headerTooltip: "Days Cov as per Dec MRP",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Shoratge date as per MRP",
      field: "Shoratge_date_as_per_MRP",
      headerTooltip: "Shoratge date as per MRP",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Shortage Wk",
      field: "Shortage_Wk",
      headerTooltip: "Shortage Wk",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Qty",
      field: "Qty",
      headerTooltip: "Qty",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Expected Arrival Date",
      field: "Expected_Arrival_Date",
      headerTooltip: "Expected Arrival Date",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Job No /AWB",
      field: "Job No /AWB",
      headerTooltip: "Job No /AWB",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Shortage updates",
      field: "Shortage_updates",
      headerTooltip: "Shortage updates",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Remark Reason",
      field: "Remark_Reason",
      headerTooltip: "Remark Reason",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Critical Status",
      field: "Critical_Status",
      headerTooltip: "Critical Status",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Catogory",
      field: "catogory",
      headerTooltip: "Catogory",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    ]


    defaultColDef = {
      sortable: true,
      resizable: true,
    };

  ngOnInit(): void {
    this.getShortageReport();
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
    
    this.adminService.fileUploadedList.subscribe(
      (res)=>{
        console.log("order",res);
        
      if(res){
       this.fileUploadedList = res;
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "shortage")
        {
         
          this.updatedDate = element.Date;
        }
       });
       
       
      }
     })
  }

  getShortageReport() {
      // this.spinner.show();
    // // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    // this.adminService.getShortageReport().subscribe(
    //   res => {
    //     if (res) {
    //       if(res.Message){
    //         this.notifier.notify(res.Message,1);
    //         this.spinner.hide();
    //       }
    //       else{
    //         this.ShortageReport=res.Result;  
    //         this.spinner.hide();
    //       }
    //       
          
    //     }
    //     else {
    //       this.spinner.hide();
    //     }
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     this.notifier.notify(err.message, 4);
    //   })
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   }

  getData(){
    this.uploadedDate = new Date();
    document.getElementById('last-updated-Shortage-Report-data').style.display = 'block';
  }
  
  closeModal(){
    document.getElementById('last-updated-Shortage-Report-data').style.display = 'none';
  }

}
