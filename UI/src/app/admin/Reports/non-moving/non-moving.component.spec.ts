import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMovingComponent } from './non-moving.component';

describe('NonMovingComponent', () => {
  let component: NonMovingComponent;
  let fixture: ComponentFixture<NonMovingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMovingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
