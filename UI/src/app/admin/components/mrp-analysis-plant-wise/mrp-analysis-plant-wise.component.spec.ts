import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpAnalysisPlantWiseComponent } from './mrp-analysis-plant-wise.component';

describe('MrpAnalysisPlantWiseComponent', () => {
  let component: MrpAnalysisPlantWiseComponent;
  let fixture: ComponentFixture<MrpAnalysisPlantWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrpAnalysisPlantWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpAnalysisPlantWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
