import { Injectable } from '@angular/core';
import { Notifier } from '../models/notifier';
import { Notification } from '../models/notification';
import { NotificationType } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  public notifier = new Notifier();

  public notify(message: string, notificationType: NotificationType, duration: number = 5000): void {

    const notification: Notification = new Notification(message, notificationType);

    const dismissWait = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };

    this.notifier.add(notification);

    dismissWait();
  }
  constructor() { }
}
