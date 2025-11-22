import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResults } from './filter-results';

describe('FilterResults', () => {
  let component: FilterResults;
  let fixture: ComponentFixture<FilterResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
