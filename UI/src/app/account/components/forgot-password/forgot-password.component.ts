import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

import { NotifierService } from 'src/app/shared/services/notifier.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService, private spinner: NgxSpinnerService, private notifier: NotifierService, private router: Router, ) {
    this.user = new User();
  }

  ngOnInit() {
    $('.full-height').height($(window).height());
  }

  forgotPassword(form: NgForm) {
    this.spinner.show();
    // this.accountService.forgotpasword(this.user).subscribe((res: any) => {
    //   if (res.message.code === 200) {
    //     this.spinner.hide();
    //     this.notifier.notify(
    //       res.message.summary,
    //       2,
    //     );
    //     this.router.navigate(['/']);

    //   } else {
    //     this.spinner.hide();
    //     this.notifier.notify(
    //       res.message.summary,
    //       3,
    //     );
    //   }
    // }, (err) => {
    //   this.spinner.hide();
    //   this.notifier.notify(
    //     err.message,
    //     4,
    //   );
    // });
  }

}
