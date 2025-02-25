import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router'
import { UserActionRendererComponent } from '../../templates/user-action-renderer/user-action-renderer.component';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { User } from "src/app/shared/models/user";
declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  gridOptions: any;
  headerHeight: number;
  rowHeight: number;
  rowSelection: string;
  gridApi: any;
  gridColumnApi: any;
  MRPName: any;
  frameworkComponents: any;
  Month: any;
  revision: any;
  userData: any;
  plantName: any;
  rowGroupPanelShow: string;
  rowData: any;
  Status: any;
  selectedStatus: any
  zoneCode: any;
  zoneCodes: any;
  uploadedDate = new Date();
  selectedUserRole: any;
  formData: FormData;
  uploadForm: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  UserId: any;
  mrpName: any;
  users: any
  defaultColDef: any;
  userList:any;
  isUpdate: boolean;
  // user: any;
  user: User;
  role = [
    {
      roleCode: "Admin",
      name: "Admin"
    },
    {
      roleCode: "Buyer",
      name: "Buyer"
    },
    {
      roleCode: "Planner",
      name: "Planner"
    },
    {
      roleCode: "HQ Head",
      name: "HQ Head"
    }
  ]
  columnDefs = [
    {
      headerName: "Employee Id",
      field: "employeeCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Employee Id",
      width: 150,
      headerClass: 'text-center',
      editable: false,
      cellStyle: {
        textAlign: 'left'
      }
    },
    // {
    //   headerName: "User Name",
    //   field: "username",
    //   filter: "agTextColumnFilter",
    //   headerTooltip: "userName",
    //   width: 200,
    //   editable: false,
    // },
    {
      headerName: "First Name",
      field: "firstName",
      filter: "agTextColumnFilter",
      headerTooltip: "First Name",
      width: 180,
      editable: false,
      headerClass: 'text-center',
      enableRowGroup: true,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      filter: "agTextColumnFilter",
      headerTooltip: "Last Name",
      width: 180,
      headerClass: 'text-center',
      enableRowGroup: true,
      editable: false,
    },
    {
      headerName: "Email",
      field: "email",
      filter: "agTextColumnFilter",
      headerTooltip: "Email",
      width: 250,
      headerClass: 'text-center',
      enableRowGroup: true,
      editable: false,
    },
    {
      headerName: "Department",
      field: "department",
      filter: "agTextColumnFilter",
      headerTooltip: "Department",
      width: 180,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Location",
      field: "location",
      filter: "agTextColumnFilter",
      headerTooltip: "Location",
      width: 180,
      editable: false,
      headerClass: 'text-center',
    },
    {
      headerName: "Role",
      field: "roleCode",
      filter: "agTextColumnFilter",
      headerTooltip: "Role",
      headerClass: 'text-center',
      width: 150,
      editable: false,
    },
    {
      headerName: "Action",
      field: "id",
      filter: false,
      headerClass: 'text-center',
      width: 150,
      cellRenderer: "userActionRendererComponent",
      colId: "userId",
      cellStyle(params) {
        if (params.data !== undefined) {
          return {
            // dash here
            background: +params.data.role_id !== 1 ? "#FFFFFF" : "#DDD9C4",
          };
        }
      }
    },

  ];
  employeeCode: any;
  fileUploadedList: any;
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  updatedDate = new Date();
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private notifier: NotifierService


  ) {
    this.fileUploadedList=[];
    this.context = { componentParent: this };
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    } as GridOptions;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.userData = [];
    this.user = new User();
    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
    this.userList=[];

    this.frameworkComponents = {
      userActionRendererComponent: UserActionRendererComponent,
    };
    this.adminService.userChange$.subscribe((value) => {
      if (value !== null &&
        value !== undefined) {
          console.log(value)
        this.isUpdate = this.adminService.isUserUpdate;
        this.userData = JSON.parse(JSON.stringify(value));
        this.UserId = this.userData.employeeCode;
        this.employeeCode = this.userData.id
        this.selectedUserRole = this.userData.roleCode;
      }
    });

  }

  ngOnInit(): void {
    this.user = new User();
    this.getUserData();
    this.getFileUploadedDetails();
  }
  getFileUploadedDetails(){
    // this.adminService.getFileUploadedDate().subscribe(
    //   (res)=>{
    //    if(res){
    //     this.fileUploadedList= res.Result.Result;
    //    }
    //   }
    // )
    
    this.adminService.getFileUploadedDate().subscribe(
      (res)=>{
      if(res){
       this.fileUploadedList = res.Result.Result;
      //  this.fileUploadedList.forEach(element => {
      //   if(element.FileType=== "Item_Master")
      //   {
         
      //     this.updatedDate = element.Date;
      //   }
      //  });
      }
     })
  }

  getUserData() {
    this.spinner.show();
    const data = {}
    this.adminService.getUserList().subscribe((res) => {
      if (res) {
        this.userList = res;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },
      (err) => {
        this.spinner.hide();
      //  this.notifier.notify(err.message, 4)
      })
  }


  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
  }

  hideImport() {
    this.isFileSelected = true;
    this.filename1 = null;
    $(".box-import, .common-bg").hide();
  }

  fileChange(event) {
    this.isFileSelected = true;
    this.formData = new FormData();
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.uploadForm.get("myfile").setValue(file);
      const filename = file.name;
      if (filename.includes(".csv")) {
        this.isCSV = true;
      } else {
        this.isCSV = false;
      }
      this.filename1 = filename;
      this.formData.append("file", file, filename);
      this.uploadForm.reset();
      this.myFIle.nativeElement.value = null;
      // event.target.files = [];
    }
  }

  UploadFile() {
    if (this.formData !== null && this.formData !== undefined) {
      this.hideImport();
      this.spinner.show();

    } else {
      this.isFileSelected = false;
    }
  }
  createUser(form: NgForm) {
    console.log("sdfghj")
    if (form.valid) {

      // const data = {
      //   EmployeeCode: this.UserId,
      //   PlantCode: "",
      //   RoleCode: this.selectedUserRole
      // }

      const data = {
        EmployeeCode: this.UserId,
       //  PlantCode: "2006",
        RoleCode: this.selectedUserRole
      }

      this.adminService.addUser(data).subscribe(
        (res) => {
          if (res.Message) {
            this.getUserData();
            this.closeCreateUser(form);
            this.notifier.notify(res.Message, 1);
          }
          else {
            if (res) {
              // this.user = new User();
              //  this.userData = res;

              this.spinner.hide();
              // this.notifier.notify(res.message.summary, 2);
            } else {
              this.spinner.hide();
              //  this.notifier.notify(res.message.summary, 3);
            }
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );

    }
  }

  // createUser(form: NgForm) {
  //   console.log("sdfg")
  // }
  openCreateUser() {

    document.getElementById("create-user-right").style.right = "0px";
    this.isUpdate = false;
  }

  closeCreateUser(form: NgForm) {
    this.UserId = null;
    form.reset();
    document.getElementById("create-user-right").style.right = "-437px";
  }

  UpdateUser(form: NgForm) {
    this.spinner.show();
    if (this.selectedUserRole !== null &&
      this.selectedUserRole !== undefined) {
      document.getElementById("create-user-right").style.right = "-437px";
      const data = {
        Id: this.employeeCode,
        EmployeeCode: this.UserId,
        RoleCode: this.selectedUserRole
      }
      
      this.adminService.updateUserRole(data).subscribe(
        (res) => {
          if (res) {
            this.getUserData();
            form.reset();
            this.notifier.notify(res.Message, 1);
            this.spinner.hide();
      
          } else {
            this.spinner.hide();
              this.notifier.notify(res.Message, 3);
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );
    }
  }

  updateUserStatus() {
    document.getElementById("box-delete-user").style.display = "none";
    $(".common-bg").hide();
    this.spinner.show();
    const data = {
      Id: this.employeeCode,
      EmployeeCode: this.UserId
    }
    
    this.adminService.updateUserStatus(data).subscribe(
      (res) => {
        if (res) {
          this.getUserData();
          this.UserId=null;
          this.selectedUserRole= null
          this.notifier.notify(res.Message, 1);
          this.spinner.hide();

        } else {
          this.spinner.hide();
          this.notifier.notify(res.Messag, 1);
        }
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify(err.message, 4);
      }
    );
  }

  cancelUserStatus() {
    document.getElementById("box-delete-user").style.display = "none";
    $(".common-bg").hide();
    // this.spinner.show()
    this.getUserData();
  }

  getUserInfo(userId) {
    if (userId !== null &&
      userId !== undefined) {
      const data = {
        EmployeeCode: userId
      }
      this.spinner.show();
      this.adminService.getUser(data).subscribe(
        (res) => {
          if (res.Message) {
            this.spinner.hide();
            this.notifier.notify(res.Message, 1);
          }
          else {
            if (res) {
              // this.userData = res;
              this.userData = JSON.parse(JSON.stringify(res));
              this.userData.firstName = res[0].firstName;
              this.userData.lastName = res[0].lastName;
              this.userData.email = res[0].email;
              this.userData.department = res[0].department;
              this.userData.location = res[0].location;
              this.spinner.hide();
              // this.notifier.notify(res.message.summary, 2);
            } else {
              this.spinner.hide();
              //  this.notifier.notify(res.message.summary, 3);
            }
          }
        },
        (err) => {
          this.spinner.hide();
          this.notifier.notify(err.message, 4);
        }
      );


      // this.adminService.getUser(data).subscribe(
      //   (res) => {
      //   if (res) {
      //     this.userData = res;
      //     this.spinner.hide();
      //   }
      //   else {
      //     this.spinner.hide();
      //   }
      // },
      //   (err) => {
      //     this.spinner.hide();
      //   })
    }

  }

  getUserDetails(userId){
    const data={
      EmployeeCode: userId
    }
    this.adminService.getUser(data).subscribe(
      (res) => {
        if (res.Message || res.message) {
          this.spinner.hide();
          this.notifier.notify("User Does Not Exists!", 1);
       //   this.notifier.notify(res.Message, 1);
        }
        else {
          if (res) {
            // this.userData = res;
            this.userData = JSON.parse(JSON.stringify(res));
            this.userData.firstName = res[0].firstName;
            this.userData.lastName = res[0].lastName;
            this.userData.email = res[0].email;
            this.userData.department = res[0].department;
            this.userData.location = res[0].location;
            this.spinner.hide();
            // this.notifier.notify(res.message.summary, 2);
          } else {
            this.spinner.hide();
            //  this.notifier.notify(res.message.summary, 3);
          }
        }
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify("User Does Not Exists!", 1);
      //  this.notifier.notify(err.message, 4);
      }
    );
  }

  getData() {
    // this.router.navigate(["/key-data"]);
    this.uploadedDate = new Date();
    $(".user-management, .common-bg").show();
    document.getElementById('last-updated-user-data').style.display = 'block';
  }

  closeModal() {
    $(".user-management, .common-bg").hide();
    document.getElementById('last-updated-user-data').style.display = 'none';
  }
}

