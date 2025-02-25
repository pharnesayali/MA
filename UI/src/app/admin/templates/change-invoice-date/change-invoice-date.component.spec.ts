import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInvoiceDateComponent } from './change-invoice-date.component';

describe('ChangeInvoiceDateComponent', () => {
  let component: ChangeInvoiceDateComponent;
  let fixture: ComponentFixture<ChangeInvoiceDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInvoiceDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInvoiceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
