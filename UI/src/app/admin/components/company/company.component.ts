
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AdminService } from "../../admin.service";
import { Company } from "src/app/shared/models/company";
import { User } from "src/app/shared/models/user";
import { Constant } from "src/app/shared/models/constant";
import { NotifierService } from "src/app/shared/services/notifier.service";
import { FormBuilder, NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
})
export class CompanyComponent implements OnInit {
  htmls: string = `
  <div class="color-red">Please fill mandatory fields !</div>
  <ul><b> Mandatory Columns </b>
  <li> Password must be 8 characters long</li>
  <li>Password must contain </li>
  <li> Uppercase Letter</li>
  <li> Lowercase Letter</li>
  <li> Number</li>
  <li> Special Character</li>
  </ul>`;
  @ViewChild("Logo") profilePicture: ElementRef;
  user: User;
  company: Company;
  isEdit = false;
  isChange= false;
  isLogo: boolean;
  logo: string;
  accessToken: string;
  constants: any;
  password: string;
  showChangePassword: any;
  confirmShowPassword = false;
  confirmPassword: any;
  isReset = false;
  public mask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  uploadForm: any;
  currentUser: User;
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder
  ) {
    this.constants = Constant;
    this.user = new User();
    this.company = new Company();

    this.company = JSON.parse(sessionStorage.getItem("ActiveUser"));
    this.currentUser = JSON.parse(sessionStorage.getItem('ActiveUser'));
    this.uploadForm = this.formBuilder.group({
      chooseFile: [""],
    });
  }

  ngOnInit() {
    $(".height-main-container").each(function () {
      const myHeight = $(window).height() - 100;
      $(this).slimscroll({
        height: myHeight,
        width: "100%",
      });
    });
  }


}
