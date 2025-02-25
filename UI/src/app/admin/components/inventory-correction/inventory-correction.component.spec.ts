import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCorrectionComponent } from './inventory-correction.component';

describe('InventoryCorrectionComponent', () => {
  let component: InventoryCorrectionComponent;
  let fixture: ComponentFixture<InventoryCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCorrectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
