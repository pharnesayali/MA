import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  context: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  MRPName: any;
  frameworkComponents: any;
  Month: any;
  revision: any;
  rowData: any;
  selectedType: any;
  columnDefs: any[];
  orderData: any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    // flex: 1,
  };
  uploadedDate: Date;
  orderId: any;
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this.gridOptions.api.addAggFunc("customizeAgg", rowGroupAggrigate);
  }
  constructor(
    private adminService: AdminService,
    private router: Router,
    private routers: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
  ) {
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
    this.orderData = [];
    this.routers.queryParams.subscribe((params) => {
      this.selectedType = params.OrderType;
      this.orderId = params.OrderNumber;
    })
    // this.adminService.selectedType$.subscribe((value) => {
    //   if (value !== null && value !== undefined) {
    //     this.selectedType = value;
    //     //this.adminService.getSelectedType(null);
    //   }

    // });
    if (this.selectedType !== null &&
      this.selectedType !== undefined &&
      this.selectedType === "Local"
    ) {
      this.columnDefs = localColumnDef()
    }
    else if (this.selectedType !== null &&
      this.selectedType !== undefined &&
      this.selectedType === "Local Billing" ||
      this.selectedType === "Import" ||
      this.selectedType.includes("Import")

    ) {
      this.columnDefs = localBillingColumnDef();
    }
  }


  ngOnInit(): void {
    this.orderDetails();
  }
  orderDetails() {
    const data = {
      OrderId: this.orderId,
      // OrderId: "1033",
      // OrderType:this.selectedType
    }
    this.spinner.show();
    this.adminService.viewOrderDetails(data).subscribe(
      (res) => {
        if (res) {
          this.orderData = res;
          if(this.orderData.length ===0){
            this.notifier.notify("No data found", 1)
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
          this.notifier.notify(err.message, 4);
      })
  }

  backtoList() {
    this.router.navigate(['/admin/order']);
  }

  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    document.getElementById('last-updated-order-generation-data').style.display = 'block';
  }

  closeModal() {
    document.getElementById('last-updated-order-generation-data').style.display = 'none';
  }

}

