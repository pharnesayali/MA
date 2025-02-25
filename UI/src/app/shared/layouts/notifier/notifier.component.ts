import { Component, OnInit } from '@angular/core';
import { Notifier } from '../../models/notifier';
import { NotifierService } from '../../services/notifier.service';
import { notifyAnimation } from '../../models/animations';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  animations: [notifyAnimation]
})
export class NotifierComponent implements OnInit {
  constructor(private notifierService: NotifierService) { }

  ngOnInit() {
  }

  get src(): Notifier {
    return this.notifierService.notifier;
  }

}
