import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensCollections } from './mens-collections';

describe('MensCollections', () => {
  let component: MensCollections;
  let fixture: ComponentFixture<MensCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
