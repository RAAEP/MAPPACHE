import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieconomicoPage } from './socieconomico.page';

describe('SocieconomicoPage', () => {
  let component: SocieconomicoPage;
  let fixture: ComponentFixture<SocieconomicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieconomicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieconomicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
