import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballSchemaComponent } from './baseball-schema.component';

describe('BaseballSchemaComponent', () => {
  let component: BaseballSchemaComponent;
  let fixture: ComponentFixture<BaseballSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseballSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseballSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
