import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListActionRendererComponent } from './order-list-action-renderer.component';

describe('OrderListActionRendererComponent', () => {
  let component: OrderListActionRendererComponent;
  let fixture: ComponentFixture<OrderListActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListActionRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
