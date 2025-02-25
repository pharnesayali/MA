import { Injectable } from "@angular/core";
import { DataService } from "../core/http/data.service";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountService {

  constructor(private dataService: DataService) {}


  login(user) {
   return this.dataService.postDataLogin(`User/Login?EmployeeCode=${user}`, null);
  // return this.dataService.postDataLogin("/loginVendor/authenticateuser", user);
  }

  // forgotpasword(user) {
  //   return this.dataService.postDataLogin("/password/forgot", user);
  // }

  // logOut(): Observable<any> {
  //   return this.dataService.getData("/LogOutVendorUser");
  // }
}
