import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs'; // 🟢 Import Subject

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  recognition: any;
  isStoppedSpeechRecog = false;
  
  // 🟢 Create a "Stream" that components can listen to
  public speechInput = new Subject<string>(); 

  constructor(private _ngZone: NgZone) { }

  init() {
    try {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.interimResults = false; // Only capture final results
      this.recognition.lang = 'en-US';

      // 1. When Speech is Detected
      this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        // 🟢 AUTO-SEND: Tell the component "We have text! Go!"
        this._ngZone.run(() => {
          if (transcript.trim()) {
             this.speechInput.next(transcript);
             this.stop(); // Stop listening automatically
          }
        });
      });

      this.recognition.onerror = (e: any) => {
        console.error("Microphone Error:", e);
        this.stop();
      };

    } catch (e) {
      console.error("Speech Recognition not supported.", e);
    }
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1; 
      window.speechSynthesis.speak(utterance);
    }
  }
}