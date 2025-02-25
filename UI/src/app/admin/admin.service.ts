import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { User } from "../shared/models/user";
import { Company } from "../shared/models/company";
//import { Segments } from "../shared/models/segments";
import { DataService } from "../core/http/data.service";
import { data } from "browserslist";
import { Worksheet } from "../shared/models/worksheet";

@Injectable({
  providedIn: "root",
})
export class AdminService { 
  private deleteDocument = new BehaviorSubject<any>(null);
  deleteDocument$ = this.deleteDocument.asObservable();

  public isUserUpdate: boolean;
  private userChange = new BehaviorSubject<any>(null);
  userChange$ = this.userChange.asObservable();

  private selectedType = new BehaviorSubject<any>(null);
  selectedType$ = this.selectedType.asObservable();

  private changedDates = new BehaviorSubject<any>(null);
  changedDates$ = this.changedDates.asObservable();
 // getConsumptionList: any;
  fileUploadedList = new BehaviorSubject<any>(null);

  private changedOrderMaturityStatus =  new BehaviorSubject<any>(null);
  changedOrderMaturityStatus$ = this.changedOrderMaturityStatus.asObservable();

  private changedOrderMaturityDate =  new BehaviorSubject<any>(null);
  changedOrderMaturityDate$ = this.changedOrderMaturityDate.asObservable();
  
  constructor(private http: HttpClient, private dataService: DataService) { }

  // changePassword(token, password) {
  //   return this.dataService.postDataLogin(
  //     `/password/changepassword?kento=${token}&newPassword=${password}`,
  //     null
  //   );
  // }

  // getVendorCompanyList(vendor_Id: String) {
  //   return this.dataService.getData(
  //     `/getVendorCompanyList?vendor_ID=${vendor_Id}`
  //   );
  // }

  // resetVendorPassword(data) {
  //   return this.dataService.postData(
  //     `/vendorpassword/resetVendorPassword`,
  //     data
  //   );
  // }

  // updateVendorCompany(company: Company): Observable<any> {
  //   return this.dataService.postData(`/updateVendor`, company);
  // }

  // changePasswordFirstTime(userId, password, token) {
  //   return this.dataService.firstLoginChangePassword(
  //     `/Vendor/firsttimeloginpasswordchange?id=${userId}&newPassword=${password}`,
  //     token
  //   );
  // }

  // GetCompanyDetails() {
  //   return this.dataService.getData(`/company/get`);
  // }

  deletedoc(value: any) {
    this.deleteDocument.next(value);
  }

  refreshUserChange(value: User) {
    this.userChange.next(value);
  }

  getSelectedType(value: any) {
    this.selectedType.next(value);
  }

  getchangedDates(value: any) {
    this.changedDates.next(value)
  }

  getchangedMaturityStatus(value :any){
    this.changedOrderMaturityStatus.next(value);
  }

  getChangedOrderMaturityDate(value :any){
    this.changedOrderMaturityDate.next(value);
  }
  
  // getUserDetails() {
  //   return this.http.get<any>("http://localhost:3000/userData")
  // }

  // getUserInfo(data) {
  //   let url = 'http://localhost:3000/userData/';
  //   return this.http.get<any>(url + data);
  // }

  getInvoiceDate(data) {
    return this.dataService.postData(`Invoice/GetList`, data);
  }

  getInvoiceDetails(data) {
    return this.dataService.postData(`Invoice/GetByInvoice?invoice=${data}`, null);
  }

  getUserList() {
    return this.dataService.getData(`User/List`);
  }

  // getUser(EmployeeCode) {
  //   return this.dataService.getData(`User/Get?employeeCode=${EmployeeCode}`);
  // }
  // getUser(EmployeeCode) {
  //   return this.dataService.getData(`User/Get?employeeCode=${EmployeeCode.EmployeeCode}`);
  // }

  getUser(EmployeeCode) {
    return this.dataService.postData(`User/Get`, EmployeeCode);
  }

