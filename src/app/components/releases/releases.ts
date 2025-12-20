import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-releases',
  imports: [CommonModule, NgFor],
  templateUrl: './releases.html',
  styleUrls: ['./releases.css']
})
export class Releases {

  @Output() close = new EventEmitter<void>();

  products = [
    {
      title: "Indian Gold Plated Jhumka Jewelry Big Traditional Pave Green CZ Cubic Zirconia Drop Tassel Earrings for Women Evening Party Wear",
      video: "//play.video.alibaba.com/play/u/2153292369/p/1/e/6/t/10300/383101497097.mp4",
      price: 1469,
      oldPrice: 5876,
      discount: "Save 75%",
      taxIncluded: true,
      images: [
        "https://sc04.alicdn.com/kf/Hc1adcfd98d4f43539c8dd9a4ee14feb4H.jpg",
        "https://sc04.alicdn.com/kf/Hb040c1d72051430d8a297db4623240f4C.jpg",
        "https://sc04.alicdn.com/kf/H5d7af7ee52034b8b910fa2c663bbca69C.jpg",
        "https://sc04.alicdn.com/kf/Heb4a13af95464c8a8e94acf26088e054b.jpg",
        "https://sc04.alicdn.com/kf/H98470e6a188e4431af0da9e839c2ca42z.jpg",
        "https://sc04.alicdn.com/kf/Hd1bb5a43c5c04a68b24691ceec7460b2V.jpg"
      ]
    },
    {
      title: "14K 18K Gold Plated Cuban Chain with Monaco Key Lock Clasp Iced Out Solid Brass Heavy Hip Hop Bracelet and Necklace for Men",
      video: "//play.video.alibaba.com/play/u/2153292369/p/1/e/6/t/10300/6000313922688.mp4",
      images: [
        "https://sc04.alicdn.com/kf/H3bfc07366e0746e293de05cee9aedaedd.jpg",
        "https://sc04.alicdn.com/kf/Hf49dbcf00b944630987659af77d3d173Q.jpeg",
        "https://sc04.alicdn.com/kf/H372b5de24ff5400c8d102ba5be8bb557L.jpg",
        "https://sc04.alicdn.com/kf/H08df540ef64944dda5a69fdbcb9fab72v.jpeg",
        "https://sc04.alicdn.com/kf/He49ca9425df34c15993dcd97228dde3dH.jpeg",
        "https://sc04.alicdn.com/kf/Hf954a858f3324108aa6fd22fc8b0447au.jpeg"
      ]
    }
  ];

  activeIndex: number[] = this.products.map(() => -1);

  setActive(p: number, index: number) {
    this.activeIndex[p] = index;
  }

  next(p: number) {
    this.activeIndex[p] = (this.activeIndex[p] + 1) % this.products[p].images.length;
  }

  prev(p: number) {
    this.activeIndex[p] =
      (this.activeIndex[p] - 1 + this.products[p].images.length) %
      this.products[p].images.length;
  }

  //pendents
  videoGrid = [
    {
      name: "Elegant Diamond Ring",
      price: 6999,
      video: "https://kinvid0.bluestone.com/output/mp4/BISK0368P05-VIDEO-21066.mp4/BISK0368P05-VIDEO-21066.mp4"
    },
    {
      name: "Gold Pendant Beauty",
      price: 4999,
      video: "https://kinvid0.bluestone.com/output/mp4/BIVT0055P07-VIDEO-3980.mp4/BIVT0055P07-VIDEO-3980.mp4"
    },
    {
      name: "Pearl Stone Ring",
      price: 8599,
      video: "https://kinvid0.bluestone.com/output/mp4/BIRS0006P37-VIDEO-3090.mp4/BIRS0006P37-VIDEO-3090.mp4"
    },
    {
      name: "Bridal Gold Ring",
      price: 7899,
      video: "https://kinvid0.bluestone.com/output/mp4/BISK0368P02-VIDEO-21069.mp4/BISK0368P02-VIDEO-21069.mp4"
    },
    {
      name: "Ruby Diamond Ring",
      price: 9500,
      video: "https://kinvid1.bluestone.com/output/mp4/BIIP0633P39-VIDEO-46382.mp4/BIIP0633P39-VIDEO-46382.mp4"
    },
    {
      name: "Wedding Ring Premium",
      price: 6699,
      video: "https://kinvid1.bluestone.com/output/mp4/BIRS0108P01-VIDEO-3008.mp4/BIRS0108P01-VIDEO-3008.mp4"
    },
    {
      name: "Designer Ring Model",
      price: 8899,
      video: "https://kinvid0.bluestone.com/output/mp4/BISP0419P25-VIDEO-37706.mp4/BISP0419P25-VIDEO-37706.mp4"
    },
    {
      name: "Gold Platinum Mix Ring",
      price: 9999,
      video: "https://kinvid1.bluestone.com/output/mp4/BIPM0002P01-VIDEO-4226.mp4/BIPM0002P01-VIDEO-4226.mp4"
    },
    {
      name: "Couple Wedding Ring",
      price: 7599,
      video: "https://kinvid1.bluestone.com/output/mp4/BIPM0002P01-VIDEO-4226.mp4/BIPM0002P01-VIDEO-4226.mp4"
    },
    {
      name: "Golden Stone Ring",
      price: 6599,
      video: "https://kinvid0.bluestone.com/output/mp4/BIIP0554P08-VIDEO-44686.mp4/BIIP0554P08-VIDEO-44686.mp4"
    },
    {
      name: "Signature Style Ring",
      price: 8999,
      video: "https://kinvid0.bluestone.com/output/mp4/BIVS0001P18-VIDEO-6916.mp4/BIVS0001P18-VIDEO-6916.mp4"
    },
    {
      name: "Trending Gold Band",
      price: 7200,
      video: "https://kinvid1.bluestone.com/output/mp4/BISA0092P04-VIDEO-4706.mp4/BISA0092P04-VIDEO-4706.mp4"
    }
  ];

  stopAllVideos() {
    const videos = document.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  }

  playVideo(event: Event) {
    this.stopAllVideos(); // stop others first
    const video = event.target as HTMLVideoElement;
    video.play();
  }

  pauseVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }


}
