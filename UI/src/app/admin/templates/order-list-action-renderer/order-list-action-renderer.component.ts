import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NotifierService } from "src/app/shared/services/notifier.service";
import { AdminService } from "../../admin.service";
import * as _ from "underscore";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-order-list-action-renderer",
  templateUrl: "./order-list-action-renderer.component.html",
  styleUrls: ["./order-list-action-renderer.component.scss"],
})
export class OrderListActionRendererComponent
  implements ICellRendererAngularComp
{
  params: any;
  actionFlag: boolean = false;
  valuesOfLogin: any;
  currentUser: any;
  viewData: boolean = true;
  rrCalculationFile: boolean = true;
  ftvqCalculationFile: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router,
    private adminService: AdminService
  ) {}

  agInit(param: any): void {
    // this.valuesOfLogin = sessionStorage.getItem("ActiveUser");
    this.currentUser = JSON.parse(sessionStorage.getItem("ActiveUser"));
    console.log(this.currentUser);
    this.params = param;
    console.log(
      "params value",
      this.params,
      this.valuesOfLogin,
      this.valuesOfLogin?.EmployeeCode
    );
    // if (this.params.data !== null &&
    //   this.params.data !== undefined &&
    //   this.params.data.Status !== null &&
    //   this.params.data.Status !== undefined &&
    //   (this.params.data.Status === 'completed' ||
    //   this.params.data.Status === "Completed")) {
    this.actionFlag = true;
    // }
  }

  refresh(): boolean {
    return false;
  }

  // openFIle() {
  //   const failBlobData = this.params.value;
  //   if (failBlobData !== undefined && failBlobData !== null) {
  //     var binary_string = window.atob(failBlobData);
  //     var len = binary_string.length;
  //     var bytes = new Uint8Array(len);
  //     for (var i = 0; i < len; i++) {
  //       bytes[i] = binary_string.charCodeAt(i);
  //     }
  //     const fileObservablefile = bytes.buffer;
  //     let blob = new Blob([fileObservablefile], {
  //       type: "text/xlsx;charset=utf-8",
  //     });
  //     var a = window.document.createElement("a");
  //     a.href = window.URL.createObjectURL(blob);
  //     a.download = this.params.data.fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } else {
  //     this.notifier.notify("Data Not Found", 1);
  //   }
  // }

  openFIle(type) {
    let partType = {
      PageCriteria: {
        PageNumberToFetch: 1,
        PageSize: 10,
      },
      TypeOfPart: this.params.data.OrderType,
      WeekNo: this.params.data.WeekNumber,
      BuyerId: this.currentUser.EmployeeCode,

      // PageCriteria: {
      //   PageNumberToFetch: 1,
      //   PageSize: 10,
      // },
      // TypeOfPart: "Import",
      // WeekNo: 45,
      // BuyerId: "E139469",
    };

    // console.log("partType", partType);
    if (type == "RRcalculation") {
      this.viewData = false;
      this.rrCalculationFile = true;
      this.ftvqCalculationFile = false;
      this.adminService.getRRCalculation(partType).subscribe(
        (res) => {
          if (res.Message) {
            this.notifier.notify(res.Message, 1);
            this.spinner.hide();
          } else if (res && !res.message) {
            let rrData = res.Result.Table;
            this.ExportToExcel(rrData, "RRcalculation");
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );
    } else if (type == "FTVQ") {
      this.viewData = false;
      this.rrCalculationFile = false;
      this.ftvqCalculationFile = true;
      this.adminService.getFTVQCalculation(partType).subscribe(
        (res) => {
          if (res.Message) {
            this.notifier.notify(res.Message, 1);
            this.spinner.hide();
          } else if (res && !res.message) {
            let ftvqData = res.Result.Table;
            this.ExportToExcel(ftvqData, "FTVQ");
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
  }

  viewOrderDetail(data) {
    console.log(data);
    this.viewData = true;
    this.rrCalculationFile = false;
    this.ftvqCalculationFile = false;
    this.router.navigate(["/admin/viewOrder"], {
      queryParams: {
        OrderNumber: data.data.ID,
        OrderType: data.data.OrderType,
      },
    });
  }

  ExportToExcel(items: any, type) {
    if (type == "RRcalculation") {
      const data = _.map(items, function (o: any) {
        return _.pick(
          o,
          "ItemCode",
          "LTM",
          "LTW",
          "Demand",
          "DemandPerWeek",
          "PTW",
          "MOQ",
          "NPTW",
          "RatePerUnit",
          "currentStock",
          "Current_Value",
          "UOM",
          "Model",
          "PTC",
          "RPT",
          "NPTC",
          "NPTC_line_MOQ",
          "BS",
          "SS",
          "MAX_Inv",
          "AVG_Inv",
          "MAX_Value",
          "AVG_Value",
          "Actual_Max",
          "Actual_Max_Value",
          "Actual_Avg_Level",
          "Actual_Avg_Level_Value",
          "Daily_Cost_Current",
          "Daily_Cost_Future",
          "Max_No_Of_Days_Future",
          "Current_No_Of_Days",
          "Future_No_Of_Days"
        );
      });

      this.adminService.downloadFile(data, "RR Calculations");
    } else if (type == "FTVQ") {
      const data = _.map(items, function (o: any) {
        return _.pick(
          o,
          "ItemCode",
          "WeekNo",
          "Month_Of_Week",
          "Year",
          "MRP",
          "Receipt",
          "Actual_Closing_Stock",
          "Actual_Coverage",
          "Closing_Stock_consder_Air_ordr_prev_week",
          "Coverage_after_consder_Air_ordr_prev_week",
          "AirOrderReceipt",
          "Coverage2",
          "Value"
        );
      });

      this.adminService.downloadFile(data, "FTVQ Calculations");
    }
  }
}
