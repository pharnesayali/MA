"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var account_routing_module_1 = require("./account-routing.module");
var login_component_1 = require("./components/login/login.component");
var forgot_password_component_1 = require("./components/forgot-password/forgot-password.component");
var forms_1 = require("@angular/forms");
var change_password_component_1 = require("./components/change-password/change-password.component");
var ngx_spinner_1 = require("ngx-spinner");
var welcome_component_1 = require("./components/welcome/welcome.component");
var shared_module_1 = require("../shared/shared.module");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.LoginComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                change_password_component_1.ChangePasswordComponent,
                welcome_component_1.WelcomeComponent
            ],
            imports: [
                common_1.CommonModule,
                account_routing_module_1.AccountRoutingModule,
                forms_1.FormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                shared_module_1.SharedModule,
                ngx_bootstrap_1.PopoverModule.forRoot()
            ],
            exports: [login_component_1.LoginComponent]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
