import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaLoginComponent } from './qa-login.component';

describe('QaLoginComponent', () => {
  let component: QaLoginComponent;
  let fixture: ComponentFixture<QaLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QaLoginComponent]
    });
    fixture = TestBed.createComponent(QaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
