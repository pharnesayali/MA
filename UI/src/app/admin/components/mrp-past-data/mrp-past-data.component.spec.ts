import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpPastDataComponent } from './mrp-past-data.component';

describe('MrpPastDataComponent', () => {
  let component: MrpPastDataComponent;
  let fixture: ComponentFixture<MrpPastDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrpPastDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpPastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
