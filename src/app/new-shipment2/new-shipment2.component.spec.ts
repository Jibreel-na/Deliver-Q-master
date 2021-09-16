import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShipment2Component } from './new-shipment2.component';

describe('NewShipment2Component', () => {
  let component: NewShipment2Component;
  let fixture: ComponentFixture<NewShipment2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShipment2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShipment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
