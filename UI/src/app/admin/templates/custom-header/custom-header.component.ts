import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

export interface ICustomHeaderParams {
  menuIcon: string;
}

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  public params!: IHeaderParams & ICustomHeaderParams;

  public ascSort = 'inactive';
  public descSort = 'inactive';
  public noSort = 'inactive';

  @ViewChild('menuButton', { read: ElementRef }) public menuButton!: ElementRef;

  agInit(params: IHeaderParams & ICustomHeaderParams): void {
    this.params = params;

    params.column.addEventListener(
      'sortChanged',
      this.onSortChanged.bind(this)
    );

    this.onSortChanged();
  }

  onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  onSortRequested(order: 'asc' | 'desc' | null, event: any) {
    this.params.setSort(order, event.shiftKey);
  }

  refresh(params: IHeaderParams) {
    return false;
  }
}
