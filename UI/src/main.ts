import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
// import { LicenseManager } from "ag-grid-enterprise";
declare var $: any;
if (environment.production) {
  // enableProdMode();
}

// LicenseManager.setLicenseKey(
//   'Evaluation_License-_Not_For_Production_Valid_Until_20_October_2019__MTU3MTUyNjAwMDAwMA==797cc5b0b3a10622b01e9bb952c41c3b'
// );
//Old License key
// "CompanyName=4C Innovations,LicensedApplication=Advanced Forecasting,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-008476,ExpiryDate=10_June_2021_[v2]_MTYyMzI3OTYwMDAwMA==03ab279b5ce52a8821340618a77d4f73"
// LicenseManager.setLicenseKey(
//   "CompanyName=4m Innovations,LicensedApplication=Advanced Forecasting,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-015474,ExpiryDate=2_August_2022_[v2]_MTY1OTM5NDgwMDAwMA==a0aa65f3b74ac81ea696dca8b85b73ad"
// );

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

$('[data-toggle="tooltip"]').tooltip();
