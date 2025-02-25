import { Base } from "./base";

export class Comment extends Base {
  id: number;
  projectNumber: string;
  projectId: string;
  project_CBSId: string;
  project_Codename: string;
  columnId: string;
  project_foreCastId: string;
  year: string;
  month: string;
  previousValue: string;
  newValue: string;
  rowIndex: number;
  name: string;
  comments: string;
  colName: string;
  headerName: string;
  isVariance: boolean;
  snapshot_Id: number;
  scenarios_Id: Number;

  constructor() {
    // super(null, null, null, null);
    super();
    this.id = null;
    this.projectNumber = null;
    this.projectId = null;
    this.project_CBSId = null;
    this.columnId = null;
    this.project_foreCastId = null;
    this.year = null;
    this.month = null;
    this.previousValue = null;
    this.newValue = null;
    this.rowIndex = null;
    this.name = null;
    this.comments = null;
    this.colName = null;
    this.headerName = null;
    this.isVariance = false;
    this.project_Codename = null;
    this.createdDate = null;
    this.createdBy = null;
    this.modifiedBy = null;
    this.modifiedDate = null;
    this.snapshot_Id = 0;
    this.scenarios_Id = 0;
  }
}
