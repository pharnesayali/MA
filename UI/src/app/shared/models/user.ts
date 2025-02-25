import { Base } from "./base";

export class User extends Base {
  id: string;
//  userName: string;
//  password: string;
  first_name: string;
  FirstName:string;
  last_name: string;
  LastName:string;
  Email:string;
 // designation: string;
  phoneNo: Number;
  RoleCode:string;
 // address: string;
//  state: string;
//  city: string;
//  zip: string;
  email: string;
//  companyId: string;
//  status: boolean;
//  is_active: number;
 // is_Active: number;
  department_name: string;
  EmployeeCode:string;
//  role_id: number;
//  system_ip: string;
  role : number;
//  vendorID: number;
 // Role_id:number;
  //vendor_name : string;
  
  //parent_Id : number;
 // auth_mode : string;
  //vendor_Id : string;
  constructor() {
    super();
    this.id = null;
    // this.userName = null;
    // this.password = null;
    this.first_name = null;
    this.last_name = null;
    this.FirstName = null;
    this.LastName = null;
    this.RoleCode = null;
    this.Email = null;
    this.EmployeeCode= null;
    // this.designation = null;
    // this.Role_id = null;
    // this.vendor_Id=null;
    this.phoneNo = null;
    // this.address = null;
    // this.state = null;
    // this.city = null;
    // this.zip = null;
    this.email = null;
    // this.companyId = null;
    // this.status = false;
    // this.is_active = 0;
    // this.is_Active = 0;
    this.department_name = null;
    // this.role_id = null;
   // this.createdDate = null;
  //  this.createdBy = null;
    //this.modifiedBy = null;
   // this.modifiedDate = null;
    // this.system_ip = null;
    this.role = null;
    // this.vendorID = null;
    // this.vendor_name = null;
    // this.parent_Id = null;
    // this.auth_mode = null
  }
}
