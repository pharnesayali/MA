import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMaturityTrackingComponent } from './order-maturity-tracking.component';

describe('OrderMaturityTrackingComponent', () => {
  let component: OrderMaturityTrackingComponent;
  let fixture: ComponentFixture<OrderMaturityTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMaturityTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMaturityTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
