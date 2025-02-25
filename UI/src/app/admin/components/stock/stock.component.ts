import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { NotifierService } from 'src/app/shared/services/notifier.service';
// import { CustomHeaderComponent } from '../../templates/custom-header/custom-header.component';
let PAGESIZE = 100;
declare var $: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  selectedLocation: any;
  stockData: any;
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  rowSelectionMultiple;
  gridApi: any;
  gridColumnApi: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  selectedLocationList: any[];
  pageSize: number;
  paginationPageSize: number;
  updatedDate = new Date();
  fileUploadedList: any;
  // columnDefs = [
  //   {
  //      headerName: "Plant Code",
  //     field: "plant_code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "plant Code",
  //     width: 250,
  //     editable: false,
  //     enableRowGroup: true,
  //     pinned: "left",

  //     // checkboxSelection: true,
  //     // headerCheckboxSelection: true

  //   },
  //   {
  //      headerName: "1200",
  //     field: "location_code1",
  //     filter: false,
  //     headerTooltip: "location 1200",
  //     headerCheckboxSelection:params =>{
  //       if (params !== null && params !== undefined) {
  //         return `<input type='checkbox' (click)="headerClick()" ${params.value ? 'checked' : ''}  />`;
  //       }
  //     },
  //     // headerCellRenderer: CheckBoxRenderer,
  //     // headerComponent: CheckBoxRenderer,
  //     // headerComponentParams: { menuIcon: 'fa-external-link-alt' },
  //     // headerCellRenderer: selectAllRenderer,
  //     //  headerCellRenderer: params => {
  //     //     return `<input type='checkbox' ${params.value === true ? 'checked' : ''} />`;
  //     //   },
  //     // headerComponent: MyHeaderComponent,
  //     // headerComponent: selectAllRenderer,
  //     // checkboxSelection: true,
  //     //  headerCheckboxSelection: true,
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     // cellRenderer: CheckBoxRenderer,

  //     //  checkboxSelection: true,
  //     headerCheckboxSelectionFilteredOnly: true
  //     //  cellRenderer: CheckBoxRenderer
  //   },

  //   {
  //     headerName: "1100",
  //     field: "location_code2",
  //     filter: false,
  //     headerTooltip: "location 1100",
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     // cellRenderer: CheckBoxRenderer,
  //     // cellRenderer: params => {

  //     //   return `<input type='checkbox'  (click)='onCheckBoxChange($event)' ${params.value === true ? 'checked' : ''} />`;

  //     // },
  //     // headerCheckboxSelection: true,
  //     // checkboxSelection: true,
  //     headerCheckboxSelectionFilteredOnly: true
  //     // cellRenderer: CheckBoxRenderer
  //     // checkboxSelection: true,
  //   },
  //   {
  //      headerName: "1600",
  //     field: "location_code3",
  //     filter: false,
  //     headerTooltip: "location 1600",
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     headerCheckboxSelection:params =>{
  //       if (params !== null && params !== undefined) {
  //         return `<input type='checkbox' ${params.value ? 'checked' : ''}  />`;
  //       }
  //     },
  //     // cellRenderer: CheckBoxRenderer,
  //     //   headerCheckboxSelection: params => {
  //     //     const displayedColumns = params.columnApi.getAllDisplayedColumns();
  //     //     return displayedColumns[3] === params.column.colId;
  //     // }
  //     // cellRenderer: CheckBoxRenderer
  //     // checkboxSelection: true,
  //   },
  //   {
  //      headerName: "1500",
  //     field: "location_code4",
  //     filter: false,
  //     headerTooltip: "location 1500",
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     // cellRenderer: CheckBoxRenderer,
  //     // cellRenderer: CheckBoxRenderer

  //     // checkboxSelection: true,
  //   },
  //   {
  //      headerName: "100",
  //     field: "location_code4",
  //     filter: false,
  //     headerTooltip: "location 100",
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     // cellRenderer: CheckBoxRenderer,
  //     // cellRenderer: CheckBoxRenderer
  //   },
  // ];

  // public components: {
  //   [p: string]: any;
  // } = {
  //   agColumnHeader: CustomHeaderComponent,
  // };
  // columnDefs = [
  //   {
  //     filter: false,
  //     checkboxSelection: true,
  //     headerCheckboxSelection: true,
  //     pinned: "left",
  //     width:80,
  //   },
  //   {
  //     headerName: "Plant Code",
  //     field: "plant_code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "plant Code",
  //     width: 250,
  //     editable: false,
  //     enableRowGroup: true,
  //      checkboxSelection: true,
  //     // headerCheckboxSelection: selectAllRenderer

  //   },
  //   {
  //     headerName: "Location",
  //     field: "location_code",
  //     filter: false,
  //     headerTooltip: "location 100",
  //     width: 100,
  //     editable: false,
  //     enableRowGroup: true,
  //     checkboxSelection: true,
  //     // cellRenderer: CheckBoxRenderer
  //   },
  // ]

  // columnDefs = [

  //   {
  //     headerName: "Plant Code",
  //     field: "plant_code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "plant Code",
  //     width: 250,
  //     editable: false,
  //     enableRowGroup: true,
  //     pinned: "left",
  //     checkboxSelection: true,
  //     // headerCheckboxSelection: true
  //   },
  //   // {
  //   //   headerName: "Plant Name",
  //   //   field: "plant_name",
  //   //   filter: "agTextColumnFilter",
  //   //   headerTooltip: "plant Name",
  //   //   width: 250,
  //   //   editable: false,
  //   //   enableRowGroup: true,
  //   //   pinned: "left",
  //   //   checkboxSelection: true,
  //   //   // headerCheckboxSelection: true
  //   // },
  //   {
  //     headerName: "Location",
  //     field: "location_code",
  //     filter: "agTextColumnFilter",
  //     headerTooltip: "Location",
  //     width: 250,
  //     editable: false,
  //     enableRowGroup: true,
  //     pinned: "left",
  //     checkboxSelection: true,
  //     // headerCheckboxSelection: true
  //   },

  // ]

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
  dropdownSettings: any;
  dropdownList: any;
  selectedItems: any;
  colElements: HTMLElement[];
  uploadedDate: Date;
  constructor(
    private router: Router,
    private http: HttpClient,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {

    /* ng-multiselect dropdown setting */
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'locationId',
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 230,
      itemsShowLimit: 5,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,

    };
    this.fileUploadedList = [];

    // this.stockData=[]
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelectionMultiple = "multiple";

    this.colElements = Array.from(
      document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<
        HTMLElement
      >
    );
    this.selectedLocationList = new Array<any>();
    this.paginationPageSize = PAGESIZE;
    this.pageSize = 1;
    this.updatedDate = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  ngOnInit(): void {
    this.getStockData();
    this.getFileUploadedDetails();
  }

  gridOptions: GridOptions = {
    groupSelectsChildren: true,
    // groupSelectsChildren: false,
    rowSelection: 'multiple',
  }

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
      FromDate: "",
      ToDate: ""
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

    // this.adminService.getStockList(data).subscribe(
    //   (res) => {
    //   if (res) {
    //     this.stockData = res.List;
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }

    // })
    // this.http.get<any>("http://localhost:3000/stockLocationData").subscribe(res => {
    //   if (res) {
    //     this.stockData = res;
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // },
    //   (err) => {
    //     this.spinner.hide();
    //   })
  }


  onCellClicked(event) {

    if (event !== null &&
      event !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.headerName !== null &&
      event.colDef.headerName !== undefined &&
      event.colDef.headerName === "1200" &&
      event.rowIndex !== null &&
      event.rowIndex !== undefined) {
      // const selectedNodeData = this.gridApi.getRowNode(event.rowIndex);
      // selectedNodeData[event.colDef.field]=false;
      if (event.data !== null &&
        event.data !== undefined &&
        event.data[event.colDef.field] !== null &&
        event.data[event.colDef.field] !== undefined &&
        event.data[event.colDef.field] === true) {
        event.data[event.colDef.field] = false;
        // this.selectedLocationList.splice(event.data);
      }
      else if (event.data !== null &&
        event.data !== undefined &&
        event.data[event.colDef.field] !== null &&
        event.data[event.colDef.field] !== undefined &&
        event.data[event.colDef.field] === false) {
        event.data[event.colDef.field] = true;
        // this.selectedLocationList = new Array<any>();
        this.selectedLocationList.push(event.data);
      }
    }
    // if (event !== null && event !== undefined && event.value !== null && event.value !== undefined && event.value === true) {
    //   event.value = false;
    // }
    // else if (event !== null && event !== undefined && event.value !== null && event.value !== undefined && event.value === false) {
    //   event.value = true;
    // }

  }


  apply() {
    // let selectedRows;
    // selectedRows = this.gridApi.getSelectedRows();
    //  this.selectedLocationList = new Array<any>();
    if (this.gridApi !== null && this.gridApi !== undefined) {
      this.gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (node.isSelected()) {
          this.selectedLocationList.push(node.data);
        }
      });
    }
  }
  cancel() {
    this.getStockData();
  }

  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".stock, .common-bg").show();
    document.getElementById('last-updated-Stock-data').style.display = 'block';
  }

  closeModal() {
    $(".stock, .common-bg").hide();
    document.getElementById('last-updated-Stock-data').style.display = 'none';
  }
}

function CheckBoxRenderer(params) {
  if (params !== null && params !== undefined) {
    return `<input type='checkbox' ${params.value ? 'checked' : ''}  />`;
  }

}

function selectAllRenderer(params) {
  var cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');

  var eHeader = document.createElement('label');
  var eTitle = document.createTextNode(params.colDef.headerName);
  eHeader.appendChild(cb);
  eHeader.appendChild(eTitle);

  cb.addEventListener('change', function (e) {
    if ($(this)[0].checked) {
      params.api.selectAll();
    } else {
      params.api.deselectAll();
    }
  });
  return eHeader;
}

function MyHeaderComponent(params) {
  return params
}