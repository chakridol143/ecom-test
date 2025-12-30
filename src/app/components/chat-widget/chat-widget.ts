import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { VoiceService } from './voice.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.css']
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  showBubble = true;
  userInput = '';
  isLoading = false;
  isListening = false;

  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: 'Namaste! ✨ Welcome to GENPERM House of Jewels. How can I assist you with our collection?' }
  ];

  private textApiUrl = 'https://ecom-backend-production-4116.up.railway.app/chat';
  private voiceApiUrl = 'https://ecom-backend-production-4116.up.railway.app/voice-chat';

  constructor(private http: HttpClient, private voiceService: VoiceService) {}

  ngOnInit() {
    this.voiceService.init();

    this.voiceService.speechInput.subscribe((text) => {
      this.userInput = text;
      this.isListening = false;
      this.sendVoiceMessage(text);
    });
    setTimeout(() => { this.showBubble = false; }, 15000);
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.showBubble = !this.isOpen;
  }

  closeBubble(event: Event) {
    event.stopPropagation();
    this.showBubble = false;
  }

  toggleVoice() {
    if (this.isListening) {
      this.isListening = false;
    } else {
      this.isListening = true;
      this.voiceService.start();
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.messages.push({ sender: 'user', text });
    this.userInput = '';
    this.isLoading = true;

    this.http.post<any>(this.textApiUrl, { message: text }).subscribe({
      next: (res) => {
     
        const reply = res.reply || 'Sorry, I did not get that.';
        this.messages.push({ sender: 'bot', text: reply });
        this.isLoading = false;

        this.voiceService.speak(reply);
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Sorry, I cannot connect to the server.' });
        this.isLoading = false;
      }
    });
  }

  sendVoiceMessage(text: string) {
    this.messages.push({ sender: 'user', text });

    this.http.post<any>(this.voiceApiUrl, { message: text }).subscribe({
      next: (res) => {

        const reply = res.response || 'Sorry, I did not get that.';
        this.messages.push({ sender: 'bot', text: reply });

        this.voiceService.speak(reply);
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Server error.' });
      }
    });
  }

  ngAfterViewChecked() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
