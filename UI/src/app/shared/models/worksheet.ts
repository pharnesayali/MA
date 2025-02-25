import { Base } from "./base";

export class Worksheet extends Base {
    description : String ;
  year: any;
  month: number;

    constructor() {
        super();
       this.year =null;
       this.month =null;
       this.description = null;
      }
}


