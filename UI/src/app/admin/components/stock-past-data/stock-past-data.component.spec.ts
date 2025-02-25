import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPastDataComponent } from './stock-past-data.component';

describe('StockPastDataComponent', () => {
  let component: StockPastDataComponent;
  let fixture: ComponentFixture<StockPastDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockPastDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
