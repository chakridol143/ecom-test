import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-watch-nshop',
  imports: [CommonModule],
  templateUrl: './watch-nshop.html',
  styleUrl: './watch-nshop.css'
})
export class WatchNshop  implements AfterViewInit{

videoGrid = [
     {
      name: "Handcrafted with love",
      price: 6999,
      video :  "../../../assets/videos/vd1.mp4"
    },
    {
      name: "Grace color and Handcrafted beauty",
      price: 4999,
      video :  "../../../assets/videos/vd2.mp4"
    },
    {
      name: "Pearl ",
      price: 8599,
        video :  "../../../assets/videos/vd3.mp4"
    },
    {
      name: "Bridal look",
      price: 7899,
         video :  "../../../assets/videos/vd4.mp4"
    }
  ];

 @ViewChildren('vid') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit() {
    // ensure muted before trying to autoplay
    this.videos.forEach(v => {
      const el = v.nativeElement;
      el.muted = true;
      el.playsInline = true;
      el.loop = true;
    });

    // attempt to play all videos now
    this.tryPlayAll();

    // fallback: if autoplay was blocked, play after first user gesture
    const onUserGesture = () => {
      this.tryPlayAll();
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
    };
    window.addEventListener('click', onUserGesture);
    window.addEventListener('touchstart', onUserGesture);
  }

  private tryPlayAll() {
    this.videos.forEach(v => {
      const vid = v.nativeElement;
      // some browsers require muted to be set immediately before play call
      vid.muted = true;
      vid.play().catch(err => {
        // ignore — will retry on user gesture
        console.warn('Video play() failed (will retry on user gesture):', err);
      });
    });
  }


  }
