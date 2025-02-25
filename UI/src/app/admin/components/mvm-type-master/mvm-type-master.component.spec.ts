import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmTypeMasterComponent } from './mvm-type-master.component';

describe('MvmTypeMasterComponent', () => {
  let component: MvmTypeMasterComponent;
  let fixture: ComponentFixture<MvmTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvmTypeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
