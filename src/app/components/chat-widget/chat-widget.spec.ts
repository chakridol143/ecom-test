import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Required for API calls
import { ChatWidgetComponent } from './chat-widget'; // Corrected Class Name

describe('ChatWidgetComponent', () => {
  let component: ChatWidgetComponent;
  let fixture: ComponentFixture<ChatWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatWidgetComponent,     // Import the standalone component
        HttpClientTestingModule  // Mock the HTTP requests so tests don't fail
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