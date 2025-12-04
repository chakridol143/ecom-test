import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchNshop } from './watch-nshop';

describe('WatchNshop', () => {
  let component: WatchNshop;
  let fixture: ComponentFixture<WatchNshop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchNshop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchNshop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
