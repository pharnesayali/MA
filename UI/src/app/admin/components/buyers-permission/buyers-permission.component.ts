import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/shared/services/notifier.service';
declare var $: any;
@Component({
  selector: 'app-buyers-permission',
  templateUrl: './buyers-permission.component.html',
  styleUrls: ['./buyers-permission.component.scss']
})
export class BuyersPermissionComponent implements OnInit {
  gridOptions: GridOptions;
  columnSecondGridOptions: GridOptions;
  columnFirstGridOptions: GridOptions;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  suppressRowClickSelection: any;
  gridApi: any;
  firstgridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  selectedBuyerList: any[];
  rowGroupPanelShow: string;
  selectedSupplierList: any;
  supplierSelectedList: any;
  rowData: any;
  grid: boolean;
  formData: FormData;
  uploadForm: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  defaultColDef: any;
  selectedBuyer: any;
  autoGroupColumnDef: any;
  getDataPath: any;
  buyerPermissionData = [];
  selectedbuyer: any;
  selectedZone: any;
  selectedPlant: any;
  zoneList: any;
  buyerList: any;
  plantList: any;
  supplierList: any;
  columnFirst: any;
  columnSecond: any;
  deletedSupplierList: any;
  fileUploadedList: any;
  updatedDate = new Date();

  /**  ***** ColumnDef for buyer ***** */
  columnDefs = [
    {
      headerName: "Supplier Code",
      headerClass: 'text-center',
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 200,
      cellStyle: {
        textAlign: 'right'
      },
      colId: "supplierId",
    },
    {
      headerName: "Supplier Name",
      headerClass: 'text-center',
      field: "SupplierName",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 200,
      colId: "supplier",
    },
    {
      headerName: "Plant Code",
      field: "PlantCode",
      headerClass: 'text-center',
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 200,
      colId: "Plant",
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: 'text-center',
      width: 90,
      cellRenderer: function (params) {
        if (
          params !== null &&
          params !== undefined &&
          params.data !== undefined &&
          params.data !== null
        ) {
          return '<span class="padding-left-20 c-pointer"> <img src="assets/images/grid-delete-icon.svg" /></span>'
        }
      },
      editable: false,
      filter: false,
      colId: "action",
    },
  ];

  /**  ***** ColumnDef for Supplier ***** */
  zonePlantcolumnDefs = [
    {
      filter: false,
      width: 100,
      editable: false,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Supplier Code",
      field: "SupplierCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 150,
      headerClass: 'text-center',
      colId: "supplierId",
      //   checkboxSelection: true,
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      headerName: "Supplier Name",
      field: "SupplierName",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Name",
      width: 200,
      headerClass: 'text-center',
      colId: "supplier",
    },
    {
      headerName: "Plant Code",
      field: "PlantCode",
      headerClass: 'text-center',
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 150,
      colId: "Plant",
      cellStyle: {
        textAlign: 'right'
      }
    },
  ];

  public groupDefaultExpanded = -1;
  gridColumnApisecond: any;
  secondgridApi: any;
  uploadedDate: Date;
  deletedData: any;

  /**  ***** OnGridReady for buyer ***** */
  onGridReady(params) {
    this.firstgridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.forEachNode((node) => {
      if (node.data?.selected) {
        node.setSelected(true);
      }
    });
  }

