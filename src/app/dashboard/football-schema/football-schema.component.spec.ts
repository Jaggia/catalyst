import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballSchemaComponent } from './football-schema.component';

describe('FootballSchemaComponent', () => {
  let component: FootballSchemaComponent;
  let fixture: ComponentFixture<FootballSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
