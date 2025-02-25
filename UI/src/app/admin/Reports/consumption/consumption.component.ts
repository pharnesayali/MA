import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
declare var $: any;
@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  ConsumptionList: any;
  fromDate: any;
  toDate: any;
  fileUploadedList:any;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
    private datepipe: DatePipe
  ) {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.ConsumptionList = [];
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    let fromDates = new Date(new Date().setDate(new Date().getDate() - 1));
    this.fromDate = this.datepipe.transform(fromDates, 'yyyy-MM-dd');
    this.fileUploadedList=[];
  }

  columnDefs = [
    {
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Document No",
      field: "DocumentNo",
      headerTooltip: "Document No",
      width: 140,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Decription",
      field: "MaterialDescription",
      headerTooltip: "Material Decription",
      width: 170,
     //cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Base Unit",
      field: "BaseUnit",
      headerTooltip: "Base Unit",
      width: 120,
     // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Conversion Unit",
      field: "ConversionUnit",
      headerTooltip: "Conversion Unit",
      width: 120,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Material Group",
      field: "MaterialGroup",
      headerTooltip: "Material Group",
      width: 120,
      //cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Material Group Description",
      field: "MaterialGroupDescr",
      headerTooltip: "Material Group Description",
      width: 190,
    //  cellStyle: { textAlign: 'center' },
   //   headerClass: 'text-center',
    },
    {
      headerName: "MRP Controller",
      field: "MRPController",
      headerTooltip: "MRP Controller",
      width: 170,
     //cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "MRP Controller Name",
      field: "MRPControllerName",
      headerTooltip: "MRP Controller Name",
      width: 150,
   //   cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Message",
      field: "Message",
      headerTooltip: "Message",
      width: 170,
  //    cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Posting Date",
      field: "PostingDate",
      headerTooltip: "Posting Date",
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
      headerName: "Base Quntity",
      field: "BaseQuantity",
      headerTooltip: "Base Quntity",
      width: 140,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "converted Quntity",
      field: "ConvertedQuantity",
      headerTooltip: "converted Quntity",
      width: 140,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getConsumptionList();
    this.getFileUploadedDetails()
  }
  getConsumptionList() {
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
    this.adminService.getConsumptionList(data).subscribe(
      res => {
        if (res) {
          if (res.Message) {
            this.ConsumptionList = [];
            // this.notifier.notify(res.Message,1);
            this.spinner.hide();
          }
          else {
            this.ConsumptionList = res.Result.Result;
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
      //  this.fileUploadedList.forEach(element => {
      //   if(element.FileType=== "MRP")
      //   {
         
      //     this.updatedDate = element.Date;
      //   }
      //  });
       
       
      }
     })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getData() {
    // this.uploadedDate = new Date();
    $(".last-updated-item-consumption-data, .common-bg").show();
    document.getElementById('last-updated-item-consumption-data').style.display = 'block';
  }

  closeModal() {
    document.getElementById('last-updated-item-consumption-data').style.display = 'none';
    $(".last-updated-item-consumption-data, .common-bg").hide();
  }

  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
  }

  reset() {
    this.fromDate = null;
    this.toDate = null;
  }

  apply() {
    this.getConsumptionList();
  }
}
