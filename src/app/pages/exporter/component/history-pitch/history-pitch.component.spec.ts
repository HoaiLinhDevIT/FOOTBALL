import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPitchComponent } from './history-pitch.component';

describe('HistoryPitchComponent', () => {
  let component: HistoryPitchComponent;
  let fixture: ComponentFixture<HistoryPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
