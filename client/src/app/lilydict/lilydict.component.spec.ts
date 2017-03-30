import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LilydictComponent } from './lilydict.component';

describe('LilydictComponent', () => {
  let component: LilydictComponent;
  let fixture: ComponentFixture<LilydictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LilydictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LilydictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
