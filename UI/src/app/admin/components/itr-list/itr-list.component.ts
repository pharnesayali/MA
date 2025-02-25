import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { AdminService } from '../../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/shared/services/notifier.service';
@Component({
  selector: 'app-itr-list',
  templateUrl: './itr-list.component.html',
  styleUrls: ['./itr-list.component.scss']
})
export class ItrListComponent implements OnInit {
  fromDate: any;
  toDate: any;
  itrListData: any;
  columnDefs = [];
  itrViewClicked: boolean;
  defaultColDef = {
    sortable: true,
    resizable: true,
  };
  itrViewData: any;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowSelection: string;
  itrViewColumnDef: any;
  selectedMonth: string;
  changeItrList: any;
  ITRListColumnDef = [
    {
      headerName: " ITR For The Month",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "ITR For The Month",
      width: 200,
      editable: false,
      enableRowGroup: true,
      headerClass: 'text-center',
    },
    {
      headerName: "Upload Date",
      field: "Date",
      filter: false,
      headerTooltip: "Upload Date ",
      width: 200,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
      cellStyle: {
        textAlign: 'center'
      },
      valueFormatter: (params) => {
        if (params.value !== undefined) {
          const date = new Date(params.value);
          const datepipe: DatePipe = new DatePipe("en-US");
          return datepipe.transform(date, "MM/dd/yyyy");
        }
      },
    },
    {
      headerName: "Action",
      field: "id",
      filter: false,
      headerClass: 'text-center',
      // headerTooltip: "Generated By",
      cellRenderer: function (params) {
        if (
          params !== null &&
          params !== undefined &&
          params.data !== undefined &&
          params.data !== null
        ) {
          return '<a class="padding-left-20 c-pointer"> <i class="fa fa-eye" aria-hidden="true" ></i></a>';
        }
      },
      width: 100,
      editable: false,
    },
  ]
  ItrViewgridApi: any;
  ItrViewgridColumnApi: any;
  rowGroupPanelShow: string;
  revisionList: any;
  selectedRevision:any;
  monthList = [
    {
      monthId: 1,
      monthName: "January"
    },
    {
      monthId: 2,
      monthName: "February"
    },
    {
      monthId: 3,
      monthName: "March"
    },
    {
      monthId: 4,
      monthName: "April"
    },
    {
      monthId: 5,
      monthName: "May"
    },
    {
      monthId: 6,
      monthName: "June"
    },
    {
      monthId: 7,
      monthName: "July"
    },
    {
      monthId: 8,
      monthName: "August"
    },
    {
      monthId: 9,
      monthName: "September"
    },
    {
      monthId: 10,
      monthName: "October"
    },
    {
      monthId: 11,
      monthName: "November"
    },
    {
      monthId: 12,
      monthName: "December"
    },
  ]
  months = [
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
  constructor(
    private datepipe: DatePipe,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notifier: NotifierService) {
    let date = new Date();
    this.toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.fromDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    this.itrListData = [];
    const gridSize = 6;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.itrViewData = [];
    this.rowGroupPanelShow = "always";
    this.itrViewClicked = false;
    this.changeItrList = [];
    this.revisionList = [];
  }

  ngOnInit(): void {
    this.getITRList();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onItrViewGridReady(params) {
    this.ItrViewgridApi = params.api;
    this.ItrViewgridColumnApi = params.columnApi;
  }
  getITRList() {
    this.spinner.show();
    // this.spinner.show();
    // this.fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    // this.toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    // const data = {
    //   PageCriteria: {
    //     PageNumberToFetch: 1,
    //     PageSize: 100
    //   },
    //   // StartDate: this.fromDate,
    //   // EndDate: this.toDate
    //   StartDate: "10-18-2022",
    //   EndDate: "10-18-2022"
    // }
    // this.http.get<any>("http://localhost:3000/ItrList").subscribe(res => {
    this.adminService.getItrDetails().subscribe(res => {
      if (res.Message) {
        //this.notifier.notify(res.Message, 1);
        this.itrViewData = [];
        this.spinner.hide();
      }
      else
        if (res && !res.message) {
          this.itrViewData = res.Result;
          this.columnDefs = ITRColumnDefs();
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
  onOpenYearCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("month");
  }

  generateItr() {
    this.adminService.generateITR().subscribe(
      res => {
        if (res) {
          this.notifier.notify(res.Result, 1);
          this.getITRList();
        }
      },
      (err) => {
        this.spinner.hide();
        //  this.notifier.notify(err.message, 4);
      })
  }

  apply() {
    //  this.getITRList();
  }

  cancel() { }

  reset() {
    this.fromDate = null;
    this.toDate = null;
  }

  onMonthChange() {
    this.spinner.show();
    const data = {
      month: this.selectedMonth
    }
    this.adminService.getItrRevision(data).subscribe(
      (res) => {
        if (res) {
          if (res.Result) {
            this.revisionList  = []
            this.notifier.notify("Revision list does not exists !", 1);
            this.spinner.hide();
          }
          else {
            this.revisionList  = res.Result;
           
            this.spinner.hide();
          }
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      }
    );
  }

  resetData() { }

  onCellClicked(event) {
    if (event !== null &&
      event !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.headerName !== null &&
      event.colDef.headerName !== undefined &&
      event.colDef.headerName === "Action") {
      this.itrViewClicked = true;
      this.spinner.show();
      this.http.get<any>("http://localhost:3000/viewITR").subscribe(res => {
        if (res) {
          this.itrViewData = res;
          this.columnDefs = ITRColumnDefs();
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
    // if (this.columnDefs !== null &&
    //   this.columnDefs !== undefined) {
    //   this.months.forEach((data) => {
    //     if (event.data.Month.includes(data)) {
    //       this.selectedMonth = data;

    //     }
    //   })
    //   let colDef = event.data.Month
    //   const column = {
    //     headerName: colDef,
    //     // headerClass: 'grid-cell-centered ',
    //     headerClass: 'text-center',
    //     children: [
    //       {
    //         headerName: "Sales Value",
    //         field: this.selectedMonth + "_sales_value",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Sales Value",
    //         width: 150,
    //         editable: true,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //       {
    //         headerName: "Total Inventory",
    //         field: this.selectedMonth + "_total_inventory",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Total Inventory",
    //         width: 150,
    //         editable: false,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //       {
    //         headerName: "Moving Inventory",
    //         field: this.selectedMonth + "_moving-inventory",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Moving Inventory",
    //         width: 150,
    //         editable: false,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //       {
    //         headerName: "Slow Moving Inventory",
    //         field: this.selectedMonth + "_slow-moving-inventory",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Slow Moving Inventory",
    //         width: 180,
    //         editable: false,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //       {
    //         headerName: "Non MOving Inventory",
    //         field: this.selectedMonth + "_non-moving-inventory",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "Non Moving Inventory",
    //         width: 180,
    //         editable: false,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //       {
    //         headerName: "ITR",
    //         field: this.selectedMonth + "_itr",
    //         filter: "agTextColumnFilter",
    //         headerTooltip: "ITR",
    //         width: 150,
    //         editable: false,
    //         headerClass: 'text-center',
    //         valueFormatter: dollerFormatter,
    //         cellStyle: {
    //           textAlign: 'center'
    //         },
    //       },
    //     ]

    //   }
    //   this.columnDefs.push(column)
    // }
  }

  onCellValueChanged(event) {
    if (
      event !== null &&
      event !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.field !== null &&
      event.colDef.field !== undefined &&
      event.colDef.field === "sales_value"
    ) {
      if (
        event.data !== null &&
        event.data !== undefined &&
        event.data.sales_value !== null &&
        event.data.sales_value !== undefined &&
        event.data.total_inventory !== null &&
        event.data.total_inventory !== undefined &&
        event.data.itr !== null &&
        event.data.itr !== undefined
      ) {
        let itr
        itr = ((event.data.sales_value) / (event.data.total_inventory)) * 12;
        event.data.itr = itr;
        this.ItrViewgridApi.refreshCells(event.data);
        this.ItrViewgridApi.refreshView(event.data);
        if (
          this.changeItrList !== null &&
          this.changeItrList !== undefined &&
          this.changeItrList === 0
        ) {
          const obj = {
            id: event.data.id,
            itr: event.data.itr,
            sales_value: event.data.sales_value,
            total_inventory: event.data.total_inventory,
            plant: event.data.plant,
            moving_inventory: event.data.moving_inventory,
            slow_moving_inventory: event.data.slow_moving_inventory,
            non_moving_inventory: event.data.non_moving_inventory
          }
          this.changeItrList.push(obj);
          this.ItrViewgridApi.refreshCells(event.data);
          this.ItrViewgridApi.refreshView(event.data);
        }
        else {
          const listIndex = this.changeItrList.findIndex(
            (ele) =>
              ele.id === event.data.id
          );
          if (listIndex !== null && listIndex !== undefined && listIndex !== -1) {
            this.changeItrList.splice(listIndex, 1);
            const obj = {
              id: event.data.id,
              itr: event.data.itr,
              sales_value: event.data.sales_value,
              total_inventory: event.data.total_inventory,
              plant: event.data.plant,
              moving_inventory: event.data.moving_inventory,
              slow_moving_inventory: event.data.slow_moving_inventory,
              non_moving_inventory: event.data.non_moving_inventory
            }
            this.changeItrList.push(obj);
          }
          else {
            const obj = {
              id: event.data.id,
              itr: event.data.itr,
              sales_value: event.data.sales_value,
              total_inventory: event.data.total_inventory,
              plant: event.data.plant,
              moving_inventory: event.data.moving_inventory,
              slow_moving_inventory: event.data.slow_moving_inventory,
              non_moving_inventory: event.data.non_moving_inventory
            }
            this.changeItrList.push(obj);
            this.ItrViewgridApi.refreshCells(event.data);
            this.ItrViewgridApi.refreshView(event.data);
          }
        }
        console.log(this.changeItrList)
      }
    }

  }
}


function ITRColumnDefs() {
  return [
    {
      headerName: "Division",
      field: "Zone",
      headerTooltip: "Division",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Plant",
      field: "PlantCode",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Plant",
      width: 170,
      cellStyle: { textAlign: 'right' },
      headerClass: 'text-center',
    },
    {
      headerName: "Sales Value",
      field: "salesValue",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Sales Value",
      width: 150,
      editable: true,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Total Inventory",
      field: "total_inventory",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Total Inventory",
      width: 150,
      editable: false,
      headerClass: 'text-center',
     // valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Moving Inventory",
      field: "Moving",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Moving Inventory",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Slow Moving Inventory",
      field: "slow_moving",
   //   filter: "agTextColumnFilter",
      headerTooltip: "Slow Moving Inventory",
      width: 180,
      editable: false,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Non Moving Inventory",
      field: "non_moving",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Non Moving Inventory",
      width: 180,
      editable: false,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "ITR",
      field: "ITR",
     // filter: "agTextColumnFilter",
      headerTooltip: "ITR",
      width: 150,
      editable: false,
      headerClass: 'text-center',
      valueFormatter: dollerFormatter,
      cellStyle: {
        textAlign: 'right'
      },
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