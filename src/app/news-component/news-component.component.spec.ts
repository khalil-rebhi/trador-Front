import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponentComponent } from './news-component.component';

describe('NewsComponentComponent', () => {
  let component: NewsComponentComponent;
  let fixture: ComponentFixture<NewsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponentComponent]
    });
    fixture = TestBed.createComponent(NewsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
