import { BuyersPermissionComponent } from "./components/buyers-permission/buyers-permission.component";
import { PlantMasterComponent } from "./components/plant-master/plant-master.component";
import { StockComponent } from "./components/stock/stock.component";
import { ViewDocumentComponent } from "./components/view-document/view-document.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./components/company/company.component";
import { MrpComponent } from "./components/mrp/mrp.component";
import { InoviceComponent } from "./components/inovice/inovice.component";
import { ViewOrderComponent } from "./components/view-order/view-order.component";
import { MrpActionRendererComponent } from "./templates/mrp-action-renderer/mrp-action-renderer.component";
import { MaterialMasterComponent } from "./components/material-master/material-master.component";
import { ItemMasterComponent } from "./components/item-master/item-master.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { ItemSupplierMasterComponent } from "./components/item-supplier-master/item-supplier-master.component";
import { OrderGenerationComponent } from "./components/order-generation/order-generation.component";
import { ReceiptsComponent } from "./components/receipts/receipts.component";
import { HomeComponent } from "./components/home/home.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { GrnComponent } from "./components/grn/grn.component";
import { ConsumptionComponent } from "./Reports/consumption/consumption.component";
import { DailyShipmentComponent } from "./Reports/daily-shipment/daily-shipment.component";
import { NonMovingComponent } from "./Reports/non-moving/non-moving.component";
import { MvmTypeMasterComponent } from "./components/mvm-type-master/mvm-type-master.component";
import { PlantDivisionMasterComponent } from "./components/plant-division-master/plant-division-master.component";
import { SlowMovingComponent } from "./components/slow-moving/slow-moving.component";
import { AbcAnalysisComponent } from "./components/abc-analysis/abc-analysis.component";
import { InventoryCorrectionComponent } from "./components/inventory-correction/inventory-correction.component";
import { ItrFormatComponent } from "./components/itr-format/itr-format.component";
import { OrderMaturityTrackingComponent } from "./components/order-maturity-tracking/order-maturity-tracking.component";
import { MrpAnalysisComponent } from "./components/mrp-analysis/mrp-analysis.component";
import { MrpAnalysisPartWiseComponent } from "./components/mrp-analysis-part-wise/mrp-analysis-part-wise.component";
import { ShortageReportsComponent } from "./components/shortage-reports/shortage-reports.component";
import { GitPastDataComponent } from "./components/git-past-data/git-past-data.component";
import { ItrListComponent } from "./components/itr-list/itr-list.component";
import { MrpPastDataComponent } from "./components/mrp-past-data/mrp-past-data.component";
import { GrnPastDataComponent } from "./components/grn-past-data/grn-past-data.component";
import { StockPastDataComponent } from "./components/stock-past-data/stock-past-data.component";
import { MrpAnalysisPlantWiseComponent } from "./components/mrp-analysis-plant-wise/mrp-analysis-plant-wise.component";

