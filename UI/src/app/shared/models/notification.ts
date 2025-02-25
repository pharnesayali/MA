export enum NotificationType {
  Accept = 1,
  Fail = 2,
}

export class Notification {
  public message: string;
  public type: NotificationType;

  constructor(message: string, type: NotificationType | null) {
    this.message = message;
    this.type = type;
  }
}
