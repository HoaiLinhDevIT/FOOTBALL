import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleLoggingComponent } from './trouble-logging.component';

describe('TroubleLoggingComponent', () => {
  let component: TroubleLoggingComponent;
  let fixture: ComponentFixture<TroubleLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroubleLoggingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroubleLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
