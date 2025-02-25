import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
declare var $: any;
let PAGESIZE = 100;

@Component({
  selector: 'app-grn-past-data',
  templateUrl: './grn-past-data.component.html',
  styleUrls: ['./grn-past-data.component.scss']
})
export class GrnPastDataComponent implements OnInit {

  context: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  formData: FormData;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  MRPName: any;
  frameworkComponents: any;
  Month: any;
  revision: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  uploadForm: any;
  GRNData: any;
  pageSize: number;
  paginationPageSize: number;
  updatedDate: Date;

  columnDefs = [
    {
      headerName: "Entry Date",
      field: "Entry_Date",
      filter: false,
      headerTooltip: "Entry Date",
      width: 150,
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
      headerName: "Material Document",
      field: "MaterialDocument",
      filter: false,
      headerTooltip: "Material Document",
      width: 170,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    // {
    //   headerName: "Posting Date",
    //   field: "PostingDate",
    //   filter: false,
    //   headerTooltip: "Posting Date",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Item Description",
      field: "description",
      filter: false,
      headerTooltip: "Item Description",
      width: 150,
      headerClass: 'text-center',
    },
    {
      headerName: "Invoice No.",
      field: "Grnnumber",
      filter: "agTextColumnFilter",
      headerTooltip: "Reference",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    // {
    //   headerName: "Document Date",
    //   field: "Document_date",
    //   filter: false,
    //   headerTooltip: "Document Date",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    {
      headerName: "Plant",
      field: "Plant",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    // {
    //   headerName: "Name 1",
    //   field: "Name_1",
    //   filter: false,
    //   headerTooltip: "Name 1",
    //   width: 100,
    // },
    {
      headerName: "Storage Location",
      field: "Storage_location",
      filter: "agTextColumnFilter",
      headerTooltip: "Storage Location",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Movement Type",
      field: "Movement_Type",
      filter: false,
      headerTooltip: "Movement Type",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: " Vendor",
      field: "Vendor",
      filter: false,
      headerTooltip: "vendor",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: " Material",
      field: "Material",
      filter: false,
      headerTooltip: "Material",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'center'
      }
    },
    // {
    //   headerName: " Material Description",
    //   field: "Material_Description",
    //   filter: false,
    //   headerTooltip: "Material Description",
    //   width: 100,
    // },
    // {
    //   headerName: "SubNumber  ",
    //   field: "SubNumber",
    //   filter: false,
    //   headerTooltip: "SubNumber",
    //   width: 100,
    // },
    {
      headerName: "Quantity ",
      field: "Quantity",
      filter: false,
      headerTooltip: "Quantity",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Amount In LC ",
      field: "AmountInLC",
      filter: false,
      headerTooltip: "Amount In LC",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
      valueFormatter: dollerFormatter,
    },
    {
      headerName: "Purchase Order",
      field: "Purchase_Order",
      filter: false,
      headerTooltip: "Purchase Order",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    // {
    //   headerName: "Special Stock",
    //   field: "Special_Stock",
    //   filter: false,
    //   headerTooltip: "Special Stock",
    //   width: 100,
    // },
    // {
    //   headerName: "Good Recipt/Issue Slip",
    //   field: "Good_Recipt/Issue_Slip",
    //   filter: false,
    //   headerTooltip: "Good Recipt/Issue Slip",
    //   width: 100,
    // },
    // {
    //   headerName: "Trans. / Event Type",
    //   field: "Trans. / Event Type",
    //   filter: false,
    //   headerTooltip: "Trans. / Event Type",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Time of Entry",
    //   field: "Time_of_Entry",
    //   filter: false,
    //   headerTooltip: "Time of Entry",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Username",
    //   field: "Username",
    //   filter: false,
    //   headerTooltip: "Username",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Movement Type Text",
    //   field: "MovementTypeText",
    //   filter: false,
    //   headerTooltip: "Movement Type Text",
    //   width: 100,
    // },
    // {
    //   headerName: "Material Doc. Item",
    //   field: "MaterialDocument",
    //   filter: false,
    //   headerTooltip: "Material Doc. Item",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "QTY In UN. Of Entry",
    //   field: "QTY_In_UN.Of_Entry",
    //   filter: false,
    //   headerTooltip: "QTY In UN. Of Entry",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Unit Of Entry",
    //   field: "Unit Of Entry",
    //   filter: false,
    //   headerTooltip: "Unit Of Entry",
    //   width: 100,
    // },
    // {
    //   headerName: "Routing Number For Operation",
    //   field: "Routing Number For Operation",
    //   filter: false,
    //   headerTooltip: "Routing Number For Operation",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Document Header Text",
    //   field: "Document Header Text",
    //   filter: false,
    //   headerTooltip: "Document Header Text",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Qty In OPUN",
    //   field: "Qty In OPUN",
    //   filter: false,
    //   headerTooltip: "Qty In OPUN",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Order Price Unit",
    //   field: "Order Price Unit",
    //   filter: false,
    //   headerTooltip: "Order Price Unit",
    //   width: 100,
    // },
    // {
    //   headerName: "Order Unit",
    //   field: "Order Unit",
    //   filter: false,
    //   headerTooltip: "Order Unit",
    //   width: 100,
    // },
    // {
    //   headerName: "Qty In Order Unit",
    //   field: "Qty In Order Unit",
    //   filter: false,
    //   headerTooltip: "Qty In Order Unit",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Batch",
    //   field: "Batch",
    //   filter: false,
    //   headerTooltip: "Batch",
    //   width: 100,
    // },
    // {
    //   headerName: "Smart Number",
    //   field: "Smart Number",
    //   filter: false,
    //   headerTooltip: "Smart Number",
    //   width: 100,
    // },
    // {
    //   headerName: "Item",
    //   field: "Item",
    //   filter: false,
    //   headerTooltip: "Item",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Movement Indicator",
    //   field: "Movement Indicator",
    //   filter: false,
    //   headerTooltip: "Movement Indicator",
    //   width: 100,
    // },
    // {
    //   headerName: "Consumption",
    //   field: "Consumption",
    //   filter: false,
    //   headerTooltip: "Consumption",
    //   width: 100,
    // },
    // {
    //   headerName: "Recipt Indicator",
    //   field: "Recipt Indicator",
    //   filter: false,
    //   headerTooltip: "Recipt Indicator",
    //   width: 100,
    // },
    // {
    //   headerName: "Base Unit of Measure",
    //   field: "Base Unit of Measure",
    //   filter: false,
    //   headerTooltip: "Base Unit of Measure",
    //   width: 100,
    // },
    // {
    //   headerName: "Material Doc. Year",
    //   field: "Material Doc. Year",
    //   filter: false,
    //   headerTooltip: "Material Doc. Year",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Network",
    //   field: "Network",
    //   filter: false,
    //   headerTooltip: "Network",
    //   width: 100,
    // },
    // {
    //   headerName: "WBE Element",
    //   field: "WBE Element",
    //   filter: false,
    //   headerTooltip: "WBE Element",
    //   width: 100,
    // },
    // {
    //   headerName: "Debit/Credit Ind",
    //   field: "Debit/Credit Ind",
    //   filter: false,
    //   headerTooltip: "Debit/Credit Ind",
    //   width: 100,
    // },
    // {
    //   headerName: "Currency",
    //   field: "Currency",
    //   filter: false,
    //   headerTooltip: "Currency",
    //   width: 100,
    // },
    // {
    //   headerName: "Original Line Item",
    //   field: "Original Line Item",
    //   filter: false,
    //   headerTooltip: "Original Line Item",
    //   width: 100,
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // },
    // {
    //   headerName: "Multiple Account Assignment",
    //   field: "Multiple Account Assignment",
    //   filter: false,
    //   headerTooltip: "Multiple Account Assignment",
    //   width: 100,
    // },




  ]
  defaultColDef = {
    sortable: true,
    resizable: true,
  };
  uploadedDate: Date;
  grnList: any;
  fileUploadedList: any;
  myFIle: any;
  fromDate: any;
  toDate: any;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private datepipe: DatePipe,
  ) {
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    let fromDates = new Date(new Date().setDate(new Date().getDate() - 1));
    this.fromDate = this.datepipe.transform(fromDates, 'yyyy-MM-dd');
    this.fileUploadedList = [];
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    // this.columnDefs=[];
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    this.GRNData = [];
    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.updatedDate = new Date;
  }

