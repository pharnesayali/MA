import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrListComponent } from './itr-list.component';

describe('ItrListComponent', () => {
  let component: ItrListComponent;
  let fixture: ComponentFixture<ItrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
