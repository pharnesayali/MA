import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { CompanyComponent } from "./components/company/company.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SharedModule } from "../shared/shared.module";
import { AgGridModule } from "ag-grid-angular";
import { MrpComponent } from "./components/mrp/mrp.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewDocumentComponent } from './components/view-document/view-document.component';
import { StockComponent } from './components/stock/stock.component';
import { InoviceComponent } from './components/inovice/inovice.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { PlantMasterComponent } from './components/plant-master/plant-master.component';
import { MaterialMasterComponent } from './components/material-master/material-master.component';
import { BuyersPermissionComponent } from './components/buyers-permission/buyers-permission.component';
import { CustomHeaderComponent } from './templates/custom-header/custom-header.component';
import { ItemMasterComponent } from './components/item-master/item-master.component';
import { UserActionRendererComponent } from './templates/user-action-renderer/user-action-renderer.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ItemSupplierMasterComponent } from './components/item-supplier-master/item-supplier-master.component';
import { OrderGenerationComponent } from './components/order-generation/order-generation.component';
import { PopoverModule } from "ngx-bootstrap/popover";
import { ReceiptsComponent } from './components/receipts/receipts.component';
import { KeyDataComponent } from './components/key-data/key-data.component';
import { HomeComponent } from './components/home/home.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { GrnComponent } from './components/grn/grn.component';
import { ConsumptionComponent } from './Reports/consumption/consumption.component';
import { DailyShipmentComponent } from './Reports/daily-shipment/daily-shipment.component';
import { NonMovingComponent } from './Reports/non-moving/non-moving.component';
import { ChangeInvoiceDateComponent } from './templates/change-invoice-date/change-invoice-date.component';
import { MvmTypeMasterComponent } from './components/mvm-type-master/mvm-type-master.component';
import { PlantDivisionMasterComponent } from './components/plant-division-master/plant-division-master.component';
import { AbcAnalysisComponent } from './components/abc-analysis/abc-analysis.component';
import { SlowMovingComponent } from './components/slow-moving/slow-moving.component';
import { InventoryCorrectionComponent } from './components/inventory-correction/inventory-correction.component';
import { ItrFormatComponent } from './components/itr-format/itr-format.component';
import { OrderMaturityTrackingComponent } from './components/order-maturity-tracking/order-maturity-tracking.component';
import { MrpAnalysisComponent } from './components/mrp-analysis/mrp-analysis.component';
import { MrpAnalysisPartWiseComponent } from './components/mrp-analysis-part-wise/mrp-analysis-part-wise.component';
import { ShortageReportsComponent } from './components/shortage-reports/shortage-reports.component';
import { GitPastDataComponent } from './components/git-past-data/git-past-data.component';
import { ItrListComponent } from './components/itr-list/itr-list.component';
import { MrpPastDataComponent } from './components/mrp-past-data/mrp-past-data.component';
import { GrnPastDataComponent } from './components/grn-past-data/grn-past-data.component';
import { OrderMaturityRendererComponent } from './templates/order-maturity-renderer/order-maturity-renderer.component';
import { StockPastDataComponent } from './components/stock-past-data/stock-past-data.component';
import { ErrorLogRendererComponent } from './templates/error-log-renderer/error-log-renderer.component';
import { MrpAnalysisPlantWiseComponent } from './components/mrp-analysis-plant-wise/mrp-analysis-plant-wise.component';
import { OrderListActionRendererComponent } from './templates/order-list-action-renderer/order-list-action-renderer.component';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [

    CompanyComponent,
    MrpComponent,
    DashboardComponent,
    ViewDocumentComponent,
    StockComponent,
    InoviceComponent,
    ViewOrderComponent,
    PlantMasterComponent,
    MaterialMasterComponent,
    BuyersPermissionComponent,
    CustomHeaderComponent,
    ItemMasterComponent,
    UserActionRendererComponent,
    UserManagementComponent,
    ItemSupplierMasterComponent,
    OrderGenerationComponent,
    ReceiptsComponent,
    KeyDataComponent,
    HomeComponent,
    OrderListComponent,
    GrnComponent,
    ConsumptionComponent,
    DailyShipmentComponent,
    NonMovingComponent,
    ChangeInvoiceDateComponent,
    MvmTypeMasterComponent,
    PlantDivisionMasterComponent,
    AbcAnalysisComponent,
    SlowMovingComponent,
    InventoryCorrectionComponent,
    ItrFormatComponent,
    OrderMaturityTrackingComponent,
    MrpAnalysisComponent,
    MrpAnalysisPartWiseComponent,
    ShortageReportsComponent,
    GitPastDataComponent,
    ItrListComponent,
    MrpPastDataComponent,
    GrnPastDataComponent,
    OrderMaturityRendererComponent,
    OrderMaturityRendererComponent,
    StockPastDataComponent,
    ErrorLogRendererComponent,
    MrpAnalysisPlantWiseComponent,
    OrderListActionRendererComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    NgSelectModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    TextMaskModule,
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  bootstrap: [
  ],
  providers: [DatePipe],
})
export class AdminModule { }
