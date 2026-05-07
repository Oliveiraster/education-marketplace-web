import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FormPersonal } from './form-personal';

describe('FormPersonal', () => {
  let component: FormPersonal;
  let fixture: ComponentFixture<FormPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPersonal],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPersonal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
