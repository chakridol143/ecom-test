import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.css']
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;      // Is the main chat window open?
  showBubble = true;   // Is the "How can I help you" text visible?
  
  userInput = '';
  isLoading = false;
  
  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: 'Namaste! ✨ Welcome to GENPERM House of Jewels. How can I assist you with our collection?' }
  ];

  // Your Backend URL
  private apiUrl = 'https://ecom-backend-production-4116.up.railway.app/chat';

  constructor(private http: HttpClient) {}

  // ✅ FIXED LOGIC: Toggle Chat and Bubble visibility
  toggleChat() {
    this.isOpen = !this.isOpen;
    
    // If Chat is OPEN -> Hide Bubble
    // If Chat is CLOSED -> Show Bubble
    this.showBubble = !this.isOpen;
  }

  // Close only the bubble if user clicks 'X'
  closeBubble(event: Event) {
    event.stopPropagation();
    this.showBubble = false;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.messages.push({ sender: 'user', text: text });
    this.userInput = '';
    this.isLoading = true;

    this.http.post<any>(this.apiUrl, { message: text }).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'bot', text: response.reply });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Chat error:', error);
        this.messages.push({ sender: 'bot', text: 'Sorry, I cannot connect to the server.' });
        this.isLoading = false;
      }
    });
  }
  ngOnInit() {
  // Auto-hide the "How can I help you" bubble after 10 seconds
  setTimeout(() => {
    this.showBubble = false;
  }, 15000);
}

  ngAfterViewChecked() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}