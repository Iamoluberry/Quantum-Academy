import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaAdminComponent } from './qa-admin.component';

describe('QaAdminComponent', () => {
  let component: QaAdminComponent;
  let fixture: ComponentFixture<QaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QaAdminComponent]
    });
    fixture = TestBed.createComponent(QaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
