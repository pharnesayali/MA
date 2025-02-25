import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-mrp-analysis-part-wise',
  templateUrl: './mrp-analysis-part-wise.component.html',
  styleUrls: ['./mrp-analysis-part-wise.component.scss']
})
export class MrpAnalysisPartWiseComponent implements OnInit {
  uploadedDate: Date;
  updatedDate = new Date();
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  MrpAnlyPartwiseList:any;
  fileUploadedList: any;
  itemCode:any;
  plantCode:any;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.MrpAnlyPartwiseList=[];
    this.fileUploadedList=[];
    this.itemCode=null;
    this.plantCode=null;
   }

   columnDefs =[
   
   ];

   defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getMrpAnlyPartwiseList();
    this.getFileUploadedDetails();
  }

  getFileUploadedDetails(){
    this.adminService.getFileUploadedDate().subscribe(
      (res)=>{
       if(res){
        this.fileUploadedList= res.Result.Result;
       }
      }
    )
    
  
  }

  getMrpAnlyPartwiseList() {
    this.columnDefs =MRPAnalysisColDef();
      // this.spinner.show();
    // // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    // this.adminService.getMrpAnlyPartwiseList ().subscribe(
    //   res => {
    //     if (res) {
    //       if(res.Message){
    //         this.notifier.notify(res.Message,1);
    //         this.spinner.hide();
    //       }
    //       else{
    //         this.MrpAnlyPartwiseList=res.Result;  
    //         this.spinner.hide();
    //       }
    //       // this.plantDivisionList = res;
          
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
    document.getElementById('last-updated-MrpAnlypartwise-data').style.display = 'block';
  }
  
  closeModal(){
    document.getElementById('last-updated-MrpAnlypartwise-data').style.display = 'none';
  }
  apply(){}
  reset(){}

}

function MRPAnalysisColDef(){
  let date= new Date().getFullYear();
  console.log(date)
  return[
    // {
    //   headerName: "Month",
    //   field: "month",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Month",
    //   width: 170,
    //   cellStyle: {textAlign: 'center' },
    //   headerClass: 'text-center',
    // },
    {
      headerName: "Jan - "+date,
      field: "Jan-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Jan - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Feb - "+date,
      field: "Feb-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Feb - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Mar - "+date,
      field: "Mar-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Mar - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Apr - "+date,
      field: "Apr-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Apr - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "May - "+date,
      field: "May-22",
      // filter: "agTextColumnFilter",
      headerTooltip:  "May - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Jun - "+date,
      field: "Jun-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Jun - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "July - "+date,
      field: "july-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "July - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Aug - "+date,
      field: "Aug-22",
      // filter: "agTextColumnFilter",
      headerTooltip:  "Aug - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Sep - "+date,
      field: "Sep-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Sep - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Oct - "+date,
      field: "Oct-22",
      // filter: "agTextColumnFilter",
      headerTooltip: "Oct - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Nov - "+date,
      field: "Nov-22",
      // filter: "agTextColumnFilter",
      headerTooltip:  "Nov - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },{
      headerName: "Dec - "+date,
      field: "Dec-22",
     // filter: "agTextColumnFilter",
      headerTooltip: "Dec - "+date,
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Total",
      field: "Total",
  //    filter: "agTextColumnFilter",
      headerTooltip: "Total",
      width: 170,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Project",
      field: "Project",
      //filter: "agTextColumnFilter",
      headerTooltip: "Project",
      width: 250,
      cellStyle: {textAlign: 'center' },
      headerClass: 'text-center',
    },

  ]
}