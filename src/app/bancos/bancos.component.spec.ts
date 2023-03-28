/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BancosComponent } from './bancos.component';

describe('BancosComponent', () => {
  let component: BancosComponent;
  let fixture: ComponentFixture<BancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
