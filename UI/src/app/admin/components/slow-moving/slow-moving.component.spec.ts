import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowMovingComponent } from './slow-moving.component';

describe('SlowMovingComponent', () => {
  let component: SlowMovingComponent;
  let fixture: ComponentFixture<SlowMovingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlowMovingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
