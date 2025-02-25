import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
declare var $: any;
@Component({
  selector: 'app-stock-past-data',
  templateUrl: './stock-past-data.component.html',
  styleUrls: ['./stock-past-data.component.scss']
})
export class StockPastDataComponent implements OnInit {
  uploadedDate: Date;
  fileUploadedList: any;
  fromDate: any;
  toDate: any;
  updatedDate:Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  stockData :any;
  selectedMode:any;
  selectionList=[
    {
      id:1,
      selectionName :"Daily"
    },
    {
      id:2,
      selectionName :"Week"
    },
    {
      id:3,
      selectionName :"Month"
    }

  ]
  constructor(
    private router: Router,
    private http: HttpClient,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private datepipe: DatePipe,
  ) { 
    this.fileUploadedList=[];
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    let fromDates = new Date(new Date().setDate(new Date().getDate() - 1));
    this.fromDate = this.datepipe.transform(fromDates, 'yyyy-MM-dd');
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.stockData=[];
   // this.rowSelectionMultiple = "multiple";
  }

  columnDefs = [
    // {
    //   headerName: "",
    //   field: "id",
    //   filter:false,
    //   width: 70,
    //   editable: false,
    //   enableRowGroup: true,
    //   checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Cde",
      width: 150,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      //  checkboxSelection: true,
      // cellRenderer: CheckBoxRenderer
    },
    {
      headerName: "Item Description",
      field: "Description",
      filter: false,
      headerTooltip: "Item Description",
      width: 350,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      //  checkboxSelection: true,
      // cellRenderer: CheckBoxRenderer
    },
    {
      headerName: "Plant ",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      //   checkboxSelection: true,
      // cellRenderer: CheckBoxRenderer
    },
    {
      headerName: "Unrestricted ",
      field: "Unrestricted",
      filter: "agTextColumnFilter",
      headerTooltip: "Unrestricted",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Storage Location",
      field: "SLOC",
      headerTooltip: "Storage Location",
      filter: "agTextColumnFilter",
      width: 100,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      // checkboxSelection: true,
      // cellRenderer: CheckBoxRenderer
    },

    // {
    //   headerName: "Unrestricted",
    //   field: "unrestricted",
    //   filter: false,
    //   headerTooltip: "Unrestricted",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   // checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    // {
    //   headerName: "Value Unrestricted",
    //   field: "value_unrestricted",
    //   filter: false,
    //   headerTooltip: "Value Unrestricted",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   //checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    // {
    //   headerName: "In Quality Insp",
    //   field: "in_quality_insp",
    //   filter: false,
    //   headerTooltip: "In Quality Insp",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   //  checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    // {
    //   headerName: "Value in Quality Insp",
    //   field: "value_in_quality_insp",
    //   filter: false,
    //   headerTooltip: "Value In Quality Insp",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   //  checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    // {
    //   headerName: "Value GR Blocked St",
    //   field: "value_gr_blocked_st",
    //   filter: false,
    //   headerTooltip: "Value GR Blocked St",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   // checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
    {
      headerName: "In Quality Insp.",
      field: "InQualityInsp",
      filter: false,
      headerTooltip: "In Quality Insp.",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Stock In Transit",
      field: "StoreStock",
      filter: false,
      headerTooltip: "Stock In Transit",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      cellStyle: {
        textAlign: 'right'
      }
      //   checkboxSelection: true,
      // cellRenderer: CheckBoxRenderer
    },
    // {
    //   headerName: "Value In Transit",
    //   field: "value_in_transit",
    //   filter: false,
    //   headerTooltip: "Value In Transit",
    //   width: 100,
    //   editable: false,
    //   enableRowGroup: true,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    //   //  checkboxSelection: true,
    //   // cellRenderer: CheckBoxRenderer
    // },
  ]

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }


  ngOnInit(): void {
    this.getFileUploadedDetails();
    this.getStockData()
  };

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "Stock") {
              this.updatedDate = element.Date;
            }
          });
        }
      })
  }
  
  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".stock, .common-bg").show();
    document.getElementById('last-updated-order-generation-data').style.display = 'block';
  }

  closeModal() {
    $(".stock, .common-bg").hide();
    document.getElementById('last-updated-order-generation-data').style.display = 'none';
  }

  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
  }

  getStockData() {
    this.spinner.show();
    // const data = {
    //   PageCriteria: {
    //     PageNumberToFetch: 0,
    //     PageSize: 100
    //   },
    //   PlantCode: "",
    //   ItemCode: "",
    //   SupplierCode: ""
    // }

    const data =
    {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 100
      },
      ItemCode: "",
      PlantCode: "",
      SLOC: "",
      FromDate: this.fromDate,
      ToDate: this.toDate
        }

    this.adminService.getStockList(data).subscribe(
      (res) => {
        if (res) {
          if (res.Message || res.message) {
            this.stockData = [];
            //  this.notifier.notify("Data Not Found", 1);
            this.spinner.hide();
          }
          else {
            this.stockData = res.StockList;
            this.spinner.hide();
          }
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.stockData = [];
        this.spinner.hide();

        // this.notifier.notify("Data Not Found", 1);
      }
    );


  }

  reset(){
    this.fromDate=null;
    this.toDate=null;
  }

  apply(){
    this.getStockData();
  }

  changeSelection(){}
}
