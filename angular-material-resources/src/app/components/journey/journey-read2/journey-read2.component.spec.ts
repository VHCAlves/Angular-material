import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyRead2Component } from './journey-read2.component';

describe('JourneyRead2Component', () => {
  let component: JourneyRead2Component;
  let fixture: ComponentFixture<JourneyRead2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyRead2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyRead2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
