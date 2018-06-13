import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballSchemaComponent } from './basketball-schema.component';

describe('BasketballSchemaComponent', () => {
  let component: BasketballSchemaComponent;
  let fixture: ComponentFixture<BasketballSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketballSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
