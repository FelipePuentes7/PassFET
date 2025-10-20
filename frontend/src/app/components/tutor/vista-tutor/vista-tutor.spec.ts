import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTutor } from './vista-tutor';

describe('VistaTutor', () => {
  let component: VistaTutor;
  let fixture: ComponentFixture<VistaTutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTutor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTutor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
