import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpAnalysisPartWiseComponent } from './mrp-analysis-part-wise.component';

describe('MrpAnalysisPartWiseComponent', () => {
  let component: MrpAnalysisPartWiseComponent;
  let fixture: ComponentFixture<MrpAnalysisPartWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrpAnalysisPartWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpAnalysisPartWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
