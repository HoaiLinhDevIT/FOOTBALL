import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSellerComponent } from './add-edit-seller.component';

describe('AddEditSellerComponent', () => {
  let component: AddEditSellerComponent;
  let fixture: ComponentFixture<AddEditSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
