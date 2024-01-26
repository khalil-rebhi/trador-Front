import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorComponentComponent } from './indicator-component.component';

describe('IndicatorComponentComponent', () => {
  let component: IndicatorComponentComponent;
  let fixture: ComponentFixture<IndicatorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorComponentComponent]
    });
    fixture = TestBed.createComponent(IndicatorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
