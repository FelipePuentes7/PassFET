import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasantiasAdmin } from './pasantias-admin';

describe('PasantiasAdmin', () => {
  let component: PasantiasAdmin;
  let fixture: ComponentFixture<PasantiasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasantiasAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasantiasAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
