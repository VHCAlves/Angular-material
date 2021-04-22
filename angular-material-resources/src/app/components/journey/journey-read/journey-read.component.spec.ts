import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyReadComponent } from './journey-read.component';

describe('JourneyReadComponent', () => {
  let component: JourneyReadComponent;
  let fixture: ComponentFixture<JourneyReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
