/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipoconsumidorComponent } from './tipoconsumidor.component';

describe('TipoconsumidorComponent', () => {
  let component: TipoconsumidorComponent;
  let fixture: ComponentFixture<TipoconsumidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoconsumidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoconsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
