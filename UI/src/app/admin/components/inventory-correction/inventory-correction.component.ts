import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
declare var $: any;
@Component({
  selector: 'app-inventory-correction',
  templateUrl: './inventory-correction.component.html',
  styleUrls: ['./inventory-correction.component.scss']
})
export class InventoryCorrectionComponent implements OnInit {
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  InventoryCorrectionList: any[];
  fromDate: any;
  toDate: any;
  fileUploadedList:any;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
    private datepipe: DatePipe
  ) 
  {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.InventoryCorrectionList = [];
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    let fromDates = new Date(new Date().setDate(new Date().getDate() - 1));
    this.fromDate = this.datepipe.transform(fromDates, 'yyyy-MM-dd');
    this.fileUploadedList=[]
  }

  columnDefs = [
    {
      headerName: "Material Document",
      field: "DocumentNo",
      filter: "agTextColumnFilter",
      headerTooltip: "Material Document",
      width: 150,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Posting Date",
      field: "PostingDate",
      filter: false,
      headerTooltip: "Posting Date",
      width: 170,
      cellStyle: {textAlign: 'center' },
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
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 120,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "SLOC",
      field: "SLOC",
      filter: false,
      headerTooltip: "SLOC",
      width: 120,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "MVT",
      field: "Mvt",
      filter: false,
      headerTooltip: "MVT",
      width: 120,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 170,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Description",
      field: "Description",
      filter: false,
      headerTooltip: "Material Description",
      width: 170,
     // cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Quantity",
      field: "Quantity",
      filter: false,
      headerTooltip: "Quantity",
      width: 120,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "EVN",
      field: "EUn",
      filter: false,
      headerTooltip: "EVN",
      width: 120,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Amount LC",
      field: "AmountLLC",
      filter: false,
      headerTooltip: "Amount LC",
      width: 170,
      cellStyle: {textAlign: 'right' },
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
    },
  ];
  defaultColDef = {
    sortable: true,
    resizable: true,
  };


  ngOnInit(): void {
    this.getInventoryCorrectionList();
    this.getFileUploadedDetails();

  }
  getInventoryCorrectionList() {
     this.spinner.show();
     this.fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
     this.toDate = this.datepipe.transform( this.toDate, 'yyyy-MM-dd');
     const data = {
 
       PageCriteria: {
         PageNumberToFetch: 1,
         PageSize: 10
       },
       StartDate: this.fromDate,
       EndDate: this.toDate
 
     }
    // // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getInventoryCorrectionList(data).subscribe(
      res => {
        if (res) {
          if(res.Message){
            this.InventoryCorrectionList=[];
         //   this.notifier.notify(res.Message,1);
            this.spinner.hide();
          }
          else{
            this.InventoryCorrectionList=res.Result;  
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
        this.notifier.notify(err.message, 4);
      })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   }

  getData(){
    // this.uploadedDate = new Date();
    $(".last-updated-item-consumption-data, .common-bg").show();
    document.getElementById('inventory-correction').style.display = 'block';
  }
  
  closeModal(){
    document.getElementById('inventory-correction').style.display = 'none';
    $(".last-updated-item-consumption-data, .common-bg").hide();
  }

  reset() {
    this.fromDate = null;
    this.toDate = null;
  }

  apply() {
    this.getInventoryCorrectionList();
  }

  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
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
       this.fileUploadedList = res.Result.Result;
      //  this.fileUploadedList.forEach(element => {
      //   if(element.FileType=== "GRN")
      //   {
         
      //     this.updatedDate = element.Date;
      //   }
      //  });
       
       
      }
     })
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