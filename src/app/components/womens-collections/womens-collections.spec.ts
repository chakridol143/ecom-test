import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensCollections } from './womens-collections';

describe('WomensCollections', () => {
  let component: WomensCollections;
  let fixture: ComponentFixture<WomensCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
