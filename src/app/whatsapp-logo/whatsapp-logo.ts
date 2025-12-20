import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-logo.html',
  styleUrls: ['./whatsapp-logo.css']
})
export class WhatsappLogo {
  showMenu = false;

  // 1. Inject ElementRef so the code knows "what is inside this component"
  constructor(private eRef: ElementRef) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // 2. Listener: Detects clicks anywhere on the page
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    // Logic: If the click target is NOT inside this WhatsApp component...
    if (!this.eRef.nativeElement.contains(event.target)) {
      // ...then close the menu.
      this.showMenu = false;
    }
  }
}