import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FormPhoto } from './form-photo';

describe('FormPhoto', () => {
  let component: FormPhoto;
  let fixture: ComponentFixture<FormPhoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPhoto],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPhoto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
