import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExporterComponent } from './register-exporter.component';

describe('RegisterExporterComponent', () => {
  let component: RegisterExporterComponent;
  let fixture: ComponentFixture<RegisterExporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterExporterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
