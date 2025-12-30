import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bestsellers',
  imports: [CommonModule],
  templateUrl: './bestsellers.html',
  styleUrl: './bestsellers.css'
})
export class Bestsellers {

  

  necklaceSets = [
  {
    name: "Classic Gold Necklace Set",
    price: 3499,
    image: "https://manubhai.in/SocialMedia/post_artworks/DABE04013.jpg?ver=2.1"
  },
  {
    name: "Royal Diamond Wedding Set",
    price: 5899,
    image: "https://i.pinimg.com/736x/48/eb/de/48ebde65615a53f58f0713eb16e964ab.jpg"
  },
  {
    name: "Premium Bridal Necklace",
    price: 7299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySCfJX_6DvycRZxxuR_CKYFZ9CcK_Adbx8y4ZwJEzt6YBYnmLFdgoHzz0BwUvfli2uOk&usqp=CAU"
  },
  {
    name: "Artificial Fashion Necklace",
    price: 1999,
    image: "https://rukminim2.flixcart.com/image/480/580/xif0q/necklace-chain/p/i/8/1-ad-neck-multi-110-a-necklace-set-yimbli-original-imahdj5qkdrvvgne.jpeg?q=90"
  }
];


  Bangles = [
  {
    name: "Antique Golden Bracelet Set",
    price: 2999,
    image: "https://media.istockphoto.com/id/1277517088/photo/fancy-designer-antique-golden-bracelets-for-woman-fashion.jpg?s=612x612&w=0&k=20&c=n49O0S5rIgzxJX5bU1YjwRHfou0DYPcmsv-N5JAAM14="
  },
  {
    name: "Premium Bridal Kada Set",
    price: 5499,
    image: "https://ppjeweller.com/cdn/shop/files/R0A0604_large.jpg?v=1763808444"
  },
  {
    name: "Stone Studded Elegant Bracelets",
    price: 2499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6grZaxx9ogeYkTK7_iFTi3g_c5dduE9U2Yw&s"
  },
  {
    name: "Designer Wedding Bangles",
    price: 3899,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEc_uaDx-QlEkACDRxwaOfNPaoEmw0AY102twrh1tmYVkNQ3oIc_HOI87yxQI2YKi9QE&usqp=CAU"
  }
];

bracelets = [
  {
    name: "Classic Multi-Bead Bracelet",
    price: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSepfBBTNxMxTksd9415vpZqiHcfw5fv2rZEyAEZK1ayD4hBUMMfL4n_IwIPLCE4w8ouXY&usqp=CAU"
  },
  {
    name: "Fashion Jewelry Party Bracelet",
    price: 1899,
    image: "https://assets.ajio.com/medias/sys_master/root/20240524/M2VJ/66509fc316fd2c6e6a247578/-473Wx593H-6006973030-multi-MODEL.jpg"
  },
  {
    name: "Gold-Polish Designer Bracelet",
    price: 2299,
    image: "https://ratnalayajewels.com/wp-content/uploads/2024/01/KA13432-2.jpg"
  }
];

swaras = [
  {
    name: "Premium Bridal Matil",
    price: 2499,
    image: "https://bangarurani.com/cdn/shop/collections/A5EB201E-0680-4339-8DF0-54412725E544.jpg?v=1728844894"
  },
  {
    name: "Antique Gold Matil",
    price: 1999,
    image: "https://www.kushals.com/cdn/shop/files/antique-matil-ruby-gold-antique-matil-152092-37972793491612.jpg?v=1712297790&width=1200"
  },
  {
    name: "Matt Finish Designer Matil",
    price: 1799,
    image: "https://shop.southindiajewels.com/wp-content/uploads/2023/12/Unqiue-Matt-Premium-Gold-Polish-Mattal-2.jpg"
  }
];

rings = [
  {
    name: "Lakshmi Devi Precious Ring",
    price: 2999,
    image: "https://www.vaibhavjewellers.com/pub/media/catalog/product/image/5162ab2f/22k-gold-lakshmi-devi-precious-stone-vanki-25vg600-25vg600.jpg"
  },
  {
    name: "Bridal Gold Bangles Motif Ring",
    price: 4999,
    image: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/image/256214f00/bridal-gold-bangles-with-rama-and-sita-kalyanam-motif-125mhoaa19215-125mhoaa19228.jpg"
  }
];

paapidBilla = [
  {
    name: "Two-Gram Gold Nethichutti",
    price: 1899,
    image: "https://www.chidambaramgoldcovering.com/image/cache/catalog/ChidambaramGoldCovering/nethichutti/ncht360-new-forming-plain-two-gram-gold-nethichutti-shop-online-1-850x1000.jpg"
  },
  {
    name: "Simple Bridal Paapid Billa",
    price: 1599,
    image: "https://i.pinimg.com/236x/a8/a4/c1/a8a4c1fd4c6da830bc3881ee401f9b13.jpg"
  }
];

boysBracelets = [
  {
    name: "Men’s Box Chain Bracelet",
    price: 1299,
    image: "https://www.soni.fashion/cdn/shop/files/1GramGoldPlatedProminentDesignBoxBraceletforMen.jpg?v=1743252556&width=720"
  },
  {
    name: "Strong Gold Chain Style Bracelet",
    price: 1799,
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/necklace-chain/d/r/y/1-jmkf-b-01-chain-set-jmk-fashion-original-imagwzgauervmqgt.jpeg?q=90"
  },
  {
    name: "Heart Design Gold Bracelet",
    price: 1499,
    image: "https://media6.ppl-media.com//tr:h-235,w-235,c-at_max,dpr-2,q-40/static/img/product/290164/yellow-chimes-trendy-and-stylish-link-heart-design-18k-gold-plated-wide-bracelet-for-men-and-boy-s_1_display_1649916364_20e271e4.jpg"
  }
];
}