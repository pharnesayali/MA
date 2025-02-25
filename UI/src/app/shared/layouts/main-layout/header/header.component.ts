import { OnInit, Component } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";
import { AccountService } from "src/app/account/account.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AutoLogOutService } from "../../../../core/services/auto-log-out.service";
declare var settings: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  environment = settings.environment;
  currentUser: User;
  topHeaderColor = settings.colorCode.topHeader;
  userNameColor = settings.colorCode.userName;
  logoutIconColor = settings.colorCode.logoutIcon;
  plantCode: any;
  uploadedDate = new Date();
  user:any;
  username:string;
  userEmail:string;
  userRole:string;
  userPhoneNo:number;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private autoLogoutService: AutoLogOutService
  ) {
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
  }

  logOut() {
    this.spinner.show();
    this.router.navigate(["/"]);
    sessionStorage.clear();
    this.spinner.hide();
  }

  ngOnInit() { }

}
