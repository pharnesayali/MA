
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AccountModule } from "./account/account.module";
import { AdminModule } from "./admin/admin.module";
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextMaskModule } from "angular2-text-mask";
import {
  HashLocationStrategy,
  LocationStrategy,
  DatePipe,
  CurrencyPipe,
} from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    AccountModule,
    AdminModule,
    SharedModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    TextMaskModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