const routes: Routes = [
  {
    path: "MRP",
    component: MrpComponent,
    data: {
      breadcrumb: "MRP",
    },
  },

  {
    path: "home",
    component: HomeComponent,
    data: {
      breadcrumb: "Home",
    },
  },

  {
    path: "plantMaster",
    component: PlantMasterComponent,
    data: {
      breadcrumb: "Plant Master",
    },
  },

  {
    path: "user",
    component: UserManagementComponent,
    data: {
      breadcrumb: "Manage User",
    },
  },
  {
    path: "itemMaster",
    component: ItemMasterComponent,
    data: {
      breadcrumb: "Item Master",
    },
  },

  {
    path: "itemSupplierMaster",
    component: ItemSupplierMasterComponent,
    data: {
      breadcrumb: "Plant Supplier Item Master",
    },
  },

  {
    path: "generateOrder",
    component: OrderGenerationComponent,
    data: {
      breadcrumb: "Order Generation",
    },
  },

  {
    path: "materialMaster",
    component: MaterialMasterComponent,
    data: {
      breadcrumb: "Material Master",
    },
  },

  {
    path: "invoice",
    component: InoviceComponent,
    data: {
      breadcrumb: "Invoice",
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      breadcrumb: "Dashboard",
    },
  },
  {
    path: "buyerPermission",
    component: BuyersPermissionComponent,
    data: {
      breadcrumb: "Buyer Supplier Allocation",
    },
  },

  {
    path: "viewOrder",
    component: ViewOrderComponent,
    data: {
      breadcrumb: "View Order",
    },
  },

  {
    path: "receipts",
    component: ReceiptsComponent,
    data: {
      breadcrumb: "GIT Today",
    },
  },
  {
    path: "GRN",
    component: GrnComponent,
    data: {
      breadcrumb: "GRN Today",
    },
  },

  {
    path: "stockData",
    component: StockComponent,
    data: {
      breadcrumb: "Stock Data Today ",
    },
  },

  {
    path: "stockDataPast",
    component: StockPastDataComponent,
    data: {
      breadcrumb: "Stock Data ",
    },
  },
  // {
  //   path: "changeInvoiceDate",
  //   component: ChangeInoviceDateComponent,
  //   data: {
  //     breadcrumb: "Change Invoice Date",
  //   },
  // },

  {
    path: "ViewDoc",
    component: ViewDocumentComponent,
    data: {
      breadcrumb: "Document",
    },
  },

  // {
  //   path: "generateOrder",
  //   component: OrderGenerationComponent,
  //   data: {
  //     breadcrumb: "Document",
  //   },
  // },

  {
    path: "order",
    component: OrderListComponent,
    data: {
      breadcrumb: "Orders",
    },
  },

  {
    path: "viewOrder",
    component: ViewOrderComponent,
    data: {
      breadcrumb: "Document",
    },
  },
  {
    path: "company",
    component: CompanyComponent,
    data: {
      breadcrumb: "Company Profile",
    },
  },
  {
    path: "generateOrder",
    component: OrderGenerationComponent,
    data: {
      breadcrumb: "Document",
    },
  },
  {
    path: "MRP",
    component: MrpComponent,
    data: {
      breadcrumb: "MRP",
    },
  },
  {
    path: "mrp-past-data",
    component: MrpPastDataComponent,
    data: {
      breadcrumb: "MRP Past Data",
    },
  },
  {
    path: "MvmTypeMaster",
    component: MvmTypeMasterComponent,
    data: {
      breadcrumb: "Movement Type Master",
    },
  },

  {
    path: "plantDivisionMaster",
    component: PlantDivisionMasterComponent,
    data: {
      breadcrumb: "Plant Division Master",
    },
  },
  {
    path: "Consumption",
    component: ConsumptionComponent,
    data: {
      breadcrumb: "Consumption",
    },
  },
  {
    path: "Daily-Shipment",
    component: DailyShipmentComponent,
    data: {
      breadcrumb: "Daily Shipment",
    },
  },
  {
    path: "Non-Moving",
    component: NonMovingComponent,
    data: {
      breadcrumb: "Non-Moving",
    },
  },
  {
    path: "slow-moving",
    component: SlowMovingComponent,
    data: {
      breadcrumb: "Slow Moving",
    },
  },
  {
    path: "abcanalysis",
    component: AbcAnalysisComponent,
    data: {
      breadcrumb: "ABC Analysis",
    },
  },

  {
    path: "inventoryCorrection",
    component: InventoryCorrectionComponent,
    data: {
      breadcrumb: "Inventory Correction",
    },
  },
  {
    path: "grnPastData",
    component: GrnPastDataComponent,
    data: {
      breadcrumb: "GRN Past Data",
    },
  },
  {
    path: "order-maturity",
    component: OrderMaturityTrackingComponent,
    data: {
      breadcrumb: "Order Maturity Tracking",
    },
  },
  {
    path: "itr-list",
    component: ItrListComponent,
    data: {
      breadcrumb: "ITR",
    },
  },

  {
    path: "itr-format",
    component: ItrFormatComponent,
    data: {
      breadcrumb: "ITR Report",
    },
  },

  {
    path: "MRPAnalysis",
    component: MrpAnalysisComponent,
    data: {
      breadcrumb: "MRP Analysis",
    },
  },
  {
    path: "MRPAnalysisPartWise",
    component: MrpAnalysisPartWiseComponent,
    data: {
      breadcrumb: "MRP Analysis Part Wise",
    },
  },

  {
    path: "MrpAnalysisPlantWise",
    component: MrpAnalysisPlantWiseComponent,
    data: {
      breadcrumb: "MRP Analysis Plant Wise",
    },
  },

  {
    path: "ShortageReport",
    component: ShortageReportsComponent,
    data: {
      breadcrumb: "Shortage Report",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
