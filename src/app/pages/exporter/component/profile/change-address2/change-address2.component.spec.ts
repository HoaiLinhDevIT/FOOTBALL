import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAddress2Component } from './change-address2.component';

describe('ChangeAddress2Component', () => {
  let component: ChangeAddress2Component;
  let fixture: ComponentFixture<ChangeAddress2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAddress2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAddress2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
