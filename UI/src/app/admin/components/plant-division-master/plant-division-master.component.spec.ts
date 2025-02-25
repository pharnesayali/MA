import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDivisionMasterComponent } from './plant-division-master.component';

describe('PlantDivisionMasterComponent', () => {
  let component: PlantDivisionMasterComponent;
  let fixture: ComponentFixture<PlantDivisionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantDivisionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantDivisionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
