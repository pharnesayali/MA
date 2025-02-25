import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from "@angular/common";
declare var $: any;
@Component({
  selector: 'app-abc-analysis',
  templateUrl: './abc-analysis.component.html',
  styleUrls: ['./abc-analysis.component.scss']
})
export class AbcAnalysisComponent implements OnInit {
  updatedDate: Date;
  uploadedDate: Date;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  abcAnalysisList: any;
  columnDefs = [];
  months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  fileUploadedList: any;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
    this.updatedDate = null;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.abcAnalysisList = [];
    this.fileUploadedList = [];
  }

  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  ngOnInit(): void {
    this.getAbcAnalysisList();
    this.getFileUploadedDetails();
  }

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
          this.fileUploadedList.forEach(element => {
            if (element.FileType === "ABC") {

              this.updatedDate = element.Date;
            }
          });
        }
      })
  }

  getAbcAnalysisList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/movementTypeMaster").subscribe(res => {
    this.adminService.getAbcAnalysisList().subscribe(
      res => {
        if (res) {
          if (res.Message) {
            //this.notifier.notify(res.Message, 1);
            this.spinner.hide();
          }
          else {
            this.abcAnalysisList = res.Result.Table;
            this.getFileUploadedDetails();
            this.spinner.hide();
            let dateList = [];
            this.columnDefs = abcColumnDefs();
            let date = new Date();
            // let selectedMonth = date.getMonth() -1;
            // let selectedYear = date.getFullYear();
            const datepipe: DatePipe = new DatePipe("en-US");
            let myDate = (date.getFullYear()) + "/" + (date.getMonth()) + "/" + (date.getDate());
            let start_date = datepipe.transform(myDate, "dd/MM/yyyy");
            // let month= new Date(start_date.)
            const start = start_date.split("/");
            // let startMonths= +start[1]-1
            let endYear;
            let endMonth;
            let startYear = start[2];
            let startMonth = +start[1] - 1;

            if (start[1] === "01") {
              endMonth = 6
              endYear = +startYear;
            }
            else if (start[1] === "12") {
              endMonth = 6
              endYear = +startYear + 1;
            }
            else {
              endMonth = +startMonth + 6;
              endYear = +startYear;

            }
            dateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, endMonth, +start[0])));
            if (this.columnDefs !== null &&
              this.columnDefs !== undefined) {

              //    this.abcAnalysisList.forEach((colDef) => {
              //  let plantName = colDef.plant_code + "-" + colDef.plant_name
              const column = {
                headerName: "YIPL MRP " + this.months[start[1]] + "_" + start[2],
                headerClass: 'text-center',
                children: [
                ]
              }
              dateList.forEach((element) => {
                const elementArr = element.split("-");
                let key = null;
                const yearCount = elementArr[0];
                const col = {
                  headerName: this.months[+elementArr[1]] + "_" + yearCount,
                  field: this.months[+elementArr[1]] + "_" + yearCount,
                  width: 100,
                  suppressSizeToFit: true,
                  headerClass: 'text-center',
                  cellStyle: {
                    textAlign: 'right'
                  },
                     valueFormatter: dollerFormatter,
                };
                column.children.push(col)

              });

              this.columnDefs.push(column);
              //   })
            }
            this.columnDefs.push(
              {
                headerName: "Six Month Average",
                field: "avg_qty",
                headerTooltip: "Six Month Average",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Average Month MRP Value",
                field: "avg_val",
                headerTooltip: "Average Month MRP Value",
                headerClass: 'text-center',
                width: 190,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Per Days Qty",
                field: "qty",
                headerTooltip: "Per Days Qty",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                valueFormatter: decimalFormatter,
              },
              {
                headerName: "Per Days MRP Value",
                field: "val",
                headerTooltip: "Per Days MRP Value",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Commulitive Value",
                field: "cumval",
                headerTooltip: "Commulitive Value ",
                headerClass: 'text-center',
                width: 170,
                cellStyle: {
                  textAlign: 'right'
                },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Contribution In %",
                field: "maxper",
                headerTooltip: "Contribution In %",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "ABC Class",
                field: "ABC_class",
                headerTooltip: "ABC Class",
                headerClass: 'text-center',
                width: 100,
              },
              {
                headerName: "Design As Per Days",
                field: "Design_class",
                headerTooltip: "Design As Per Days",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "Qty As Per Design Days",
                field: "Design_day",
                headerTooltip: "Qty As Per Design Days",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "Qty in MOQ Round up",
                field: "qty_RoundUp",
                headerTooltip: "Qty in MOQ Round up",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "Landed Design Days",
                field: "LandedDays",
                headerTooltip: "Landed Design Days",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
            //    valueFormatter: dollerFormatter,
              },
              {
                headerName: "Value For The Design Days ",
                field: "value_Design_day",
                headerTooltip: "Value For The Design Days",
                headerClass: 'text-center',
                width: 190,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Actual Inventory Qty ",
                field: "Actual_inv",
                headerTooltip: "Actual Inventory Qty",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                
              },
              {
                headerName: "Actual Inventory In Days ",
                field: "actual_days",
                headerTooltip: "Actual Inventory In Days",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "ZL Track ",
                field: "InTransitStock",
                headerTooltip: "ZL Track",
                headerClass: 'text-center',
                width: 100,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "IDBG(W/OBH)",
                field: "Unrestricted",
                headerTooltip: "IDBG(W/OBH)",
                headerClass: 'text-center',
                width: 120,
                cellStyle: { textAlign: 'right' },
              },
              {
                headerName: "Actual Inventory Value",
                field: "actual_value",
                headerTooltip: "Actual Inventory Value",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "Excess Inventory Qty",
                field: "excess_inv",
                headerTooltip: "Excess Inventory Qty ",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
              //  valueFormatter: dollerFormatter,
              },
              {
                headerName: "Excess Inventory Value",
                field: "excess_value",
                headerTooltip: "Excess Inventory Value ",
                headerClass: 'text-center',
                width: 170,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              {
                headerName: "MOQ Status ",
                field: "MOQ_Status",
                headerTooltip: "MOQ Status ",
                headerClass: 'text-center',
                width: 170,
              },
            )
          }
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
    document.getElementById('last-updated-abc-analysis').style.display = 'block';
  }

  closeModal() {
    $(".GRN, .common-bg").hide();
    document.getElementById('last-updated-abc-analysis').style.display = 'none';
  }

}



