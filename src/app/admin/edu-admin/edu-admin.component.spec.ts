import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduAdminComponent } from './edu-admin.component';

describe('EduAdminComponent', () => {
  let component: EduAdminComponent;
  let fixture: ComponentFixture<EduAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EduAdminComponent]
    });
    fixture = TestBed.createComponent(EduAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
