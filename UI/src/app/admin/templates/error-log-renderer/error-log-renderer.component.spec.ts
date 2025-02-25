import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogRendererComponent } from './error-log-renderer.component';

describe('ErrorLogRendererComponent', () => {
  let component: ErrorLogRendererComponent;
  let fixture: ComponentFixture<ErrorLogRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorLogRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
