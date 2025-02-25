import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/shared/models/constant';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password: string;
  confirmPassword: string;
  constants: any;
  isMatch = true;
  token: any;
  showPassword = false;
  confirmShowPassword = false;
  constructor(private spinner: NgxSpinnerService,
     private adminService: AdminService,
     private router: ActivatedRoute,
     private notifier: NotifierService) {
    this.constants = Constant;
    this.token = router.snapshot.queryParams.kento;
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.confirmShowPassword = !this.confirmShowPassword;
  }

  matchPassword() {
    if (this.password === this.confirmPassword) {
      this.isMatch = true;
    } else {
      this.isMatch = false;
    }
  }

  changePassword(form: NgForm) {
    // if (form.valid) {
    //   this.spinner.show();
    //   if (this.password === this.confirmPassword) {
    //     this.adminService.changePassword(this.token, this.confirmPassword).subscribe((res) => {
    //       if (res.success) {
    //         this.spinner.hide();
    //         this.notifier.notify(
    //           res.message.summary,
    //           2,
    //         );
    //       } else {
    //         this.spinner.hide();
    //         this.notifier.notify(
    //           res.message.summary,
    //           3,
    //         );
    //       }
    //     },
    //       (err) => {
    //         this.spinner.hide();
    //         this.notifier.notify(
    //           err.message.summary,
    //           4,
    //         );
    //       });
    //   } else {
    //     this.notifier.notify(
    //       'Password and confirm password does not match',
    //       4,
    //     );
    //     this.spinner.hide();
    //   }
    // }
  }

}
