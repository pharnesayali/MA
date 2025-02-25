import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpAnalysisComponent } from './mrp-analysis.component';

describe('MrpAnalysisComponent', () => {
  let component: MrpAnalysisComponent;
  let fixture: ComponentFixture<MrpAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrpAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
