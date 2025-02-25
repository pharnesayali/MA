import { Base } from './base';

export class Company extends Base {
  id: number;
  vendor_Name: string;
 // logo: any;
 // website: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  primary_Contact: number;
 // phone2: number;
 auth_mode : string;
 vendor_Id : String ;


  constructor() {
    // super(null, null, null, null);
    super();
    this.id = null;
    this.vendor_Id = null;
    this.vendor_Name = null;
  //  this.logo = null;
   // this.website = null;
    this.address = null;
    this.city = null;
    this.state = null;
    this.zip = null;
    this.primary_Contact = null;
    //this.phone2 = null;
    this.auth_mode = null;
  }
}
