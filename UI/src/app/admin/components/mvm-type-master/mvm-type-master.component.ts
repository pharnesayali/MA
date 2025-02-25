import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-mvm-type-master',
  templateUrl: './mvm-type-master.component.html',
  styleUrls: ['./mvm-type-master.component.scss']
})
export class MvmTypeMasterComponent implements OnInit {
  updatedDate: Date;
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  mvmList: any;
  fileUploadedList: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
    // this.updatedDate = new Date;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.mvmList = [];
    this.fileUploadedList=[];
  }
  columnDefs = [
    {
      headerName: "Movement Type",
      field: "TypeCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Movement Type",
      headerClass: 'text-center',
      width: 170,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Movement Type Text",
      field: "Description",
      filter: "agTextColumnFilter",
      headerTooltip: "Movement Type Text",
      headerClass: 'text-center',
      width: 200,

    },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getmvmList();
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
        console.log("order",res);
        
      if(res){
       this.fileUploadedList =  res.Result.Result;
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "mvm-type")
        {
         
          this.updatedDate = element.Date;
        }
       });
       
       
      }
     })
  }

  getmvmList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getMvmData().subscribe(
      res => {
        if (res) {
         if(res.Message){
       //   this.notifier.notify(res.Message, 1);
          this.mvmList = []
          this.spinner.hide();
         }
         else{
          this.mvmList = res.Result;
          this.getFileUploadedDetails();
          this.spinner.hide();
         }
        }
        else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
     //   this.notifier.notify(err.message, 4);
      })
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getData() {
    this.uploadedDate = new Date();
    $(".GRN,.common-bg").show();
    document.getElementById('last-updated-mvm-data').style.display = 'block';
  }

  closeModal() {
    $(".GRN, .common-bg").hide();
    document.getElementById('last-updated-mvm-data').style.display = 'none';
  }

}
