import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-data',
  templateUrl: './key-data.component.html',
  styleUrls: ['./key-data.component.scss']
})
export class KeyDataComponent implements OnInit {

  uploadedDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
