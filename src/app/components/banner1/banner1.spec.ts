import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Banner1 } from './banner1';

describe('Banner1', () => {
  let component: Banner1;
  let fixture: ComponentFixture<Banner1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Banner1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
