import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsCollections } from './kids-collections';

describe('KidsCollections', () => {
  let component: KidsCollections;
  let fixture: ComponentFixture<KidsCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
