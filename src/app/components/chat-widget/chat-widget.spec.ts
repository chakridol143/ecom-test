import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ChatWidgetComponent } from './chat-widget';
import { VoiceService } from './voice.service';

describe('ChatWidgetComponent', () => {
  let component: ChatWidgetComponent;
  let fixture: ComponentFixture<ChatWidgetComponent>;

  // Mock the Voice Service
  const voiceServiceMock = {
    init: () => {},
    start: () => {},
    stop: () => '',
    speak: (text: string) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatWidgetComponent,     
        HttpClientTestingModule  
      ],
      providers: [
        { provide: VoiceService, useValue: voiceServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});