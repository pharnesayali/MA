import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  headerHeight: any;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  columnDefs = [
    {
      headerName: "Code",
      field: "code",
      filter: "agTextColumnFilter",
      headerTooltip: "Code",
      width: 250,
    },
    {
      headerName: "Trim",
      field: "trim",
      filter: "agTextColumnFilter",
      headerTooltip: "Trim",
      width: 250,
    },
    {
      headerName: "Description",
      field: "description",
      filter: "agTextColumnFilter",
      headerTooltip: "Description",
      width: 250,
    },
    {
      headerName: "Supplier",
      field: "supplier",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier",
      width: 250,
    },
    {
      headerName: "July_22",
      field: "july_22",
      filter: "agTextColumnFilter",
      headerTooltip: "July-22",
      width: 250,
    },
    {
      headerName: "August_22",
      field: "august_22",
      filter: "agTextColumnFilter",
      headerTooltip: "August-22",
      width: 250,
    },
    {
      headerName: "September_22",
      field: "september_22",
      filter: "agTextColumnFilter",
      headerTooltip: "september-22",
      width: 250,
    },
    {
      headerName: "October_22",
      field: "october_22",
      filter: "agTextColumnFilter",
      headerTooltip: "October-22",
      width: 250,
    },
    {
      headerName: "November_22",
      field: "november_22",
      filter: "agTextColumnFilter",
      headerTooltip: "november-22",
      width: 250,
    },
    {
      headerName: "December_22",
      field: "december_22",
      filter: "agTextColumnFilter",
      headerTooltip: "december-22",
      width: 250,
    },

  ];
  documentData = [
    {
      code: "180005046S0",
      trim: "180005046S0",
      description: "test data 1",
      supplier: "YAZAKI Corporation",
      july_22 : 100,
      august_22:100,
      september_22:100,
      october_22:100,
      november_22:100,
      december_22:100
    },
    {
      code: "180005046S1",
      trim: "180005046S1",
      description: "test data 1",
      supplier: "YAZAKI Corporation",
      july_22 : 200,
      august_22:200,
      september_22:200,
      october_22:200,
      november_22:200,
      december_22:200
    },
    {
      code: "180005046S2",
      trim: "180005046S2",
      description: "test data 2",
      supplier: "YAZAKI Corporation",
      july_22 : 300,
      august_22:300,
      september_22:300,
      october_22:300,
      november_22:300,
      december_22:300
    },
    {
      code: "180005046S3",
      trim: "180005046S3",
      description: "test data 4",
      supplier: "YAZAKI Corporation",
      july_22 : 400,
      august_22:400,
      september_22:400,
      october_22:400,
      november_22:400,
      december_22:400
    },
    {
      code: "180005046S4",
      trim: "180005046S4",
      description: "test data 5",
      supplier: "YAZAKI Corporation",
      july_22 : 500,
      august_22:500,
      september_22:500,
      october_22:500,
      november_22:500,
      december_22:500
    },

  
  ]
defaultColDef = {
  sortable: true,
  resizable: true,
  flex: 1,
};
onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  // this.gridOptions.api.addAggFunc("customizeAgg", rowGroupAggrigate);
}
constructor() {
  this.rowSelection = "multiple";
}

ngOnInit(): void {
}

}
