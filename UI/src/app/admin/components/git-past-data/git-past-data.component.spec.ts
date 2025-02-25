import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitPastDataComponent } from './git-past-data.component';

describe('GitPastDataComponent', () => {
  let component: GitPastDataComponent;
  let fixture: ComponentFixture<GitPastDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitPastDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitPastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
