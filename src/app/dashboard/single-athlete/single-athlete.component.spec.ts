import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAthleteComponent } from './single-athlete.component';

describe('SingleAthleteComponent', () => {
  let component: SingleAthleteComponent;
  let fixture: ComponentFixture<SingleAthleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAthleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
