import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnPastDataComponent } from './grn-past-data.component';

describe('GrnPastDataComponent', () => {
  let component: GrnPastDataComponent;
  let fixture: ComponentFixture<GrnPastDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnPastDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnPastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
