import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRemittanceComponent } from './add-edit-remittance.component';

describe('AddEditRemittanceComponent', () => {
  let component: AddEditRemittanceComponent;
  let fixture: ComponentFixture<AddEditRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRemittanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
