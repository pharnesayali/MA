import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortageReportsComponent } from './shortage-reports.component';

describe('ShortageReportsComponent', () => {
  let component: ShortageReportsComponent;
  let fixture: ComponentFixture<ShortageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortageReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