  /**  ***** onGridReady for Plant zone ***** */
  onGridReadysecond(params) {
    this.secondgridApi = params.api;
    this.gridColumnApisecond = params.columnApi;
    params.api.forEachNode((node) => {
      if (node.data?.selected) {
        node.setSelected(true);
      }
    });
  }
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient,
    private notifier: NotifierService
  ) {
    this.grid = false;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.suppressRowClickSelection = true;
    this.fileUploadedList = [];
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
    this.deletedSupplierList = [];
    this.selectedSupplierList = [];
    this.selectedBuyerList = [];
    this.supplierList = [];
    this.columnSecond = [];
    this.columnFirst = [];
    this.supplierSelectedList = [];
    this.gridOptions = {
      // groupSelectsChildren: true,
      rowSelection: 'multiple',
    }
    this.columnSecondGridOptions = {
      rowSelection: 'multiple'
    }

    this.columnFirstGridOptions = {
      rowSelection: 'multiple'
    }
    this.deletedSupplierList = [];
  }


  ngOnInit(): void {
    // this.getBuyersPermission();
    this.getZoneList();
    this.getBuyerList();
    this.getFileUploadedDetails()
    // this.getPlantList();
  }

  getFileUploadedDetails() {
    this.adminService.getFileUploadedDate().subscribe(
      (res) => {
        if (res) {
          this.fileUploadedList = res.Result.Result;
        }
      })
  }

  /* get buyer permission list*/
  getBuyersPermission() {
    this.spinner.show();
    this.http.get<any>("http://localhost:3000/buyerPermissionData").subscribe(res => {
      if (res) {
        this.buyerPermissionData = res;
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

  getZoneList() {
    this.spinner.show();
    this.adminService.getZonelist().subscribe(
      (res) => {
        if (res) {
          if (res.Message) {
            this.notifier.notify("Zone list does not exists!", 1);
            this.spinner.hide();
          }
          else {
            this.zoneList = res;
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

  getPlantList() {
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/plantList").subscribe(res => {
    this.adminService.getPlantList().subscribe((res) => {
      if (res) {
        if (res.Message) {
          this.notifier.notify("Plant list does not exists!", 1);
          this.spinner.hide();
        }
        else {
          this.plantList = res;
          this.spinner.hide();
        }
      }
      else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      })
  }

  getBuyerList() {
    // this.spinner.show();
    // this.http.get<any>("http://localhost:3000/buyerList").subscribe((res) => {
    this.adminService.getBuyerList().subscribe((res) => {
      if (res) {
        if (res.Message) {
          this.notifier.notify("Buyer list does not exists!", 1);
          this.spinner.hide();
        }
        else {
          this.buyerList = res.Result;
          this.spinner.hide();
        }
      }
      else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      })
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

  /** **** Get the plant list accoring to the zone ***** */
  changeZone() {
    this.spinner.show();
    const data = {
      zone: this.selectedZone
    }
    this.adminService.getZonePlantList(data).subscribe(
      (res) => {
        if (res) {
          if (res.Message) {
            this.notifier.notify("Zone list does not exists !", 1);
            this.spinner.hide();
          }
          else {
            this.plantList = res;
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

  /* apply changes */
  // apply() {
  //   this.selectedBuyerList = new Array<any>();
  //   if (this.firstgridApi !== null && this.firstgridApi !== undefined) {
  //     this.firstgridApi.forEachNodeAfterFilterAndSort((node) => {
  //       if (node.isSelected()) {
  //         this.selectedBuyerList.push(node.data);
  //       }
  //     });
  //   }
  //   if (this.secondgridApi !== null && this.secondgridApi !== undefined) {
  //     this.secondgridApi.forEachNodeAfterFilterAndSort((node) => {
  //       if (node.isSelected()) {
  //         this.selectedBuyerList.push(node.data);
  //       }
  //     });
  //   }
  // }

/** **** to update the suppier allocated for articulr buyer **** */
  apply() {
    // this.changedPlant();
    this.spinner.show();
    const data = {
      BuyerCode: this.selectedBuyer,
      data: this.supplierList
    }
    const list = this.supplierList
    this.adminService.addSupplier(data).subscribe((res) => {
      if (res) {
        if (res.Message) {
          this.notifier.notify("Supplier can not be updated!", 1);
          this.spinner.hide();
        }
        else {
          //   this.buyerList = res;
          this.notifier.notify("Supplier updated Successfully!", 1);
          this.getBuyerList();
          this.spinner.hide();
        }
      }
      else {
        this.notifier.notify("Supplier updated Successfully!", 1);
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      })

  }

  /***** confirm delete box *****/
  onDeleteClicked() {
    this.onBuyerClicked(this.deletedData);
  }

  /***** to delete particular buyer from the supplier list ***** */
  onBuyerClicked(event) {
    for (let i = 0; i < this.supplierList.length; i++) {
      if (this.supplierList[i]["SupplierCode"] === event.SupplierCode &&
        this.supplierList[i]["PlantCode"] === event.PlantCode) {
        this.supplierList.splice(i, 1);
        break;
      }
    }
    this.closeDeleteSpplier();
    this.secondgridApi.refreshCells();
    this.secondgridApi.refreshView();
    this.secondgridApi.setRowData(
      this.columnSecondGridOptions.rowData
    );
  }

  /***** method gets called when click on delete icon *****  */
  onCellClicked(event) {
    if (event !== null &&
      event !== undefined &&
      event.colDef !== null &&
      event.colDef !== undefined &&
      event.colDef.colId !== undefined &&
      event.colDef.colId !== null &&
      event.colDef.colId === "action"
    ) {
      this.deletedData = event.data
      $(".item-supplier-SOB, .common-bg").show();
      document.getElementById('delete-supplier').style.display = 'block';
    }
  }

  closeDeleteSpplier() {
    $(".item-supplier-SOB, .common-bg").hide();
    document.getElementById('delete-supplier').style.display = 'none';
  }

  searchFilter(form: NgForm) {
    this.spinner.show();
    if (form.valid) {
      const data = {
        buyer: this.selectedBuyer,
        zone: this.selectedZone,
        plant: this.selectedPlant
      }
      this.http.get<any>("http://localhost:3000/supplierList").subscribe(res => {
        if (res) {
          this.supplierList = res;
          // this.grid = true;
          // if (this.supplierList !== null && this.supplierList !== undefined && this.supplierList.length > 0) {
          //   const middleIndex = Math.ceil(this.supplierList.length / 2);
          //   this.columnFirst = this.supplierList.splice(0, middleIndex);
          //   this.columnSecond = this.supplierList.splice(-middleIndex);
          //   //   this.gridApi.forEachNode((node) =>
          //   //   node.setSelected(!!node.data && node.data.selected === true)
          //   // );
          // }
          //   this.gridApi.forEachNode((node) =>
          //   node.setSelected(!!node.data && node.data.selected === true)
          // );

          //   param.api.forEachNode((node) =>
          //   node.setSelected(!!node.data && node.data.selected === true)
          // );
          //  if (this.gridApi !== null && this.gridApi !== undefined) {
          // //   for(let i=0; i<=this.gridApi.length ;i++ ){
          // //     this.gridApi.getRowNode(i).setSelected(true);
          // //   }
          //   this.gridOptions.api.forEachNode( function (node) {
          //     node.setSelected(true);

          //  });
          // this.gridApi.forEachNode((node) => {
          //   if (node !== null && node !== undefined && node.data !== null && node.data !== undefined && node.data.selected === true) {
          //     node.setSelected(true);

          //     //  this.gridApi.refreshCells(node.data);
          //   }
          // });
          // }

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
    this.grid = false;

  }

  // getsupplierListByZonePlant(form: NgForm) {
  //   this.spinner.show();
  //   if (form.valid) {
  //     const data = {
  //     //  buyer: this.selectedBuyer,
  //       zone: this.selectedZone,
  //       plant: this.selectedPlant
  //     }
  //     this.http.get<any>("http://localhost:3000/selectedSupplierList").subscribe(res => {
  //       if (res) {
  //         this.selectedSupplierList = res;
  //         this.spinner.hide();
  //       }
  //       else {
  //         this.spinner.hide();
  //       }
  //     },
  //       (err) => {
  //         this.spinner.hide();
  //       })
  //   }
  //   this.grid = false;
  // }

  /***** cancel button under the buyer-supplier list list *****/
  resetData() {
    this.changedBuyer();
  }

  /***** get the list of supplier for the particular buyer ***** */
  changedBuyer() {
    this.spinner.show();
    const data = {
      Buyer: this.selectedBuyer
    }
    // this.http.get<any>("http://localhost:3000/supplierList").subscribe(
    this.adminService.getBuyerSupplierList(this.selectedBuyer).subscribe(
      (res) => {
        if (res) {
          if (res.Message) {
            this.supplierList = [];
            //   this.notifier.notify(res.Message, 1);
            this.spinner.hide();
          }
          else {
            this.supplierList = res.Rows;
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

  /***** get the Supplier list of plant according to selected zone and plant *******/
  changedPlant() {
    this.selectedSupplierList = [];
    const data = {
      plant: this.selectedPlant.join(),
    }
    this.spinner.show();
    // this.http.get<any>("http://localhost:3000/selectedSupplierList").subscribe(
    this.adminService.getSupplierListByPlant(data).subscribe(
      res => {
        if (res) {
          if (res.Message) {
            this.selectedSupplierList = [];
            this.notifier.notify("Supplier list does not exists!", 1);
            this.spinner.hide();
          }
          else {
            this.selectedSupplierList = res.Response;
            this.spinner.hide();

          }
        }
        else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      })
  }

  /*****  to add the supplier from zone plant to buyer grid*****/
  addSupplier() {
    this.supplierSelectedList = [];
    if (this.firstgridApi !== null && this.firstgridApi !== undefined) {
      this.firstgridApi.forEachNodeAfterFilterAndSort((node) => {
        if (node.isSelected()) {
          const list = this.supplierList.find(x => (x.SupplierCode === node.data.SupplierCode && x.PlantCode === node.data.PlantCode));
          if (list === null || list === undefined) {
            const data = {
              SupplierCode: node.data.SupplierCode,
              PlantCode: node.data.PlantCode,
              buyerCode: this.selectedBuyer,
              SupplierName: node.data.SupplierName
            }
            this.supplierSelectedList.push(data);
            this.supplierList = this.supplierList.concat(this.supplierSelectedList);
            this.supplierSelectedList = [];
            // this.notifier.notify("supplier added Successfully", 1)
          }
          else {
            this.notifier.notify("supplier already exists!", 1)
          }
        }
      });
    }
  }

  /***** modal for the last updated data ***** */
  getData() {
    this.uploadedDate = new Date();
    $(".buyer-permisson, .common-bg").show();
    document.getElementById('last-updated-buyers-permission-data').style.display = 'block';
  }

  closeModal() {
    $(".buyer-permisson, .common-bg").hide();
    document.getElementById('last-updated-buyers-permission-data').style.display = 'none';
  }
}

