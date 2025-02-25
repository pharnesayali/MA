import { OnInit, Component, AfterViewInit, OnChanges } from "@angular/core";
import { Constant } from "src/app/shared/models/constant";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../../account.service";
import { User } from "src/app/shared/models/user";
import { NotifierService } from "src/app/shared/services/notifier.service";
import { IpServiceService } from "src/app/shared/services/ip-service.service";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
declare var $: any;
declare var settings: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit, OnChanges {
  html: string = `
  <div>Your password must be at least 8 characters long,<br>
  with at least 1 uppercase, 1 lowercase,<br> 1 special character and 1 number.</div>
  `;
  user: any;
  version = environment.version;
  isDashboard = false;
  constants: any;
  password: string;
  confirmPassword: string;
  isMatch: boolean;
  isModalOpen = false;
  accessToken: string;
  showPassword = false;
  confirmShowPassword = false;
  showChangePassword = false;
  ipAddress: string;
  constructor(
    private ip: IpServiceService,
    private accountservice: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {
    if (settings.dashboard !== undefined && settings.dashboard !== null) {
      this.isDashboard = settings.dashboard;
    }
    this.constants = Constant;
    this.user = new User();
    this.getIP();
  }
  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.user.system_ip = this.ipAddress;
    });
  }
  ngOnInit() {
    $(".full-height").height($(window).height());
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  ngAfterViewInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  ngOnChanges() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  // toggleShowPassword() {
  //   this.showPassword = !this.showPassword;
  // }

  // toggleChangeShowPassword() {
  //   this.showChangePassword = !this.showChangePassword;
  // }

  // toggleConfirmPassword() {
  //   this.confirmShowPassword = !this.confirmShowPassword;
  // }

  // forgotPassword() {
  //   this.notifier.notify(
  //     "Please contact Administrator to reset your password ",
  //     1
  //   );
  // }

  // matchPassword() {
  //   if (this.password === this.confirmPassword) {
  //     this.isMatch = true;
  //   } else {
  //     this.isMatch = false;
  //   }
  // }

  signIn() {
    if (this.user.userName !== null &&
      this.user.userName !== undefined) {
      this.spinner.show();
      this.accountservice.login(this.user.userName.trim()).subscribe(
        (res) => {
          if (res) {
        //    this.spinner.show();
        console.log(
          "login details", res
        );
        
            if (res.Result !== undefined  && res.Result.IsActive) {
              sessionStorage.setItem("ActiveUser", JSON.stringify(res.Result));
              this.router.navigate(["admin/home"]);
              this.spinner.hide();
            } else {
              this.notifier.notify("Employee ID Does Not Exists.", 4);
              this.spinner.hide();
            }
          }
        }
      )

    }
  }
  // changePassword(form: NgForm) {
  //   // if (form.valid) {
  //   //   if (this.password === this.confirmPassword) {
  //   //     this.spinner.show();
  //   //     this.adminService
  //   //       .changePasswordFirstTime(
  //   //         this.user.id,
  //   //         this.confirmPassword,
  //   //         this.accessToken
  //   //       )
  //   //       .subscribe(
  //   //         (res) => {
  //   //           if (res.message.code === 200) {
  //   //             sessionStorage.setItem("AccessToken", this.accessToken);
  //   //             sessionStorage.setItem("ActiveUser", JSON.stringify(this.user));
  //   //             this.isModalOpen = false;
  //   //             if (this.user.role_id === 1 || this.user.role_id === 0) {
  //   //               this.router.navigate(["/admin/company"]);
  //   //             } else {
  //   //               this.router.navigate(["/welcome"]);
  //   //             }
  //   //             this.spinner.hide();
  //   //           } else {
  //   //             this.spinner.hide();
  //   //             this.notifier.notify(res.message.summary, 3);
  //   //           }
  //   //         },
  //   //         (err) => {
  //   //           this.spinner.hide();
  //   //           this.notifier.notify(err.message, 4);
  //   //         }
  //   //       );
  //   //   } else {
  //   //     this.spinner.hide();
  //   //     this.notifier.notify(
  //   //       "New password and confirm password does not match",
  //   //       4
  //   //     );
  //   //   }
  //   // }
  // }
  // closeModel(form: NgForm) {
  //   form.reset();
  //   this.isModalOpen = false;
  // }
 
}
