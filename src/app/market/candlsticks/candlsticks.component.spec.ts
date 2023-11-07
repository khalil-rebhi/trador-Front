import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandlsticksComponent } from './candlsticks.component';

describe('CandlsticksComponent', () => {
  let component: CandlsticksComponent;
  let fixture: ComponentFixture<CandlsticksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandlsticksComponent]
    });
    fixture = TestBed.createComponent(CandlsticksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
