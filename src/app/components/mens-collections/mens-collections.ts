import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mens-collections',
  imports: [CommonModule],
  templateUrl: './mens-collections.html',
  styleUrl: './mens-collections.css'
})
export class MensCollections {
  products = [
   
    { img1: '../../../assets/images/3-2.webp', img2: 'assets/images/3-1.webp', name: 'bangels'},
    { img1: '../../../assets/images/4-1.webp', img2: '../../../assets/images/4-2.webp' ,name:'bangels'},
    { img1: '../../../assets/images/5-1.webp', img2: '../../../assets/images/5-1.webp' , name:'bagnesl' },
    { img1: '../../../assets/images/Black Onyx Signet Ring - Gold1.webp', img2: '../../../assets/images/Black Onyx Signet Ring - Gold2.webp' , name:'Black Onyx Signet Ring '},
    { img1: '../../../assets/images/Clover - Gold1.webp', img2: '../../../assets/images/Clover - Gold2.webp' , name:'Clover - Gold2.webp'},
    { img1: '../../../assets/images/Cross Drop (Gold)1.webp', img2: '../../../assets/images/Cross Drop (Gold)2.webp', name:'Cross Drop (Gold)2.webp' },
    { img1: '../../../assets/images/Cuban Ring - Gold1.webp', img2: '../../../assets/images/Cuban Ring - Gold2.webp' , name:'Cuban Ring - Gold2.webp'},
    { img1: '../../../assets/images/Gold Cuban Bracelet1.webp', img2: '../../../assets/images/Gold Cuban Bracelet2.webp', name:'Gold Cuban Bracelet2.webp' },
    { img1: '../../../assets/images/Gold Figaro Bracelet1.webp', img2: '../../../assets/images/Gold Figaro Bracelet2.webp', name:'Gold Figaro Bracelet2.webp' },
    { img1: '../../../assets/images/Gold Rope Bracelet (5MM)1.webp', img2: '../../../assets/images/Gold Rope Bracelet (5MM)2.webp', name:'Gold Rope Bracelet (5MM)2.webp' },
    { img1: '../../../assets/images/Hammered Band Ring - Gold1.webp', img2: '../../../assets/images/Hammered Band Ring - Gold2.webp' , name:'Hammered Band Ring - Gold2.webp'},
    { img1: '../../../assets/images/Hammered Cuff - Gold1.webp', img2: '../../../assets/images/Hammered Cuff - Gold2.webp', name:'Hammered Cuff - Gold2.webp'},
    { img1: '../../../assets/images/Mini Bar - Gold1.webp', img2: '../../../assets/images/Mini Bar - Gold2.webp' , name:'Mini Bar - Gold2.webp'},
    { img1: '../../../assets/images/Mini Cross (Thin Chain) - 18K Gold1.webp', img2:'../../../assets/images/Mini Cross (Thin Chain) - 18K Gold2.webp', name:'Mini Cross (Thin Chain) - 18K Gold2.webp' },
    { img1: '../../../assets/images/Mini Lapis Lazuli - Gold1.webp', img2: '../../../assets/images/Mini Lapis Lazuli - Gold2.webp' , name:'Mini Lapis Lazuli - Gold2.webp'},
    { img1: '../../../assets/images/North Star - Gold1.webp', img2: '../../../assets/images/North Star - Gold2.webp' , name:'North Star - Gold2.webp'},
    { img1: '../../../assets/images/Octura - Gold1.webp', img2: '../../../assets/images/Octura - Gold2.webp' , name:'Octura - Gold2.webp'},
    { img1: '../../../assets/images/Standard Huggie (Gold)1.webp', img2: 'assets/images/Standard Huggie (Gold)2.webp', name:'Standard Huggie (Gold)2.webp' },
    { img1: '../../../assets/images/Tigers Eye Signet Ring - Gold1.webp', img2: '../../../assets/images/Tigers Eye Signet Ring - Gold2.webp' , name:'Tigers Eye Signet Ring - Gold2.webp'},
  
  ];

 

}
