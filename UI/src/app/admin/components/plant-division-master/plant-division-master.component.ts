import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-plant-division-master',
  templateUrl: './plant-division-master.component.html',
  styleUrls: ['./plant-division-master.component.scss']
})
export class PlantDivisionMasterComponent implements OnInit {
  updatedDate: Date;
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  plantDivisionList: any;
  fileUploadedList: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
 //   this.updatedDate = new Date;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.plantDivisionList = [];
    this.fileUploadedList=[];
  }
  columnDefs = [
    {
      headerName: "Division",
      field: "Zone",
      filter: "agTextColumnFilter",
      headerTooltip: "Division",
      width: 170,
      cellStyle: {
        textAlign: 'right'
      },
      headerClass: 'text-center',
    },
    {
      headerName: "Plant Code",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      headerClass: 'text-center',
      width: 170,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Plant Name",
      field: "PlantName",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      headerClass: 'text-center',
      width: 170,
     
    },
    {
      headerName: "Location",
      field: "Location",
      filter: false,
      headerTooltip: "Lcation",
      headerClass: 'text-center',
      width: 170,
      // cellStyle: {
      //   textAlign: 'center'
      // }
    },
    {
      headerName: "Remark",
      field: "Remark",
      filter: false,
      headerClass: 'text-center',
      headerTooltip: "Remark",
      width: 200,

    },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getPlantDivisionList();
    this.getFileUploadedDetails();
  }

  getFileUploadedDetails(){
    this.adminService.getFileUploadedDate().subscribe(
      (res)=>{       
      if(res){
       this.fileUploadedList = res.Result.Result;
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "plant-div")
        {
         
          this.updatedDate = element.Date;
        }
       });
      }
     })
  }

  getPlantDivisionList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getplantdivisionmasterdata().subscribe(
      res => {
        if (res) {
          this.plantDivisionList = res.Result;
          this.getFileUploadedDetails();
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
