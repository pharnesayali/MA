import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSupplierMasterComponent } from './item-supplier-master.component';

describe('ItemSupplierMasterComponent', () => {
  let component: ItemSupplierMasterComponent;
  let fixture: ComponentFixture<ItemSupplierMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSupplierMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSupplierMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