  addUser(data) {
    return this.dataService.postData(`User/Add`, data);
  }

  importSummaryList(data) {
    return this.dataService.postData(`ImportSummary/List`, data);
  }
  importItemMasterSummaryList(data) {
    return this.dataService.postData(`ImportSummary/Get?fileType=${data}`, null);
  }
  getItemMasterList(data) {
    return this.dataService.postData(`Item/GetList`, data);
  }

  getItemSpplierList(data) {
    return this.dataService.postData(`ItemSupplier/List`, data);
  }

  getInvoiceList(data) {
    return this.dataService.postData(`Invoice/GetList`, data);
  }

  getBuyerList() {
    return this.dataService.getData(`Buyerpermission/List`);
  }

  getStockList(data) {
    return this.dataService.postData(`Stock/List`, data);
  }

  getGitList(data) {
    return this.dataService.postData(`GIT/Get`, data);
  }

  getImportSummaryList(data) {
    return this.dataService.postData(`ImportSummaryn/List`, data);
  }

  getGrnList(data) {
    return this.dataService.postData(`GRN/List`, data);
  }

  getMrpList(data) {
    return this.dataService.postData(`MRP/List`, data);
  }

  getMrpDetailData(data){
    return this.dataService.postData(`MRP/Get`,data);
  }

  // ImportFile(file:FormData , type) {
  //   return this.dataService.postData(`ImportSummary/ImportParts?fileType:${type}&file:${file}`, null);
  // }

  ImportFile(file: any,type:any) {
    let form=new FormData();
      form.append("file",file);
      form.append("fileType",type);
    return this.dataService.postFile(`ImportSummary/ImportParts`, form);
  }

  ImportSupplierMasterFile(file: any,type:any) {
    let form=new FormData();
      form.append("file",file);
      form.append("fileType",type);
    return this.dataService.postFile(`ImportSummary/ImportParts`, form);
  }

  getPlantList() {
    return this.dataService.getData(`Master/GetPlantList`);
  }

  updateUserStatus(data) {
    return this.dataService.postData(`User/UpdateUser`, data);
  }

  updateUserRole(data) {
    return this.dataService.postData(`User/Update`, data);
  }

  deleteItemMaster(data) {
    return this.dataService.getData(`User/Update?id=${data}`);
  }

  getOrderList(data){
    return this.dataService.postData(`Order/Get`, data);
  }

  viewOrderDetails(data){
    return this.dataService.postData(`Order/View`, data); 
  }

  generateOrder(data){
    return this.dataService.postData(`Order/Create`, data); 
  }

  getPlantBuyerLocation(data){
    return this.dataService.postData(`Order/GetBuyerPlantLocations`, data); 
  }

  updateSob(data){
    return this.dataService.postData(`ItemSupplier/Update`, data); 
  }

  updateDate(data){
    return this.dataService.postData(`Invoice/UpdateDate`, data); 
  }

  getZonelist(){
    return this.dataService.getData(`BuyerSupplier/GetZone`);
  }

  getZonePlantList(data){
    return this.dataService.postData(`BuyerSupplier/GetPlant`, data); 
  }
  
  getBuyerSupplierList(data){
    return this.dataService.postData(`BuyerSupplier/GetSupplierByBuyerID?Buyer=${data}`, ''); 
  }

  getSupplierListByPlant(data){
    return this.dataService.postData(`ItemSupplier/GetByPlant`,data ); 
  }

  addSupplier(data){
    return this.dataService.postData(`BuyerSupplier/Add`,data ); 
  }

  getMvmData(){
    return this.dataService.getData(`Master/GetMovementType`);
  }

  getplantdivisionmasterdata(){
    return this.dataService.getData(`Master/GetPlantList`);
  }

  getWeekList(){
    return this.dataService.getData(`Master/GetWeek`);
  }

  getMrpDetails(data){
    return this.dataService.postData(`MRP/List`,data);
  }

