import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersPermissionComponent } from './buyers-permission.component';

describe('BuyersPermissionComponent', () => {
  let component: BuyersPermissionComponent;
  let fixture: ComponentFixture<BuyersPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
