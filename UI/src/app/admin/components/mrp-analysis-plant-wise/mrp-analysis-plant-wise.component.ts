import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mrp-analysis-plant-wise',
  templateUrl: './mrp-analysis-plant-wise.component.html',
  styleUrls: ['./mrp-analysis-plant-wise.component.scss']
})
export class MrpAnalysisPlantWiseComponent implements OnInit {
  uploadedDate: Date;
  updatedDate = new Date();
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  MrpAnlyPlantwiseList:any;
  fileUploadedList: any;
  itemCode:any;
  plantCode:any;
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
  month = [
    // "",
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
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService,
    private adminService: AdminService,
  ) {
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.MrpAnlyPlantwiseList=[];
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
    this.getMrpAnlyPlantwiseList();
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

  getMrpAnlyPlantwiseList() {
    this.columnDefs =MRPAnalysisColDef();

      let dateList = [];
      let threeMonthdateList = [];
      let date = new Date();
      const datepipe: DatePipe = new DatePipe("en-US");
      let myDate = (date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + (date.getDate());
      let start_date = datepipe.transform(myDate, "dd/MM/yyyy");
      const start = start_date.split("/");
      let endYear;
      let endMonth;
      let startYear = start[2];
      let startMonth = +start[1];

      if (start[1] === "01") {
        endMonth = 6
        endYear = +startYear;
      }
      else if (start[1] === "12") {
        endMonth = 5
        endYear = +startYear + 1;
      }
      else {
        endMonth = +startMonth + 5;
        endYear = +startYear;
      }
      dateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, endMonth, +start[0])));

      let threeMonthendYear;
      let threeMonthendMonth;
      let threeMonthstartYear = start[2];
      let threeMonthstartMonth = +start[1];

      if (start[1] === "01") {
        threeMonthendMonth = 3
        endYear = +startYear;
      }
      else if (start[1] === "12") {
        threeMonthendMonth = 2
        endYear = +startYear + 1;
      }
      else {
        threeMonthendMonth = +startMonth + 2;
        endYear = +startYear;
      }

