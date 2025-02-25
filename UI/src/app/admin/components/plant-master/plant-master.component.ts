import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-plant-master',
  templateUrl: './plant-master.component.html',
  styleUrls: ['./plant-master.component.scss']
})
export class PlantMasterComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  gridOptions:any;
  headerHeight: number;
  rowHeight:number;
  rowSelection: string;
  gridApi:any;
  gridColumnApi:any;
  MRPName:any;
  frameworkComponents:any;
  Month:any;
  revision :any;
  plantName:any;
  rowGroupPanelShow: string;
  rowData:any;
  Status:any;
  selectedStatus:any
  zoneCode:any;
  zoneCodes:any;
  formData: FormData;
  uploadForm: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  mrpName:any;
  defaultColDef :any;
  columnDefs=[
    {
      headerName :"Zone",
      field: "zone",
      filter: "agTextColumnFilter",
      headerTooltip: "Zone",
      width: 250,
      editable:false,
    },
    {
      headerName :"Plant Code",
      field: "plant_code",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Plant Name",
      field: "plant_name",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Name",
      width: 250,
      enableRowGroup: true,
      editable:false,
    },
    {
      headerName :"Location",
      field: "location",
      filter: "agTextColumnFilter",
      headerTooltip: "location",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Remark",
      field: "remark",
      filter: "agTextColumnFilter",
      headerTooltip: "remark",
      width: 250,
      editable:false,
    },

  ];

  MrpData=[
    {
      zone: "Zone 1",
      plant_code :2001,
      plant_name :"YIPL MHP1",
      location:"Pune",
      remark:""
    },
    {
      zone: "Zone 2",
      plant_code :2002,
      plant_name :"YIPL MHP2",
      location:"Nashik",
      remark:""
    },
    {
      zone: "Zone 3",
      plant_code :2003,
      plant_name :"MHP2",
      location:"Pune",
      remark:""
    },
    {
      zone: "Zone 4",
      plant_code :2004,
      plant_name :"YIPL GJB",
      location:"Gujarat",
      remark:""
    },
    {
      zone: "Zone 5",
      plant_code :2005,
      plant_name :"MHP2",
      location:"Pune",
      remark:""
    },
    {
      zone: "Zone 6",
      plant_code :2006,
      plant_name :"YIPL GJB",
      location:"Pune",
      remark:""
    },
    {
      zone: "Zone 7",
      plant_code :2007,
      plant_name :"MHP2",
      location:"Wagholi",
      remark:""
    },
    {
      zone: "Zone 8",
      plant_code :2008,
      plant_name :"MHP2",
      location:"Gujarat",
      remark:""
    },
  ]
 
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   // this.gridOptions.api.addAggFunc("customizeAgg", rowGroupAggrigate);
  }
  constructor(
    private adminService:AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { 
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.adminService.deleteDocument$.subscribe((value) => {
      if (value) {
        this.deleteDocument(value);
      }
    });
    
    this.Status=[
      {
        id:1,
        name: "Weekly"
      },
      {
        id: 2,
        name :"Monthly"
      }
    ];

    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
  }


  ngOnInit(): void {
  }



  deleteDocument(value: any) {
   this.MrpData.splice(value.data);
   this.rowData =this.MrpData;
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
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
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.uploadForm.get("myfile").setValue(file);
      const filename = file.name;
      if (filename.includes(".csv")) {
        this.isCSV = true;
      } else {
        this.isCSV = false;
      }
      this.filename1 = filename;
      this.formData.append("file", file, filename);
      this.uploadForm.reset();
      this.myFIle.nativeElement.value = null;
      // event.target.files = [];
    }
  }

  UploadFile() {
    if (this.formData !== null && this.formData !== undefined) {
      this.hideImport();
      this.spinner.show();
   
    } else {
      this.isFileSelected = false;
    }
  }
}

