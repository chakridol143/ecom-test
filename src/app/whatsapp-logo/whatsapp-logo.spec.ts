import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappLogo } from './whatsapp-logo';

describe('WhatsappLogo', () => {
  let component: WhatsappLogo;
  let fixture: ComponentFixture<WhatsappLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappLogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappLogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
