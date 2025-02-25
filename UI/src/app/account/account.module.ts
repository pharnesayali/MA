import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { FormsModule } from "@angular/forms";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SharedModule } from "../shared/shared.module";
import { PopoverModule } from "ngx-bootstrap/popover";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    SharedModule,
    PopoverModule.forRoot()
  ],
  exports: [LoginComponent]
})
export class AccountModule {}
