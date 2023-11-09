import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBankComponent } from './change-bank.component';

describe('ChangeBankComponent', () => {
  let component: ChangeBankComponent;
  let fixture: ComponentFixture<ChangeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
