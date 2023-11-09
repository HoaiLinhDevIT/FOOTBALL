import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmailUsComponent } from './dialog-email-us.component';

describe('DialogEmailUsComponent', () => {
  let component: DialogEmailUsComponent;
  let fixture: ComponentFixture<DialogEmailUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEmailUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEmailUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