      threeMonthdateList = dateRange(formatDate(new Date(+startYear, +start[1], +start[0])), formatDate(new Date(endYear, threeMonthendMonth, +start[0])));
      if (this.columnDefs !== null &&
        this.columnDefs !== undefined) {
        const column = {
          headerName: "Total MRP " + this.months[start[1]] + "_" + start[2] + " Rev-0.0",
          //headerClass: 'grid-cell-centered ',
          headerClass: "rag-2001",
          children: [
          ]
        }
        dateList.forEach((element) => {
          const elementArr = element.split("-");
          let key = null;
          const yearCount = elementArr[0];
          const col = {
            headerName: this.months[+elementArr[1]] + "_" + yearCount,
            field: [+elementArr[1]] + "_" + yearCount + "_MRP",
            width: 100,
            suppressSizeToFit: true,
            headerClass: "rag-2001",
            cellStyle: {
              textAlign: 'right'
            },
            valueFormatter: dollerFormatter,
          };
          column.children.push(col)

        });
        this.columnDefs.push(column);

        threeMonthdateList.forEach((ele) => {
          const elementArr = ele.split("-");
          const column2 = {
            headerName: this.months[+elementArr[1]] + " Plan Rise in %",
            headerClass: (params) => {
              if (params !== null &&
                params !== undefined &&
                params.colDef !== null &&
                params.colDef !== undefined &&
                params.colDef.headerName !== null &&
                params.colDef.headerName !== undefined
              ) {
                if (params.colDef.headerName.includes("Jan")) {
                  return "rag-2001";
                }
                else if (params.colDef.headerName.includes("Feb")) {
                  return "rag-2002";
                }
                else if (params.colDef.headerName.includes("Mar")) {
                  return "rag-2003";
                }
                else if (params.colDef.headerName.includes("Apr")) {
                  return "rag-2004";
                }
                else if (params.colDef.headerName.includes("May")) {
                  return "rag-2005";
                }
                else if (params.colDef.headerName.includes("Jun")) {
                  return "rag-2006"
                }
                else if (params.colDef.headerName.includes("Jul")) {
                  return "rag-2007"
                }
                else if (params.colDef.headerName.includes("Aug")) {
                  return "rag-2009";
                }
                else if (params.colDef.headerName.includes("Sep")) {
                  return "rag-2010";
                }
                else if (params.colDef.headerName.includes("Oct")) {
                  return "rag-2012"
                }
                else if (params.colDef.headerName.includes("Nov")) {
                  return "rag-2015"
                }
                else if (params.colDef.headerName.includes("Dec")) {
                  return "rag-2018"
                }
              }
            },
            children: [
              // {
              //   headerName: "N-1",
              //   field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N1_MRP",
              //   headerTooltip: "N-1",
              //   headerClass: (params) => {
              //     let splittedData = params.colDef.field.split("_")
              //     if (params !== null &&
              //       params !== undefined &&
              //       params.colDef !== null &&
              //       params.colDef !== undefined &&
              //       params.colDef.headerName !== null &&
              //       params.colDef.headerName !== undefined &&
              //       splittedData !== null &&
              //       splittedData !== undefined
              //     ) {
              //       if (+splittedData[0] === 1) {
              //         return "rag-2001"
              //       }
              //       else if (+splittedData[0] === 2) {
              //         return "rag-2002"
              //       }
              //       else if (+splittedData[0] === 3) {
              //         return "rag-2003"
              //       }
              //       else if (+splittedData[0] === 4) {
              //         return "rag-2004"
              //       }
              //       else if (+splittedData[0] === 5) {
              //         return "rag-2005"
              //       }
              //       else if (+splittedData[0] === 6) {
              //         return "rag-2006"
              //       }
              //       else if (+splittedData[0] === 7) {
              //         return "rag-2007"
              //       }
              //       else if (+splittedData[0] === 8) {
              //         return "rag-2009"
              //       }
              //       else if (+splittedData[0] === 9) {
              //         return "rag-2010"
              //       }
              //       else if (+splittedData[0] === 10) {
              //         return "rag-2012"
              //       }
              //       else if (+splittedData[0] === 11) {
              //         return "rag-2015"
              //       }
              //       else if (+splittedData[0] === 12) {
              //         return "rag-2018"
              //       }
              //     }
              //   },
              //   width: 120,
              //   cellStyle: { textAlign: 'right' },
              //   valueFormatter: dollerFormatter,
              // },
              // {
              //   headerName: "N-2",
              //   field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N2_MRP",
              //   headerTooltip: "N-2",
              //   headerClass: (params) => {
              //     let splittedData = params.colDef.field.split("_")
              //     if (params !== null &&
              //       params !== undefined &&
              //       params.colDef !== null &&
              //       params.colDef !== undefined &&
              //       params.colDef.headerName !== null &&
              //       params.colDef.headerName !== undefined &&
              //       splittedData !== null &&
              //       splittedData !== undefined
              //     ) {
              //       if (+splittedData[0] === 1) {
              //         return "rag-2001"
              //       }
              //       else if (+splittedData[0] === 2) {
              //         return "rag-2002"
              //       }
              //       else if (+splittedData[0] === 3) {
              //         return "rag-2003"
              //       }
              //       else if (+splittedData[0] === 4) {
              //         return "rag-2004"
              //       }
              //       else if (+splittedData[0] === 5) {
              //         return "rag-2005"
              //       }
              //       else if (+splittedData[0] === 6) {
              //         return "rag-2006"
              //       }
              //       else if (+splittedData[0] === 7) {
              //         return "rag-2007"
              //       }
              //       else if (+splittedData[0] === 8) {
              //         return "rag-2009"
              //       }
              //       else if (+splittedData[0] === 9) {
              //         return "rag-2010"
              //       }
              //       else if (+splittedData[0] === 10) {
              //         return "rag-2012"
              //       }
              //       else if (+splittedData[0] === 11) {
              //         return "rag-2015"
              //       }
              //       else if (+splittedData[0] === 12) {
              //         return "rag-2018"
              //       }
              //     }
              //   },
              //   width: 120,
              //   cellStyle: { textAlign: 'right' },
              //   valueFormatter: dollerFormatter,
              // },
              {
                headerName: "N-3",
                field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N3_MRP",
                headerTooltip: "N-3",
                headerClass: (params) => {
                  let splittedData = params.colDef.field.split("_")
                  if (params !== null &&
                    params !== undefined &&
                    params.colDef !== null &&
                    params.colDef !== undefined &&
                    params.colDef.headerName !== null &&
                    params.colDef.headerName !== undefined &&
                    splittedData !== null &&
                    splittedData !== undefined
                  ) {
                    if (+splittedData[0] === 1) {
                      return "rag-2001"
                    }
                    else if (+splittedData[0] === 2) {
                      return "rag-2002"
                    }
                    else if (+splittedData[0] === 3) {
                      return "rag-2003"
                    }
                    else if (+splittedData[0] === 4) {
                      return "rag-2004"
                    }
                    else if (+splittedData[0] === 5) {
                      return "rag-2005"
                    }
                    else if (+splittedData[0] === 6) {
                      return "rag-2006"
                    }
                    else if (+splittedData[0] === 7) {
                      return "rag-2007"
                    }
                    else if (+splittedData[0] === 8) {
                      return "rag-2009"
                    }
                    else if (+splittedData[0] === 9) {
                      return "rag-2010"
                    }
                    else if (+splittedData[0] === 10) {
                      return "rag-2012"
                    }
                    else if (+splittedData[0] === 11) {
                      return "rag-2015"
                    }
                    else if (+splittedData[0] === 12) {
                      return "rag-2018"
                    }
                  }
                },
                width: 120,
                cellStyle: { textAlign: 'right' },
                valueFormatter: dollerFormatter,
              },
              // {
              //   headerName: "N-4",
              //   field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N4_MRP",
              //   headerTooltip: "N-4",
              //   headerClass: (params) => {
              //     let splittedData = params.colDef.field.split("_")
              //     if (params !== null &&
              //       params !== undefined &&
              //       params.colDef !== null &&
              //       params.colDef !== undefined &&
              //       params.colDef.headerName !== null &&
              //       params.colDef.headerName !== undefined &&
              //       splittedData !== null &&
              //       splittedData !== undefined
              //     ) {
              //       if (+splittedData[0] === 1) {
              //         return "rag-2001"
              //       }
              //       else if (+splittedData[0] === 2) {
              //         return "rag-2002"
              //       }
              //       else if (+splittedData[0] === 3) {
              //         return "rag-2003"
              //       }
              //       else if (+splittedData[0] === 4) {
              //         return "rag-2004"
              //       }
              //       else if (+splittedData[0] === 5) {
              //         return "rag-2005"
              //       }
              //       else if (+splittedData[0] === 6) {
              //         return "rag-2006"
              //       }
              //       else if (+splittedData[0] === 7) {
              //         return "rag-2007"
              //       }
              //       else if (+splittedData[0] === 8) {
              //         return "rag-2009"
              //       }
              //       else if (+splittedData[0] === 9) {
              //         return "rag-2010"
              //       }
              //       else if (+splittedData[0] === 10) {
              //         return "rag-2012"
              //       }
              //       else if (+splittedData[0] === 11) {
              //         return "rag-2015"
              //       }
              //       else if (+splittedData[0] === 12) {
              //         return "rag-2018"
              //       }
              //     }
              //   },
              //   width: 120,
              //   cellStyle: { textAlign: 'right' },
              //   valueFormatter: dollerFormatter,
              // },
              // {
              //   headerName: "N-5",
              //   field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N5_MRP",
              //   headerTooltip: "N-5",
              //   headerClass: (params) => {
              //     let splittedData = params.colDef.field.split("_")
              //     if (params !== null &&
              //       params !== undefined &&
              //       params.colDef !== null &&
              //       params.colDef !== undefined &&
              //       params.colDef.headerName !== null &&
              //       params.colDef.headerName !== undefined &&
              //       splittedData !== null &&
              //       splittedData !== undefined
              //     ) {
              //       if (+splittedData[0] === 1) {
              //         return "rag-2001"
              //       }
              //       else if (+splittedData[0] === 2) {
              //         return "rag-2002"
              //       }
              //       else if (+splittedData[0] === 3) {
              //         return "rag-2003"
              //       }
              //       else if (+splittedData[0] === 4) {
              //         return "rag-2004"
              //       }
              //       else if (+splittedData[0] === 5) {
              //         return "rag-2005"
              //       }
              //       else if (+splittedData[0] === 6) {
              //         return "rag-2006"
              //       }
              //       else if (+splittedData[0] === 7) {
              //         return "rag-2007"
              //       }
              //       else if (+splittedData[0] === 8) {
              //         return "rag-2009"
              //       }
              //       else if (+splittedData[0] === 9) {
              //         return "rag-2010"
              //       }
              //       else if (+splittedData[0] === 10) {
              //         return "rag-2012"
              //       }
              //       else if (+splittedData[0] === 11) {
              //         return "rag-2015"
              //       }
              //       else if (+splittedData[0] === 12) {
              //         return "rag-2018"
              //       }
              //     }
              //   },
              //   width: 120,
              //   cellStyle: { textAlign: 'right' },
              //   valueFormatter: dollerFormatter,
              // },
              // {
              //   headerName: "N-6",
              //   field: +[elementArr[1]] + "_" + [elementArr[0]] + "_N6_MRP",
              //   headerTooltip: "N-6",
              //   headerClass: (params) => {
              //     let splittedData = params.colDef.field.split("_")
              //     if (params !== null &&
              //       params !== undefined &&
              //       params.colDef !== null &&
              //       params.colDef !== undefined &&
              //       params.colDef.headerName !== null &&
              //       params.colDef.headerName !== undefined &&
              //       splittedData !== null &&
              //       splittedData !== undefined
              //     ) {
              //       if (+splittedData[0] === 1) {
              //         return "rag-2001"
              //       }
              //       else if (+splittedData[0] === 2) {
              //         return "rag-2002"
              //       }
              //       else if (+splittedData[0] === 3) {
              //         return "rag-2003"
              //       }
              //       else if (+splittedData[0] === 4) {
              //         return "rag-2004"
              //       }
              //       else if (+splittedData[0] === 5) {
              //         return "rag-2005"
              //       }
              //       else if (+splittedData[0] === 6) {
              //         return "rag-2006"
              //       }
              //       else if (+splittedData[0] === 7) {
              //         return "rag-2007"
              //       }
              //       else if (+splittedData[0] === 8) {
              //         return "rag-2009"
              //       }
              //       else if (+splittedData[0] === 9) {
              //         return "rag-2010"
              //       }
              //       else if (+splittedData[0] === 10) {
              //         return "rag-2012"
              //       }
              //       else if (+splittedData[0] === 11) {
              //         return "rag-2015"
              //       }
              //       else if (+splittedData[0] === 12) {
              //         return "rag-2018"
              //       }
              //     }
              //   },
              //   width: 120,
              //   cellStyle: { textAlign: 'right' },
              //   valueFormatter: dollerFormatter,
              // },
            ]
          }
          this.columnDefs.push(column2)
        });
        this.spinner.hide();
      }
    
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
  return [
    {
      headerName: "Item Code",
      field: "ItemCode",
      headerTooltip: "Part No",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Item Description",
      field: "ItemDescription",
      headerTooltip: "Item Description",
      width: 170,
      ///  cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Trim",
      field: "Trim",
      headerTooltip: "Trim",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },

    {
      headerName: "MOQ",
      field: "MOQ",
      headerTooltip: "MOQ",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      headerTooltip: "Supplier Code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier Name",
      field: "SupplierName",
      headerTooltip: "Supplier Name",
      width: 170,
      // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier for the Month of July-2022 Rev 00",
      field: "SupplierfortheMonth ",
      headerTooltip: "Supplier for the Month of July-2022 Rev 00",
      width: 170,
      //  cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "T to 7 part code ",
      field: "Tto7partcode",
      headerTooltip: "T to 7 part code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "7 Part Implemented Against T Code",
      field: "7PartImplementedAgainstTCode",
      headerTooltip: "7 Part Implemented Against T Code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Unit",
      field: "Unit",
      headerTooltip: "Unit",
      width: 170,
      //cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Group",
      field: "Group",
      headerTooltip: "Group",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "MAP",
      field: "Map",
      headerTooltip: "MAP",
      width: 170,
      cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Category",
      field: "Category",
      headerTooltip: "Category",
      width: 170,
      //  cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Buyer Code",
      field: "BuyerCode",
      headerTooltip: "Buyer Code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Buyer Name",
      field: "BuyerName",
      headerTooltip: "Buyer Name",
      width: 170,
      // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Maker",
      field: "Maker",
      headerTooltip: "Maker",
      width: 170,
      // cellStyle: { textAlign: 'center' },
      headerClass: 'text-center',
    },
    {
      headerName: "Maker Part No",
      field: "MakerPartNo",
      headerTooltip: "Maker Part No",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier part code",
      field: "SupplierPartCode",
      headerTooltip: "Supplier part code",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },

  ]
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