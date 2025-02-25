import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-error-log-renderer',
  templateUrl: './error-log-renderer.component.html',
  styleUrls: ['./error-log-renderer.component.scss']
})
export class ErrorLogRendererComponent implements ICellRendererAngularComp {
  params: any
  constructor(
    private notifier: NotifierService
  ) { }

  agInit(param: any): void {
    this.params = param;
  }

  refresh(): boolean {
    return false;
  }

  openFIle() {
    const failBlobData = this.params.value;
    if (failBlobData !== undefined && failBlobData !== null) {
      var binary_string = window.atob(failBlobData);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      const fileObservablefile = bytes.buffer;
      let blob = new Blob([fileObservablefile], {
        type: "text/xlsx;charset=utf-8",
      });
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = this.params.data.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      this.notifier.notify("Data Not Found", 1);
    }
  }
}
