import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceManagementComponent } from './remittance-management.component';

describe('RemittanceManagementComponent', () => {
  let component: RemittanceManagementComponent;
  let fixture: ComponentFixture<RemittanceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemittanceManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemittanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
