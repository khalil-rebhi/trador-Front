import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAskModalComponent } from './bid-ask-modal.component';

describe('BidAskModalComponent', () => {
  let component: BidAskModalComponent;
  let fixture: ComponentFixture<BidAskModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidAskModalComponent]
    });
    fixture = TestBed.createComponent(BidAskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