function localColumnDef() {
  return [
    {
      headerName: "Item Code",
      field: "itemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 150,
      pinned: "left",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
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
      headerName: "Maker Part Number",
      field: "makerPartNumber",
      filter: "agTextColumnFilter",
      headerTooltip: "Maker Part Number",
      width: 160,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "UOM",
      field: "uom",
      filter: false,
      headerTooltip: "UOM",
      width: 100,
      headerClass: 'text-center',
    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 130,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
     // filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 150,
      headerClass: 'text-center',
    },
    {
      headerName: "Buyer Code",
      field: "buyerCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Buyer Code",
      width: 120,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Buyer Name",
      field: "buyerName",
   //   filter: "agTextColumnFilter",
      headerTooltip: "Buyer Name",
      width: 150,
      headerClass: 'text-center',
    },
    {
      headerName: "MOQ",
      field: "moq",
      filter: false,
      headerTooltip: "MOQ",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Rate",
      field: "ratePerUnit",
      filter: false,
      headerTooltip: "Rate",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "LTW",
      field: "ltw",
      filter: false,
      headerTooltip: "LTW",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Order Details",
      headerClass: 'text-center',
      // headerClass: 'rag-grey',
      children: [
        {
          headerName: "Total Order",
          field: "totalOrder",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Total Order Value",
          field: "orderValue",
          filter: false,
          width: 130,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        }
      ]
    },
    {
      headerName: "Calculations",
      headerClass: 'text-center',
      // headerClass: 'rag-grey',
      children: [
        {
          headerName: "Current Week Of Ordering",
          field: "week1",
          filter: false,
          width: 180,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 1",
          field: "week1Quantity",
          filter: false,
          width: 100,
          editable: false,
          headerClass: 'text-center',
          enableRowGroup: false,
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Week Of Ordering ",
          field: "week2",
          filter: false,
          width: 140,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 2",
          field: "week2Quantity",
          filter: false,
          width: 100,
          editable: false,
          headerClass: 'text-center',
          enableRowGroup: false,
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Week Of Ordering 3",
          field: "week3",
          filter: false,
          width: 140,
          editable: false,
          headerClass: 'text-center',
          enableRowGroup: false,
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 3",
          field: "week3Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Week Of Ordering 4",
          field: "week4",
          filter: false,
          width: 140,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 4",
          field: "week4Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
      ]
    }
  ]
}


function localBillingColumnDef() {
  return [
    {
      headerName: "Item Code",
      field: "itemCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Item Code",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
      pinned: "left"
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
      headerName: "Maker Part Number",
      field: "makerPartNumber",
      filter: "agTextColumnFilter",
      headerTooltip: "Maker Part Number",
      width: 160,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },

    {
      headerName: "UOM",
      field: "uom",
      filter: false,
      headerTooltip: "UOM",
      headerClass: 'text-center',
      width: 100,

    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 130,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
    //  filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 130,
      headerClass: 'text-center',
    },
    {
      headerName: "Buyer Code",
      field: "buyerCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Buyer Code",
      width: 150,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Buyer Name",
      field: "buyerName",
     //filter: "agTextColumnFilter",
      headerTooltip: "Buyer Name",
      width: 150,
      headerClass: 'text-center',
    },

    {
      headerName: "MOQ",
      field: "moq",
      filter: false,
      headerTooltip: "MOQ",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Rate",
      field: "ratePerUnit",
      filter: false,
      headerTooltip: "Rate",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "LTW",
      field: "ltw",
      filter: false,
      headerTooltip: "LTW",
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      },
    },
    {
      headerName: "Month",
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'center'
      },
      // headerClass: 'rag-grey',
      children: [
        {
          headerName: "N",
          children: [
            {
              headerName: "Air Qty ",
              field: "airQuantityN",
              filter: false,
              width: 100,
              editable: false,
              enableRowGroup: false,
              headerClass: 'text-center',
              cellStyle: {
                textAlign: 'right'
              },
              // headerClass: 'rag-grey',
            },
          ]
        },
        {
          headerName: "N+1",
          children: [
            {
              headerName: "Air Qty ",
              field: "airQuantityN1",
              filter: false,
              width: 100,
              editable: false,
              enableRowGroup: false,
              headerClass: 'text-center',
              cellStyle: {
                textAlign: 'right'
              },
              // headerClass: 'rag-grey',
            },
          ]
        },
        {
          headerName: "N+2",
          headerClass: 'text-center',
          children: [
            {
              headerName: "Air Qty ",
              field: "airQuantityN2",
              filter: false,
              width: 100,
              editable: false,
              enableRowGroup: false,
              headerClass: 'text-center',
              cellStyle: {
                textAlign: 'right'
              },
              // headerClass: 'rag-grey',
            },
          ]
        }

      ]
    },
    {
      headerName: "Order Details",
      headerClass: 'text-center',
      // headerClass: 'rag-grey',
      children: [
        {
          headerName: "Total Order",
          field: "totalOrder",
          filter: false,
          width: 100,
          editable: false,
          headerClass: 'text-center',
          enableRowGroup: false,
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Air Order",
          field: "airOrder",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Boat Order",
          field: "boatOrder",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Total Order Value",
          field: "orderValue",
          filter: false,
          width: 140,
          editable: false,
          enableRowGroup: false,
            headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },

      ]
    },
    {
      headerName: "Calculations",
      // cellClass: "grid-cell-centered",
      headerClass: 'text-center',
      // headerClass: 'rag-grey',
      children: [
        {
          headerName: "Current Week Of Ordering",
          field: "week1",
          filter: false,
          width: 180,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 1",
          field: "week1Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        // {
        //   headerName: "Week Of Ordering ",
        //   field: "week1Quantity",
        //   filter: false,
        //   width: 100,
        //   editable: false,
        //   enableRowGroup: false,
        //   cellStyle: {
        //     textAlign: 'center'
        //   },
        //   // headerClass: 'rag-grey',
        // },
        {
          headerName: "Week Of Ordering ",
          field: "week2",
          filter: false,
          width: 130,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // head}
        },
        {
          headerName: "Lot 2",
          field: "week2Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Week Of Ordering ",
          field: "week3",
          filter: false,
          width: 130,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 3",
          field: "week3Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Week Of Ordering ",
          field: "week4",
          filter: false,
          width: 130,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
        {
          headerName: "Lot 4",
          field: "week4Quantity",
          filter: false,
          width: 100,
          editable: false,
          enableRowGroup: false,
          headerClass: 'text-center',
          cellStyle: {
            textAlign: 'right'
          },
          // headerClass: 'rag-grey',
        },
      ]
    }
  ]
}