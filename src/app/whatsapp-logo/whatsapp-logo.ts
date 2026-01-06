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

  constructor(private eRef: ElementRef) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
     
      this.showMenu = false;
    }
  }
}