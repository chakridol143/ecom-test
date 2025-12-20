import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-womens-collections',
  imports: [CommonModule, NgFor],
  templateUrl: './womens-collections.html',
  styleUrl: './womens-collections.css'
})
export class WomensCollections {

  @Output() close = new EventEmitter<void>();

  womensCollections = [
  { image: 'e1.jpg', name: 'Jumka', price: 1299 },
  { image: 'e2.avif', name: 'Jumkt', price: 999 },
  { image: 'e3.jpg', name: 'Jumka', price: 699 },
  { image: 'e4.jpg', name: 'Jumka', price: 1499 },
 
];

//  closeView() {
//     this.close.emit();
//   }

 necklaceSets = [
  {
    image: "https://manubhai.in/SocialMedia/post_artworks/DABE04013.jpg?ver=2.1",
    name: "Royal Kundan Necklace Set",
    price: 15999
  },
  {
    image: "https://i.pinimg.com/736x/48/eb/de/48ebde65615a53f58f0713eb16e964ab.jpg",
    name: "Bridal Ruby Necklace",
    price: 18999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySCfJX_6DvycRZxxuR_CKYFZ9CcK_Adbx8y4ZwJEzt6YBYnmLFdgoHzz0BwUvfli2uOk&usqp=CAU",
    name: "Emerald Pearl Necklace",
    price: 13999
  },
  {
    image: "https://rukminim2.flixcart.com/image/480/580/xif0q/necklace-chain/p/i/8/1-ad-neck-multi-110-a-necklace-set-yimbli-original-imahdj5qkdrvvgne.jpeg?q=90",
    name: "Elegant Bridal Necklace",
    price: 20999
  }
];


  ringsBangles = [
  {
    image: "https://media.istockphoto.com/id/1277517088/photo/fancy-designer-antique-golden-bracelets-for-woman-fashion.jpg?s=612x612&w=0&k=20&c=n49O0S5rIgzxJX5bU1YjwRHfou0DYPcmsv-N5JAAM14=",
    name: "Antique Designer Bangle",
    price: 7999
  },
  {
    image: "https://ppjeweller.com/cdn/shop/files/R0A0604_large.jpg?v=1763808444",
    name: "Premium Diamond Bangle",
    price: 12999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6grZaxx9ogeYkTK7_iFTi3g_c5dduE9U2Yw&s",
    name: "Gold Stylish Ring",
    price: 2999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEc_uaDx-QlEkACDRxwaOfNPaoEmw0AY102twrh1tmYVkNQ3oIc_HOI87yxQI2YKi9QE&usqp=CAU",
    name: "Bridal Ruby Ring",
    price: 3499
  }
];

bracelets = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSepfBBTNxMxTksd9415vpZqiHcfw5fv2rZEyAEZK1ayD4hBUMMfL4n_IwIPLCE4w8ouXY&usqp=CAU",
    name: "Gold Plated Bracelet",
    price: 2499
  },
  {
    image: "https://assets.ajio.com/medias/sys_master/root/20240524/M2VJ/66509fc316fd2c6e6a247578/-473Wx593H-6006973030-multi-MODEL.jpg",
    name: "Crystal Stone Bracelet",
    price: 1899
  },
  {
    image: "https://ratnalayajewels.com/wp-content/uploads/2024/01/KA13432-2.jpg",
    name: "Traditional Beaded Bracelet",
    price: 2599
  }
];

 
}