function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth());
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
}

function dateRange(startDate, endDate) {
  const start = startDate.split("-");
  const end = endDate.split("-");
  let startMonth = start[1];
  let startYear = parseInt(start[0]);
  const endYear = parseInt(end[0]);
  if (start[1] === '00') {
    startMonth = '12';
    startYear = parseInt(start[0]) - 1;
  }

  const dates = [];
  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYear ? parseInt(startMonth) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth, "01"].join("-"));
    }
  }
  return dates;
}

function abcColumnDefs() {
  return [
    {
      headerName: "Item Code",
      field: "ItemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Part Number",
      width: 170,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Item Description",
      field: "Description",
      // filter: "agTextColumnFilter",
      headerTooltip: "Item Description",
      width: 170,
      headerClass: 'text-center',
    },
    {
      headerName: "MOQ",
      field: "MOQ",
      headerTooltip: "MOQ",
      headerClass: 'text-center',
      width: 100,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "SPQ",
      field: "SPQ",
      headerTooltip: "SPQ",
      headerClass: 'text-center',
      width: 100,
      cellStyle: {
        textAlign: 'right'
      }
    },


  ];
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

function decimalFormatter(params){
  if (params.value === undefined || null) {
    return params.value = 0;
  } else {
    if (params.value < 0) {
      return "" + formatdecimalNumber(params.value ) + "";
    } else {
      return "" + formatdecimalNumber(params.value);
    }
  }
}

function formatdecimalNumber(num: number) {
  if (+num % 1 !== 0) {
    return Number(num)
      .toFixed(0)
      // .toString()
      // .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return Number(num)
      .toFixed(0)
      // .toString()
      // .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}