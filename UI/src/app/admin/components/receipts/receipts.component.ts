import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
import { NotifierService } from 'src/app/shared/services/notifier.service';
let PAGESIZE = 100;
declare var $: any;

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {
  defaultColDef: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  rowGroupPanelShow: string;
  pageSize: number;
  receiptData: any
  paginationPageSize: number;
  uploadedDate: any
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  updatedDate: Date;
  receiptColumnDef: any;
  columnlabels: any;
  fileUploadedList: any;
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      // width:200
    };
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.paginationPageSize = PAGESIZE;
    this.pageSize = 4;
    this.updatedDate = null;
    this.fileUploadedList=[];

  }

  ngOnInit(): void {
    this.getReceiptList();
    this.getFileUploadedDetails();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //   this.gridApi.sizeColumnsToFit();
  }

  getReceiptList() {
    this.spinner.show();
    const data =
    {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: PAGESIZE
      },
      PlantCode: "",
      SupplierCode: "",
      ItemCode: "",
      Buyer: "",
      Year: ""
    }

    this.adminService.getGitList(data).subscribe(
      (res) => {
        if (res) {
          this.receiptData = res.List;
          this.receiptColumnDef = res.WeekList;
          this.getFileUploadedDetails();
          this.columnDefs = receiptColumnDefs();
          if (this.receiptColumnDef !== null &&
            this.receiptColumnDef !== undefined
          ) {
            this.receiptColumnDef.forEach((coldef) => {
              const datepipe: DatePipe = new DatePipe("en-US");
              let from_date;
              let to_date;
              let week;
              if(coldef.Week !== null &&
                coldef.Week !== undefined){
                  week= coldef.Week.replace(/\D/g, '');
                }
              if (coldef.Date_From !== null &&
                coldef.Date_From !== undefined){
                   from_date = datepipe.transform(coldef.Date_From, "dd/MM/yyyy");
                }
              if(coldef.Date_To !== null &&
                coldef.Date_To !== undefined){
                  to_date  = datepipe.transform(coldef.Date_To, "dd/MM/yyyy");
                }
            
              const column = {
                headerName: week,
                children: [
                  {
                    headerName: from_date,
                    children: [
                      {
                        headerName: to_date,
                        children: [
                          {
                            headerName: 'Receipt',
                            field: coldef.Week,
                            filter:false,
                            width: 100,
                            headerClass: 'text-center',
                            suppressSizeToFit: true,
                            cellStyle: {
                              textAlign: 'right'
                            },
                            valueFormatter: dollerFormatter,
                          },
                        ]
                      },
                    ]
                  },
                ]
              }
              this.columnDefs.push(column);
            });
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
       // this.notifier.notify("Data Not Available", 1);
      }
    );

  }
  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".receipts, .common-bg").show();
    document.getElementById('last-updated-inovice-data').style.display = 'block';
  }

  closeModal() {
    $(".receipts, .common-bg").hide();
    document.getElementById('last-updated-inovice-data').style.display = 'none';
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
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "Recipt")
        {
          this.updatedDate = element.Date;
        }
       });
       
       
      }
     })
  }
}

function receiptColumnDefs() {
  return [
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 150,
      editable: false,
      pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Item Description",
      field: "Description",
      filter: false,
      headerTooltip: "Item Code",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      // resizable:true
    },
    {
      headerName: "Plant Code",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 120,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      // resizable:true
    },
    // {
    //   headerName: "Trim",
    //   field: "trim",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Trim",
    //   width: 200,
    //   editable: false,
    // },
    // {
    //   headerName: "Description",
    //   field: "decription",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Description",
    //   width: 200,
    //   editable: false,
    // },
    {
      headerName: "UOM",
      field: "UOM",
      filter: false,
      headerTooltip: "UOM",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Stock item Type",
      field: "Stock_item_type",
      filter: "agTextColumnFilter",
      headerTooltip: "Stock Item Type",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: 'Week Number',
      headerClass: 'text-center',
      children: [
        {
          headerName: 'Start Date',
          field: "Date_From",
          headerClass: 'text-center',
          children: [
            {
              headerName: 'End Date',
              field: "Date_To",
              children: [
                {
                  headerName: 'Supplier',
                  field: 'Supplier',
                  width: 150,
                  suppressSizeToFit: true,
                  headerClass: 'text-center',
                  cellStyle: {
                    textAlign: 'right'
                  }
                },
              ]
            },
          ]
        },
      ]
    },
  ]
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