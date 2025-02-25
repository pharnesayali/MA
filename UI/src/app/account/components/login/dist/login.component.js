"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var constant_1 = require("src/app/shared/models/constant");
var user_1 = require("src/app/shared/models/user");
var environment_1 = require("src/environments/environment");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(ip, accountservice, router, spinner, adminService, notifier) {
        this.ip = ip;
        this.accountservice = accountservice;
        this.router = router;
        this.spinner = spinner;
        this.adminService = adminService;
        this.notifier = notifier;
        this.html = "\n  <div>Your password must be at least 8 characters long,<br>\n  with at least 1 uppercase, 1 lowercase,<br> 1 special character and 1 number.</div>\n  ";
        this.version = environment_1.environment.version;
        this.isDashboard = false;
        this.isModalOpen = false;
        this.showPassword = false;
        this.confirmShowPassword = false;
        this.showChangePassword = false;
        if (settings.dashboard !== undefined && settings.dashboard !== null) {
            this.isDashboard = settings.dashboard;
        }
        this.constants = constant_1.Constant;
        this.user = new user_1.User();
        this.getIP();
        // this.accountservice.isWindowsLogin$.subscribe((val) => {
        //   if (val) {
        //     const userData = {
        //       password: "123456",
        //       userName: "admin",
        //     };
        //     this.WindowsLogin(userData);
        //   }
        // });
    }
    LoginComponent.prototype.getIP = function () {
        var _this = this;
        this.ip.getIPAddress().subscribe(function (res) {
            _this.ipAddress = res.ip;
            _this.user.system_ip = _this.ipAddress;
            //  console.log("Your IP Adderss - " + this.ipAddress);
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        // this.getDeviceDetails();
        $(".full-height").height($(window).height());
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        // var convertedDateString = new Date().toLocaleString();
        // convertedDateString = convertedDateString.replace("at ", "");
        // var convertedDate = new Date(convertedDateString);
        // console.log(convertedDateString);
        // console.log(convertedDate);
    };
    // getDeviceDetails() {
    // }
    LoginComponent.prototype.ngAfterViewInit = function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    LoginComponent.prototype.ngOnChanges = function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    LoginComponent.prototype.toggleShowPassword = function () {
        this.showPassword = !this.showPassword;
    };
    LoginComponent.prototype.toggleChangeShowPassword = function () {
        this.showChangePassword = !this.showChangePassword;
    };
    LoginComponent.prototype.toggleConfirmPassword = function () {
        this.confirmShowPassword = !this.confirmShowPassword;
    };
    LoginComponent.prototype.Login = function (form) {
        var _this = this;
        if (form.valid &&
            (this.user.userName !== undefined || null) &&
            (this.user.password !== undefined || null)) {
            this.spinner.show();
            this.accountservice.login(this.user).subscribe(function (res) {
                if (res.message.code === 200) {
                    _this.user = res.Result;
                    _this.accessToken = res.Data;
                    if (res.Result.first_time_login === "N") {
                        sessionStorage.setItem("AccessToken", res.Data);
                        sessionStorage.setItem("ActiveUser", JSON.stringify(res.Result));
                        _this.isModalOpen = false;
                        if (res.Result.role_id === 1) {
                            _this.router.navigate(["/admin/company"]);
                        }
                        else {
                            if (_this.isDashboard) {
                                _this.router.navigate(["/dashboard/main"]);
                            }
                            else {
                                if (res.Result.program_Role_Count > 0 &&
                                    res.Result.project_Role_Count > 0) {
                                    _this.router.navigate(["/programs/program-console"]);
                                }
                                else if (res.Result.program_Role_Count > 0) {
                                    _this.router.navigate(["/programs/program-console"]);
                                }
                                else if (res.Result.project_Role_Count > 0) {
                                    _this.router.navigate(["/projects/my-projects"]);
                                }
                                else {
                                    _this.router.navigate(["/welcome"]);
                                }
                            }
                        }
                    }
                    else {
                        if (res.Result.role_id === 1) {
                            sessionStorage.setItem("AccessToken", res.Data);
                            sessionStorage.setItem("ActiveUser", JSON.stringify(res.Result));
                            _this.router.navigate(["/admin/company"]);
                        }
                        else {
                            $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
                            _this.user.password = "";
                            _this.isModalOpen = true;
                        }
                    }
                    _this.spinner.hide();
                }
                else {
                    _this.notifier.notify(res.message.summary, 4);
                    form.resetForm();
                    _this.spinner.hide();
                }
                _this.spinner.hide();
            }, function (err) {
                _this.notifier.notify(err.message, 4);
                form.resetForm();
                _this.spinner.hide();
            });
        }
        else {
            this.spinner.hide();
        }
    };
    LoginComponent.prototype.forgotPassword = function () {
        this.notifier.notify("Please contact Administrator to reset your password ", 1);
    };
    LoginComponent.prototype.matchPassword = function () {
        if (this.password === this.confirmPassword) {
            this.isMatch = true;
        }
        else {
            this.isMatch = false;
        }
    };
    LoginComponent.prototype.changePassword = function (form) {
        var _this = this;
        if (form.valid) {
            if (this.password === this.confirmPassword) {
                this.spinner.show();
                this.adminService
                    .newuserchangepassword(this.user.id, this.confirmPassword, this.accessToken)
                    .subscribe(function (res) {
                    if (res.message.code === 200) {
                        sessionStorage.setItem("AccessToken", _this.accessToken);
                        sessionStorage.setItem("ActiveUser", JSON.stringify(_this.user));
                        _this.isModalOpen = false;
                        if (_this.user.program_Role_Count > 0 &&
                            _this.user.project_Role_Count > 0) {
                            _this.router.navigate(["/programs/program-console"]);
                        }
                        else if (_this.user.program_Role_Count > 0) {
                            _this.router.navigate(["/programs/program-console"]);
                        }
                        else if (_this.user.project_Role_Count > 0) {
                            _this.router.navigate(["/projects/my-projects"]);
                        }
                        else {
                            _this.router.navigate(["/welcome"]);
                        }
                        _this.spinner.hide();
                    }
                    else {
                        _this.spinner.hide();
                        _this.notifier.notify(res.message.summary, 3);
                    }
                }, function (err) {
                    _this.spinner.hide();
                    _this.notifier.notify(err.message, 4);
                });
            }
            else {
                this.spinner.hide();
                this.notifier.notify("New password and confirm password does not match", 4);
            }
        }
    };
    LoginComponent.prototype.closeModel = function (form) {
        form.reset();
        this.isModalOpen = false;
    };
    LoginComponent.prototype.WindowsLogin = function (data) {
        var _this = this;
        this.spinner.show();
        this.accountservice.login(data).subscribe(function (res) {
            if (res.message.code === 200) {
                _this.user = res.Result;
                _this.accessToken = res.Data;
                if (res.Result.first_time_login === "N") {
                    sessionStorage.setItem("AccessToken", res.Data);
                    sessionStorage.setItem("ActiveUser", JSON.stringify(res.Result));
                    _this.isModalOpen = false;
                    if (res.Result.role_id === 1) {
                        _this.router.navigate(["/admin/company"]);
                    }
                    else if (res.Result.program_Role_Count > 0 &&
                        res.Result.project_Role_Count > 0) {
                        _this.router.navigate(["/programs/program-console"]);
                    }
                    else if (res.Result.program_Role_Count > 0) {
                        _this.router.navigate(["/programs/program-console"]);
                    }
                    else if (res.Result.project_Role_Count > 0) {
                        _this.router.navigate(["/projects/my-projects"]);
                    }
                    else {
                        _this.router.navigate(["/welcome"]);
                    }
                }
                else {
                    if (res.Result.role_id === 1) {
                        sessionStorage.setItem("AccessToken", res.Data);
                        sessionStorage.setItem("ActiveUser", JSON.stringify(res.Result));
                        _this.router.navigate(["/admin/company"]);
                    }
                    else {
                        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
                        _this.isModalOpen = true;
                    }
                }
                _this.spinner.hide();
            }
            else {
                _this.notifier.notify(res.message.summary, 4);
                _this.spinner.hide();
            }
        }, function (err) {
            _this.notifier.notify(err.message, 4);
            _this.spinner.hide();
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.scss"]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
// if (res.Result.role_id === 2) {
//   this.router.navigate(["/projects/my-projects"]);
// } else if (res.Result.role_id === 3) {
//   this.router.navigate(["/programs/program-console"]);
// } else {
//   this.router.navigate(["/welcome"]);
// }
