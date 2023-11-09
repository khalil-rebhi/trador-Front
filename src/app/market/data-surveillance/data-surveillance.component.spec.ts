import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSurveillanceComponent } from './data-surveillance.component';

describe('DataSurveillanceComponent', () => {
  let component: DataSurveillanceComponent;
  let fixture: ComponentFixture<DataSurveillanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataSurveillanceComponent]
    });
    fixture = TestBed.createComponent(DataSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
