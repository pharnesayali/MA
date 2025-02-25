import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyShipmentComponent } from './daily-shipment.component';

describe('DailyShipmentComponent', () => {
  let component: DailyShipmentComponent;
  let fixture: ComponentFixture<DailyShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