  getSlowMovingList() {
    return this.dataService.getData(`SlowMoving/Get`);
  }
  getAbcAnalysisList(){
     return this.dataService.getData(`ABC/Get`);
  }
  getFileUploadedDate(){
    return this.dataService.getData(`Master/GetCompleteFiles`);
  }

  getGrnPastData(data){
    return this.dataService.postData(``,data);
  }

  getOrderMaturityData(data){
    return this.dataService.postData(`Order/GetOrderMaturity`,data);
  }

  updateOrderMaturity(data){
    return this.dataService.postData(`Order/UpdateOrderMaturity`,data);
  }

  getConsumptionList(data){
    return this.dataService.postData(`Master/GetConsumptionReport`,data);
  }
  // getMrpAnalysisList(){
  //   return this.dataService.getData(`MrpAnalysis/get`);
  // }

  getDailyShipmentList(data){
    return this.dataService.postData(`Master/GetDailyshipment`,data);
  }

  getInventoryCorrectionList(data){
    return this.dataService.postData(`Master/GetInventoryCorrection`,data);
  }
  getMrpAnalysisReport(){
    return this.dataService.getData(`MRP/Analysis`);
  }
  getItrDetails(){
    return this.dataService.getData(`ITR/Get`,);
  }

  generateITR(){
    return this.dataService.getData(`ITR/Generate`);
  }
 
  getITRReport(){
    return this.dataService.getData(`ITR/Report`,);
  }

  getItrRevision(data){
    return this.dataService.postData(`ITR/GetRevision`,data);
  }

  getRRCalculation(data){
    return this.dataService.postData(`RR_Calculation/Get`,data);
  }

  getFTVQCalculation(data){
    return this.dataService.postData(`FTVQ/Get`,data);
  }

  downloadFile(data:any,  filename: string){
    var labels: any
    if(filename == "RR Calculations"){
      const csvData = this.ConvertToCSV(data, [  "ItemCode",
      "LTM",
      "LTW",
      "Demand",
      "Demand Per Week",
      "PTW",
      "MOQ",
      "NPTW",
      "RatePerUnit",
      "currentStock",
      "Current_Value",
      "UOM",
      "Model",
      "PTC",
      "RPT",
      "NPTC",
      "NPTC_line_MOQ",
      "BS",
      "SS",
      "MAX_Inv",
      "AVG_Inv",
      "MAX_Value",
      "AVG_Value",
      "Actual_Max",
      "Actual_Max_Value",
      "Actual_Avg_Level",
      "Actual_Avg_Level_Value",
      "Daily_Cost_Current",
      "Daily_Cost_Future",
      "Max_No_Of_Days_Future",
      "Current_No_Of_Days",
      "Future_No_Of_Days", ]);
      const a: any = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
      a.download = filename + '.csv';
  
      a.click();
    }else if(filename == "FTVQ Calculations"){
      const csvData = this.ConvertToCSV(data, [  "ItemCode",
      "WeekNo",
      "Month_Of_Week",
      "Year",
      "MRP",
      "Receipt",
      "Actual_Closing_Stock",
      "Actual_Coverage",
      "Closing_Stock_consder_Air_ordr_prev_week",
      "Coverage_after_consder_Air_ordr_prev_week",
      "AirOrderReceipt",
      "Coverage2",
      "Value", ]);
      const a: any = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
      a.download = filename + '.csv';
  
      a.click();
    }
   
  }

  ConvertToCSV(objArray: any, labels: any) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    if (labels === 'No') {
      for (const index in objArray[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
    } else {
      str += labels + '\r\n';
    }
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ',';
        if (array[i][index] === '' || array[i][index] === null) {
          line += ' ';
        } else {
          if (/^[0][0-9]/.test(array[i][index])) {
            array[i][index] = "'" + array[i][index];
          } else {
            array[i][index] = array[i][index];
          }
          if (line.indexOf('\n') || line.indexOf('.')) {
            line = line.replace(/\n/, '');
          }
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }
}
