import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgSelectModule } from "@ng-select/ng-select";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SharedModule } from "../shared/shared.module";
import { AgGridModule } from "ag-grid-angular";
import { BuyerRoutingModule } from "./buyer-routing.module";
import { MRPComponentComponent } from './components/mrpcomponent/mrpcomponent.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [
    MRPComponentComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
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
export class BuyerModule {}
