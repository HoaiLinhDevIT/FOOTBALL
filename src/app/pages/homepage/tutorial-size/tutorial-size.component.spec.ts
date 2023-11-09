import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSizeComponent } from './tutorial-size.component';

describe('TutorialSizeComponent', () => {
  let component: TutorialSizeComponent;
  let fixture: ComponentFixture<TutorialSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
