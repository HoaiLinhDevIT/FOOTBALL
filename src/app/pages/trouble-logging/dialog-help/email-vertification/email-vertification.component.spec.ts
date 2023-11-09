import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVertificationComponent } from './email-vertification.component';

describe('EmailVertificationComponent', () => {
  let component: EmailVertificationComponent;
  let fixture: ComponentFixture<EmailVertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
