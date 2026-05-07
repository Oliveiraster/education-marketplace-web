import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FormAbout } from './form-about';

describe('FormAbout', () => {
  let component: FormAbout;
  let fixture: ComponentFixture<FormAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAbout],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAbout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
