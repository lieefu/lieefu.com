import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RipplewalletComponent } from './ripplewallet.component';

describe('RipplewalletComponent', () => {
  let component: RipplewalletComponent;
  let fixture: ComponentFixture<RipplewalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RipplewalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RipplewalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
