import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeeComponent } from './idee.component';

describe('IdeeComponent', () => {
  let component: IdeeComponent;
  let fixture: ComponentFixture<IdeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeeComponent]
    });
    fixture = TestBed.createComponent(IdeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
