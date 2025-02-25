import { Base } from "./base";

export class Vendor extends Base {
  id: number;
  vendor_Id: number;
  first_name: string;
  last_name: string;
  email: string;
  phoneNo: number;
  address: string;
  state: string;
  city: string;
  zip: number;
  userName: string;
  password: string;
  status: boolean;
  parent_id: number;
  auht_mode: string;
  is_active: number;
  role_id: number;
  department_name: string;

  constructor() {
    super();
    this.id = null;
    this.vendor_Id = null;
    this.first_name = null;
    this.last_name = null;
    this.email = null;
    this.phoneNo = null;
    this.address = null;
    this.state = null;
    this.city = null;
    this.zip = null;
    this.userName = null;
    this.password = null;
    this.status = false;
    this.parent_id = null;
    this.auht_mode = null;
    this.is_active = 0;
    this.role_id = null;
    this.department_name = null;
  }
}
