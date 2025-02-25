import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpActionRendererComponent } from './mrp-action-renderer.component';

describe('MrpActionRendererComponent', () => {
  let component: MrpActionRendererComponent;
  let fixture: ComponentFixture<MrpActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrpActionRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
