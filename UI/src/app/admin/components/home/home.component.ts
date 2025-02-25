import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileUploadedList: any;


  // updatedDate:any;
  // uploadedDate: Date;

  constructor( private adminService: AdminService) { 

    // this.updatedDate= new Date;
  } 

  ngOnInit(): void {
    this.adminService.getFileUploadedDate().subscribe(
      (res)=>{
       if(res){
        this.fileUploadedList = res.Result.Result;
      // this.adminService.fileUploadedList.next(this.fileUploadedList);
      //  sessionStorage.setItem("uploadedFile", JSON.stringify(res.Result.Result));
       }
      }
    )
  }
 
  // getData(){
  //   // this.router.navigate(["/key-data"]);
  //   this.uploadedDate = new Date();
  //   document.getElementById('last-updated-home-data').style.display = 'block';
  // }

  // closeModal(){
  //   document.getElementById('last-updated-home-data').style.display = 'none';
  // }
}
