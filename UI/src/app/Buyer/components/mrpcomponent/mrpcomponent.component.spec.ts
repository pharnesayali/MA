import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MRPComponentComponent } from './mrpcomponent.component';

describe('MRPComponentComponent', () => {
  let component: MRPComponentComponent;
  let fixture: ComponentFixture<MRPComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MRPComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MRPComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