  ngOnInit(): void {
    this.getGRNList();
    this.getFileUploadedDetails();
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

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
        }
      })
  }

  reset() {
    this.fromDate = null;
    this.toDate = null;
  }

  cancel() { }

  apply() {
    this.getGRNList();
  }

  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".GNR,.common-bg").show();
    document.getElementById('last-updated-GRN-Past-data').style.display = 'block';
  }

  closeModal() {
    $(".GRN, .common-bg").hide();
    document.getElementById('last-updated-GRN-Past-data').style.display = 'none';
  }

  getGRNList() {
    this.spinner.show();

    // this.adminService.getGrnPastData().subscribe(
    //   (res)=>{        
    //   if(res){
    //    this.fileUploadedList = res.Result.Result;
    //    this.fileUploadedList.forEach(element => {
    //     if(element.FileType=== "GRN")
    //     {
    //       this.updatedDate = element.Date;
    //     }
    //    });


    //   }
    //  })
    // this.http.get<any>("http://localhost:3000/materialMasterData").subscribe(res => {
    //   if (res) {
    //     this.itemData = res;
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // },
    //   (err) => {
    //     this.spinner.hide();
    //   })
    const data = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: PAGESIZE
      },
      PlantCode: "",
      ItemCode: "",
      SuppierCode: "",
      //   SupplierName: "",
      //  Source: "",
      FromDate: this.fromDate,
      ToDate: this.toDate
    }
    // this.adminService.getGrnList(data).subscribe((res) => {
    //   if (res) {
    //     this.grnList = res.List;
    //     this.spinner.hide();
    //   }
    // })


    this.adminService.getGrnList(data).subscribe(
      (res) => {
        if (res) {
          if (res.Message || res.message) {
            this.grnList = [];
            this.spinner.hide();
            //   this.notifier.notify(res.Message.summary, 2);
          }
          else {
            this.grnList = res.GRNList;
            this.getFileUploadedDetails();
            this.spinner.hide();
          }
          // this.notifier.notify(res.message.summary, 2);
        } else {
          this.grnList = [];
          this.spinner.hide();
          //  this.notifier.notify(res.message.summary, 3);
        }
      },
      (err) => {
        this.grnList = [];
        this.spinner.hide();
        //   this.notifier.notify("Data Not Available", 1);
        //   this.notifier.notify(err.message, 4);
      }
    );
  }

  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
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