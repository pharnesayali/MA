import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./layouts/main-layout/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { BreadcrumbsDirective } from "./directives/breadcrumbs.directive";
import { BreadcrumbComponent } from "./layouts/breadcrumb/breadcrumb.component";
import { GraphsComponent } from "./templates/graphs/graphs.component";
import { GoogleChartsModule } from "angular-google-charts";
import { OnlyNumberDirective } from "./directives/only-number.directive";
import { HeaderComponent } from "./layouts/main-layout/header/header.component";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NotifierComponent } from "./layouts/notifier/notifier.component";
import { TitleCaseDirective } from "./directives/title-case.directive";
import { CurrencypipePipe } from "./pipes/currencypipe.pipe";
import { UndoDirective } from "./directives/undo.directive";
import { RedoDirective } from "./directives/redo.directive";
import { NegativeNumberDirective } from "./directives/negative-number.directive";
import { PopoverModule } from "ngx-bootstrap/popover";
@NgModule({
  declarations: [
    LoginLayoutComponent,
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsDirective,
    BreadcrumbComponent,

    GraphsComponent,
    OnlyNumberDirective,
    NegativeNumberDirective,
    NotifierComponent,
    TitleCaseDirective,
    CurrencypipePipe,
    UndoDirective,
    RedoDirective,
  ],

  imports: [
    CommonModule,
    RouterModule,
    GoogleChartsModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    PopoverModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsDirective,
    BreadcrumbComponent,
    GraphsComponent,
    OnlyNumberDirective,
    NegativeNumberDirective,
    TitleCaseDirective,
    NotifierComponent,
    CurrencypipePipe,
    UndoDirective,
  ],
})
export class SharedModule {}
