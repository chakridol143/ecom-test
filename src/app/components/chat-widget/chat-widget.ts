import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  // IMPORT HttpClientModule HERE to make API calls work
  imports: [CommonModule, FormsModule, HttpClientModule], 
  // Note: These point to the filenames in your screenshot
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.css']
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  isLoading = false;
  
  // Initial welcome message
  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: 'Welcome to GENPERM House of Jewels. ✨ I am your personal assistant. How may I assist you with our collection today?' }
  ];

  // 🔴 IMPORTANT: This must match your running Python URL
  private apiUrl = 'http://localhost:5000/chat';

  constructor(private http: HttpClient) {}

  // Open/Close the chat window
  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  // Send message to Python Backend
  sendMessage() {
    if (!this.userInput.trim()) return;

    // 1. Show user message immediately
    const text = this.userInput;
    this.messages.push({ sender: 'user', text: text });
    this.userInput = '';
    this.isLoading = true;

    // 2. Send POST request to Python
    this.http.post<any>(this.apiUrl, { message: text }).subscribe({
      next: (response) => {
        // 3. Show Bot Response
        this.messages.push({ sender: 'bot', text: response.reply });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Chat error:', error);
        this.messages.push({ sender: 'bot', text: 'Sorry, I cannot connect to the server. Is "app.py" running?' });
        this.isLoading = false;
      }
    });
  }

  // Auto-scroll to the newest message
  ngAfterViewChecked() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}