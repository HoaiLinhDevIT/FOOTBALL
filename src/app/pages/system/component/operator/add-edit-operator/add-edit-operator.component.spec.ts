import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOperatorComponent } from './add-edit-operator.component';

describe('AddEditOperatorComponent', () => {
  let component: AddEditOperatorComponent;
  let fixture: ComponentFixture<AddEditOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
