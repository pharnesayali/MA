
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MRPComponentComponent } from "./components/mrpcomponent/mrpcomponent.component";


const routes: Routes = [
  {
    path: "MRP",
    component: MRPComponentComponent,
    data: {
      breadcrumb: "MRP",
    },
  },
//   {
//     path: "stock",
//     component: StockComponent,
//     data: {
//       breadcrumb: "Stock",
//     },
//   },
//   {
//     path: "inovice",
//     component: InoviceComponent,
//     data: {
//       breadcrumb: "Invoice",
//     },
//   },
//   {
//     path: "dashboard",
//     component: DashboardComponent,
//     data: {
//       breadcrumb: "Dashboard",
//     },
//   },
//   {
//     path: "createOrder",
//     component: CreateOrderComponent,
//     data: {
//       breadcrumb: "Create Order",
//     },
//   },
//   {
//     path: "viewOrder",
//     component: ViewOrderComponent,
//     data: {
//       breadcrumb: "View Order",
//     },
//   },
//   {
//     path: "openOrder",
//     component: OpenOrderComponent,
//     data: {
//       breadcrumb: "Open Order",
//     },
//   },
//   {
//     path: "changeInvoiceDate",
//     component: ChangeInoviceDateComponent,
//     data: {
//       breadcrumb: "Change Invoice Date",
//     },
//   }, 
//   {
//     path: "goodsInTransit",
//     component: GoodsInTransitComponent,
//     data: {
//       breadcrumb: "Goods In Transit",
//     },
//   },

//   {
//     path: "dailyShipment",
//     component: DailyShipmentComponent,
//     data: {
//       breadcrumb: "Daily Shipment",
//     },
//   },
//   {
//     path: "paymentDue",
//     component: PaymentDueComponent,
//     data: {
//       breadcrumb: "Payment Due- FBL1N ",
//     },
//   },
//   {
//     path: "recepitgrn",
//     component: ReceiptGrnComponent,
//     data: {
//       breadcrumb: "Receipt GRN ",
//     },
//   },
//   {
//     path: "openOrderMaturity",
//     component: OpenOrderMaturityComponent,
//     data: {
//       breadcrumb: "Open Order Maturity Report",
//     },
//   },
//   {
//     path: "orderWorking",
//     component: OrderWorkingComponent,
//     data: {
//       breadcrumb: "Order Working",
//     },
//   },
//   {
//     path: "totalOrder",
//     component: TotalOrderComponent,
//     data: {
//       breadcrumb: "Total Order ",
//     },
//   },
//   {
//     path: "moqConfirmation",
//     component: MoqConfirmationComponent,
//     data: {
//       breadcrumb: "MOQ Confirmation ",
//     },
//   },
  // {
  //   path: "airOrderConfirmation",
  //   component: AirOrderConfirmationComponent,
  //   data: {
  //     breadcrumb: "Air Order Confirmation ",
  //   },
  // },
//   {
//     path: "mrpAnalysis",
//     component: MrpAnalysisComponent,
//     data: {
//       breadcrumb: "MRP Analysis ",
//     },
//   },
//   {
//     path: "inventoryCorrection",
//     component: InventoryCorrectionComponent,
//     data: {
//       breadcrumb: "Inventory Correction ",
//     },
//   },
//   {
//     path: "ViewDoc",
//     component: ViewDocumentComponent,
//     data: {
//       breadcrumb: "Document",
//     },
//   },
//   {
//     path: "company",
//     component: CompanyComponent,
//     data: {
//       breadcrumb: "Company Profile",
//     },
//   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
