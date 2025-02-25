import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-moving',
  templateUrl: './non-moving.component.html',
  styleUrls: ['./non-moving.component.scss']
})
export class NonMovingComponent implements OnInit {
  uploadedDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

  getData(){
    this.uploadedDate = new Date();
    document.getElementById('last-updated-item-non-moving-data').style.display = 'block';
  }
  
  closeModal(){
    document.getElementById('last-updated-item-non-moving-data').style.display = 'none';
  }
}
