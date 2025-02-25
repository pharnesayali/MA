import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-itr-format',
  templateUrl: './itr-format.component.html',
  styleUrls: ['./itr-format.component.scss']
})
export class ItrFormatComponent implements OnInit {
  uploadedDate: Date;
  headerHeight: number;
  gridApi: any;
  gridColumnApi: any;
  columnDefs = [];
  itrList: any;
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  month = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  fileUploadedList: any;
  updatedDate = new Date();
  constructor(
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
  ) {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.itrList = [];
    this.fileUploadedList = [];
  }

  ngOnInit(): void {
    this.getITRList()
    this.getFileUploadedDetails();
  }
  getFileUploadedDetails() {
    // this.adminService.getFileUploadedDate().subscribe(
    //   (res)=>{
    //    if(res){
    //     this.fileUploadedList= res.Result.Result;
    //    }
    //   }
    // )

    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          //  this.fileUploadedList.forEach(element => {
          //   if(element.FileType=== "Item_Master")
          //   {

          //     this.updatedDate = element.Date;
          //   }
          //  });


        }
      })
  }

  getITRList() {
    // this.http.get<any>("http://localhost:3000/ITRList").subscribe(res => {
      this.spinner.show();
    this.adminService.getITRReport().subscribe(res => {
      if (res) {
        this.itrList = res.Result;
        this.columnDefs = ITRColumnDefs();
        if (this.columnDefs !== null &&
          this.columnDefs !== undefined) {
          this.months.forEach((colDef) => {
            const column = {
              headerName: colDef,
              //    headerClass: 'grid-cell-centered ',
              headerClass: (params) => {
                if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Jan"
                ) {
                  return "rag-2001"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Feb"
                ){
                  return "rag-2002"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Mar"
                ){
                  return "rag-2003"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Apr"
                ){
                  return "rag-2004"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "May"
                ){
                  return "rag-2005"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Jun"
                ){
                  return "rag-2006"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Jul"
                ){
                  return "rag-2007"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Aug"
                ){
                  return "rag-2009"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Sep"
                ){
                  return "rag-2010"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Oct"
                ){
                  return "rag-2012"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Nov"
                ){
                  return "rag-2015"
                }
                else   if (params !== null &&
                  params !== undefined &&
                  params.colDef !== null &&
                  params.colDef !== undefined &&
                  params.colDef.headerName !== null &&
                  params.colDef.headerName !== undefined &&
                  params.colDef.headerName === "Dec"
                ){
                  return "rag-2018"
                }
              },
              children: [
                {
                  headerName: "Sales Value",
                  field: +this.month.indexOf(colDef) + "_salesValue",
                 // filter: "agTextColumnFilter",
                  headerTooltip: "Sales Value",
                  width: 150,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right',

                  },
                },
                {
                  headerName: "Total Inventory",
                  field: +this.month.indexOf(colDef) + "_totalinventory",
              //    filter: "agTextColumnFilter",
                  headerTooltip: "Total Inventory",
                  width: 150,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right'
                  },
                },
                {
                  headerName: "Moving Inventory",
                  field: +this.month.indexOf(colDef) + "_Moving",
               //   filter: "agTextColumnFilter",
                  headerTooltip: "Moving Inventory",
                  width: 150,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right'
                  },
                },
                {
                  headerName: "Slow Moving Inventory",
                  field: +this.month.indexOf(colDef) + "_slow_moving",
                 // filter: "agTextColumnFilter",
                  headerTooltip: "Slow Moving Inventory",
                  width: 180,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right'
                  },
                },
                {
                  headerName: "Non Moving Inventory",
                  field: +this.month.indexOf(colDef) + "_non_moving",
                 // filter: "agTextColumnFilter",
                  headerTooltip: "Non Moving Inventory",
                  width: 180,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right'
                  },
                },
                {
                  headerName: "ITR",
                  field: +this.month.indexOf(colDef) + "_ITR",
               //   filter: "agTextColumnFilter",
                  headerTooltip: "ITR",
                  width: 150,
                  editable: false,
                  headerClass: (params) => {
                    let splittedData = params.colDef.field.split("_")
                    if (params !== null &&
                      params !== undefined &&
                      params.colDef !== null &&
                      params.colDef !== undefined

                    ) {
                      if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===1
                      ) {
                        return "rag-2001"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===2
                      ) {
                        return "rag-2002"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===3
                      ) {
                        return "rag-2003"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===4
                      ) {
                        return "rag-2004"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===5
                      ) {
                        return "rag-2005"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===6
                      ) {
                        return "rag-2006"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===7
                      ) {
                        return "rag-2007"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===8
                      ) {
                        return "rag-2009"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===9
                      ) {
                        return "rag-2010"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===10
                      ) {
                        return "rag-2012"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                         +splittedData[0]===11
                      ) {
                        return "rag-2015"
                      }
                      else if (
                        params.colDef.field !== null &&
                        params.colDef.field !== undefined &&
                        +splittedData[0]===12
                      ) {
                        return "rag-2018"
                      }
                      else {
                        return "rag-any"
                      }
                    }
                  },
                  valueFormatter: dollerFormatter,
                  cellStyle: {
                    textAlign: 'right'
                  },
                },
              ]

            }
            this.columnDefs.push(column)
          })
        }

        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
      })
  }

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getData() {
    this.uploadedDate = new Date();
    $(".item-supplier, .common-bg").show();
    document.getElementById('last-updated-itr-format-data').style.display = 'block';
  }

  closeModal() {
    $(".item-supplier, .common-bg").hide();
    document.getElementById('last-updated-itr-format-data').style.display = 'none';
  }

}

function ITRColumnDefs() {
  return [
    {
      headerName: "Division",
      field: "Zone",
      headerTooltip: "Division",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Plant",
      field: "plantCode",
     // filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 120,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
  ]
}

function dollerFormatter(params) {
  if (params.value === undefined || null) {
    return params.value = 0;
  } else {
    if (params.value < 0) {
      return "" + formatNumber(params.value) + "";
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