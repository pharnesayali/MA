import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AdminService } from '../../admin.service';
declare var $: any;

@Component({
  selector: 'app-order-generation',
  templateUrl: './order-generation.component.html',
  styleUrls: ['./order-generation.component.scss']
})
export class OrderGenerationComponent implements OnInit {
  orderWeek: any;
  selectedType: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  rowGroupPanelShow: string;
  importData = [];
  columnDefs: any[];
  selectedMonth: any;
  orderData: any;
  buyerlist: any;
  selectedBuyer: any;
  uploadedDate = new Date();
  selectedLocationList: any;
  orderLocationList: any;
  max_value: Number;
  statusFlag: boolean;
  weeks:any
  date: Date;
  weekList: any;
  currentUser:any;
  fileUploadedList:any;
  updatedDate = new Date();
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    // var instance = this.gridApi.getFilterInstance("locationId");
    // // instance.setModel(null);
    // instance.setModel({
    //   values: [],
    // });
    // this.gridApi.onFilterChanged();
    //    this.gridApi.selectAll();
    this.gridApi.forEachNode(function (node) {
      node.setSelected(true);
    });
    // this.gridApi.forEachNode((node) => {
    //   if (node.data) {
    //     node.setSelected(true);
    //   }
    // });
  }

  columnState = {
    item_code: 'initial',

  };
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,

    cellClassRules: {
      // "rag-blue"(params) {
      //   if (params.colDef.headerName !== undefined || null) {
      //     if (params.colDef.headerName.includes("Item Code") ||
      //       params.colDef.headerName.includes("Trim") ||
      //       params.colDef.headerName.includes("Description") ||
      //       params.colDef.headerName.includes("UOM") ||
      //       params.colDef.headerName.includes("Supplier") ||
      //       params.colDef.headerName.includes("Buyer") ||
      //       params.colDef.headerName.includes("MOQ")
      //     ) {
      //       return params.value + 1;
      //     }
      //   }
      // },

      "rag-grey"(params) {
        if (params.colDef.headerName !== undefined || null) {
          if (
            params.colDef.headerName.includes("PF Number") ||
            params.colDef.headerName.includes("Approval Remark") ||
            params.colDef.headerName.includes("p1") ||
            params.colDef.headerName.includes("p2") ||
            params.colDef.headerName.includes("p3") ||
            params.colDef.headerName.includes("p4")
          ) {
            return params.value + 1;
          }
        }

      },

      // "rag-pink"(params) {
      //   if (params.colDef.headerName !== undefined || null) {
      //     if (
      //       params.colDef.headerName.includes("Air Quantity") ||
      //       params.colDef.headerName.includes("N-1") ||
      //       params.colDef.headerName.includes("N-2") ||
      //       params.colDef.headerName.includes("N-3") ||
      //       params.colDef.headerName.includes("N-4") ||
      //       params.colDef.headerName.includes("Reason- PI (Auto Link)") ||
      //       params.colDef.headerName.includes("Part Weight") ||
      //       params.colDef.headerName.includes("Total Weight") ||
      //       params.colDef.headerName.includes("Rate /kg") ||
      //       params.colDef.headerName.includes("Total PF Value") 
      //     ){
      //       return params.value + 1;
      //     }

      //   }
      // }
    },

  };

  typeList = [
    {
      id: 1,
      typeName: "Local"
    },
    {
      id: 2,
      typeName: "Local Billing"
    },
    {
      id: 3,
      typeName: "Import"
    }
  ];

  monthList = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  }


  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService,
    private notifier: NotifierService,
    private datepipe: DatePipe
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem("ActiveUser"));
    console.log(this.currentUser)
    this.columnDefs = normalColDefs();
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.selectedLocationList = [];
    this.orderLocationList = [];
    this.max_value = 53;
    this.statusFlag = false;
    this.weeks=[];
    this.fileUploadedList=[];
  }

  ngOnInit(): void {
    //   this.getBuyerList();
    this.getPlantLocationList();
    this.getWeekList();
    this.getFileUploadedDetails();
  }

  getPlantLocationList() {
    this.spinner.show();
    const data = {
      BuyerCode: this.currentUser.EmployeeCode
    }
    this.adminService.getPlantBuyerLocation(data).subscribe(res => {
      // this.http.get<any>("http://localhost:3000/plantLocation").subscribe(res => {
      if (res) {
        if (res.Message) {
        //  this.notifier.notify(res.Message, 1);
          this.orderData = [];
          this.spinner.hide();
        }
        else {
          this.statusFlag = true;
          this.orderData = res;
          this.spinner.hide();
        }
        // this.gridApi.forEachNode((node) =>
        //   node.setSelected(!!node.data && node.data.selected === true)
        // );
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
       // this.notifier.notify(err.message, 4);
      }
    );
  }

  getWeekList() {
    this.adminService.getWeekList().subscribe(res => {
      // this.http.get<any>("http://localhost:3000/plantLocation").subscribe(res => {
      if (res) {
        this.weekList = res.Result;
        for (let item in this.weekList) {
          this.weekList[item].detailWeek =
            this.weekList[item].WeekNumber + " ( From Date " + this.datepipe.transform(this.weekList[item].DateFrom, 'dd/MM/yyyy') + " To Date " + this.datepipe.transform(this.weekList[item].DateTo, 'dd/MM/yyyy') + ")";
            this.weeks.push(this.weekList[item]);
        }
        // this.weekList.forEach((a)=>{
        //   this.weekList(a).detailWeek =
        //   this.weekList(a).WeekNumber + " ( From Date " + this.datepipe.transform(this.weekList(a).DateFrom, 'dd/MM/yyyy') + " To Date " + this.datepipe.transform(this.weekList(a).DateTo, 'dd/MM/yyyy') + ")";
        //   this.weekList.push(this.weekList[a]);
        // })
        // console.log(this.weekList)
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
       // this.notifier.notify(err.message, 4);
      }
    );
  }

  // getBuyerList() {
  //   this.http.get<any>("http://localhost:3000/buyerList").subscribe(res => {
  //     if (res) {
  //       this.buyerlist = res;
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   },
  //     (err) => {
  //       this.spinner.hide();
  //     })
  // }
  getMonth() {
    if (this.orderWeek !== null && this.orderWeek !== undefined) {
      const month = Math.ceil(this.orderWeek / 4.345);
      this.selectedMonth = this.monthList[month];
    }
  }

  getFileUploadedDetails(){
    // this.adminService.getFileUploadedDate().subscribe(
    //   (res)=>{
    //    if(res){
    //     this.fileUploadedList= res.Result.Result;
    //    }
    //   }
    // )

    this.adminService.fileUploadedList.subscribe(
      (res)=>{
        console.log("order",res);
        
      if(res){
       this.fileUploadedList = res;
       this.fileUploadedList.forEach(element => {
        if(element.FileType=== "Item_Master")
        {
          console.log("element.FileType",element.FileType);
          this.updatedDate = element.Date;
        }
       });
       
       
      }
     })
  }
  // generateOrder(form: NgForm) {
  //   this.spinner.show();
  //   if (form.valid && form !== null &&
  //     this.orderWeek !== null &&
  //     this.orderWeek !== undefined &&
  //     this.selectedType !== null &&
  //     this.selectedType !== undefined) {
  //     const data = {
  //       // OrderNumber: "",
  //       OrderDate: new Date(),
  //       CreatedBy: "E6",
  //       WeekNumber: this.orderWeek,
  //       OrderType: this.selectedType,
  //       PlantLocationMapping: "s3d4f5g6h7"
  //     }
  //     this.adminService.getItemMasterList(data).subscribe(
  //       (res) => {
  //         if (res) {
  //           // this.itemData = res.List;
  //           this.spinner.hide();
  //         } else {
  //           this.spinner.hide();
  //         }
  //       },
  //       (err) => {
  //         this.spinner.hide();
  //         //   this.notifier.notify(err.message, 4);
  //       }
  //     );
  //   }
  //   // this.spinner.hide();
  // }

  resetData(form: NgForm) {
    form.resetForm();
  }

  closeGenerateOrder() {
    $(".item-supplier-SOB, .common-bg").hide();
    document.getElementById('generate-order').style.display = 'none';
  }

  onGenerateOrderClick() {
    $(".item-supplier-SOB, .common-bg").show();
    document.getElementById('generate-order').style.display = 'block';
  }

  orderGeneration() {

    const datepipe: DatePipe = new DatePipe('en-US');
    let date = datepipe.transform(new Date(), 'MM-dd-YYYY')
    if (
      this.orderWeek !== null &&
      this.orderWeek !== undefined &&
      this.selectedType !== null &&
      this.selectedType !== undefined
    ) {

      if (this.gridApi !== null && this.gridApi !== undefined) {
        this.gridApi.forEachNodeAfterFilterAndSort((node) => {
          if (node.isSelected()) {
            this.orderLocationList.push(node.data);
          }
        });
      }
      let data = {
        OrderNumber: "",
        OrderDate: date,
        CreatedBy: this.currentUser.EmployeeCode,
        WeekNumber: this.orderWeek,
        OrderType: this.selectedType,
        PlantLocationMapping: this.orderLocationList
      }
      //   let data={
      //     OrderNumber:"4",
      //     OrderDate:"2022-10-01",
      //     CreatedBy:"E7",
      //     WeekNumber:4,
      //     OrderType:"Immdiate",
      //     PlantLocationMapping: this.orderLocationList
      // }

      this.spinner.show();
      this.adminService.generateOrder(data).subscribe(
        (res) => {
          if (res) {
            this.closeGenerateOrder();
            //  this.itemData = res.List;
            this.notifier.notify("Your Order Is Generated Successfully", 1);

            this.router.navigate(['/admin/order']);
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          this.closeGenerateOrder();
          this.spinner.hide();
         // this.notifier.notify(err.message, 4);
        }
      );
    }

  }

  weekData() {
    if (this.orderWeek !== null &&
      this.orderWeek !== undefined &&
      this.orderWeek <= "53" && this.orderWeek !== 0) {

    }
    else {
      this.notifier.notify("Please enter Valid Week No.", 1);
      //  this.orderWeek =null
    }
  }
  getData() {
    // this.router.navigate(["/key-data"]); 
    this.uploadedDate = new Date();
    $(".order-generation, .common-bg").show();
    document.getElementById('last-updated-order-generation-data').style.display = 'block';
  }

  closeModal() {
    $(".order-generation, .common-bg").hide();
    document.getElementById('last-updated-order-generation-data').style.display = 'none';
  }
  cancel() {
    this.statusFlag = false;
    this.selectedType = null;
    this.orderWeek = null;
    this.getPlantLocationList();
  }

  Order() {
    this.router.navigate(['/admin/order']);
  }
}

// function normalColDefs() {
//   return [
//     {
//       headerName: "Item Code",
//       field: "item_code",
//       filter: "agTextColumnFilter",
//       headerTooltip: "Item Code",
//       width: 100,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "Trim",
//       field: "trim",
//       filter: "agTextColumnFilter",
//       headerTooltip: "Trim",
//       width: 100,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "Description",
//       field: "description",
//       filter: "agTextColumnFilter",
//       headerTooltip: "Description",
//       width: 100,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "UOM",
//       field: "uom",
//       filter: "agTextColumnFilter",
//       headerTooltip: "UOM",
//       width: 50,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "Supplier",
//       field: "supplier",
//       filter: "agTextColumnFilter",
//       headerTooltip: "Supplier",
//       width: 100,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "Buyer",
//       field: "buyer",
//       filter: "agTextColumnFilter",
//       headerTooltip: "Buyer",
//       width: 100,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "MOQ",
//       field: "moq",
//       filter: "agTextColumnFilter",
//       headerTooltip: "MOQ",
//       width: 50,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-blue'
//     },
//     {
//       headerName: "N",
//       headerClass: 'rag-pink',
//       children: [
//         {
//           headerName: "Air Quantity",
//           field: "n",
//           headerTooltip: "Air Quantity",
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//           filter: false
//         }
//       ]
//     },
//     {
//       headerName: "N+1",
//       headerClass: 'rag-pink',
//       children: [
//         {
//           headerName: "Air Quantity",
//           field: "n_1",
//           filter: false,
//           headerTooltip: "Air Quantity",
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',

//         }
//       ]
//     },
//     {
//       headerName: "N+2",
//       headerClass: 'rag-pink',
//       children: [
//         {
//           headerName: "Air Quantity",
//           field: "n_2",
//           filter: false,
//           headerTooltip: "Air Quantity",
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         }
//       ]
//     },

