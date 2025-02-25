import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMaturityRendererComponent } from './order-maturity-renderer.component';

describe('OrderMaturityRendererComponent', () => {
  let component: OrderMaturityRendererComponent;
  let fixture: ComponentFixture<OrderMaturityRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMaturityRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMaturityRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
