import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrFormatComponent } from './itr-format.component';

describe('ItrFormatComponent', () => {
  let component: ItrFormatComponent;
  let fixture: ComponentFixture<ItrFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItrFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