//     {
//       headerName: "Reason Plan(Auto Link)",
//       headerClass: 'rag-pink',
//       children: [
//         {
//           headerName: "N-1",
//           field: "n1",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         },
//         {
//           headerName: "N-2",
//           field: "n2",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         },
//         {
//           headerName: "N-3",
//           field: "n3",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         },
//         {
//           headerName: "N-4",
//           field: "n4",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         }
//       ]
//     },

//     {
//       headerName: "Stock Correction",
//       headerClass: 'rag-pink',
//       children: [
//         {
//           headerName: "Reason- PI (Auto Link)",
//           field: "reason_pi",
//           filter: false,
//           headerTooltip: "Reason- PI (Auto Link)",
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-pink',
//         }
//       ]
//     },
//     {
//       headerName: "Part Weight",
//       field: "part_weight",
//       filter: false,
//       headerTooltip: "Part Weight",
//       width: 50,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-pink',
//     },
//     {
//       headerName: "Total Weight",
//       field: "total_weight",
//       filter: false,
//       headerTooltip: "Total Weight",
//       width: 50,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-pink',
//     },
//     {
//       headerName: "Rate /kg",
//       field: "rate",
//       filter: false,
//       headerTooltip: "Rate /kg",
//       width: 50,
//       editable: true,
//       enableRowGroup: false,
//       headerClass: 'rag-pink',
//     },
//     {
//       headerName: "Total PF Value",
//       field: "pf_Value",
//       filter: false,
//       headerTooltip: "Total PF Value",
//       width: 50,
//       editable: false,
//       enableRowGroup: false,
//       headerClass: 'rag-pink',
//     },
//     {
//       headerName: "PF Number",
//       field: "pf_No",
//       filter: false,
//       headerTooltip: "PF Number",
//       width: 50,
//       editable: true,
//       enableRowGroup: false,
//       headerClass: 'rag-grey',
//     },
//     {
//       headerName: "Approval Remark",
//       field: "remark",
//       filter: false,
//       headerTooltip: "Approval Remark",
//       width: 80,
//       editable: true,
//       enableRowGroup: false,
//       headerClass: 'rag-grey',
//     },
//     {
//       headerName: "Approval Plant No.",
//       headerClass: 'rag-grey',
//       children: [
//         {
//           headerName: "p1",
//           field: "p1",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-grey',
//         },
//         {
//           headerName: "p2",
//           field: "p2",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-grey',
//         },
//         {
//           headerName: "p3",
//           field: "p3",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-grey',
//         },
//         {
//           headerName: "p4",
//           field: "p4",
//           filter: false,
//           width: 50,
//           editable: false,
//           enableRowGroup: false,
//           headerClass: 'rag-grey',
//         }
//       ]
//     },
//   ]
// }

function normalColDefs() {
  return [
    {
      filter: false,
      width: 100,
      editable: false,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      onFirstDataRendered: (params) => {
        params.api.forEachNode((node) =>
          node.setSelected(node.data !== null && node.data !== undefined)
        );
        //   enableRowGroup: false,
      },
    },
    {
      headerName: "Plant",
      field: "PlantCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Plant Code",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      //   enableRowGroup: false,
    },
    {
      headerName: "Location",
      field: "SLOC",
      filter: "agTextColumnFilter",
      headerTooltip: "Location",
      width: 100,
      editable: false,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right'
      }
      //   enableRowGroup: false,
    },
    // {
    //   headerName: "Location",
    //   field: "SLOC",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "Plant Code",
    //   width: 200,
    //   editable: false,
    //   checkboxSelection: true,
    //   colId: "locationId",
    //   headerClass: 'text-center',
    //   cellStyle: {
    //     textAlign: 'right'
    //   }
    //   //   headerCheckboxSelection: true
    // },
  ]
}