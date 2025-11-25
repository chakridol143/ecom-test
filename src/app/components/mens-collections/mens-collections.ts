import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mens-collections',
  imports: [CommonModule],
  templateUrl: './mens-collections.html',
  styleUrl: './mens-collections.css'
})
export class MensCollections {
   @Output() close = new EventEmitter<void>();

  // poster=[
  //   "https://www.candere.com/media/catalog/category/men_s-chain.jpg"
  // ]

  bracelets = [
  {
    image: "https://assets.ajio.com/medias/sys_master/root/20240524/e7Dq/6650c46f05ac7d77bb792c1a/-1117Wx1400H-6006973810-multi-MODEL.jpg",
    name: "Stone Charm Bracelet",
    price: 2499
  },
  {
    image: "https://www.radheimitation.in/cdn/shop/files/WhatsApp_Image_2025-07-30_at_12.09.05_PM_1@2x.jpg?v=1753867858",
    name: "Gold Plated Butterfly Bracelet",
    price: 1899
  },
  {
    image: "https://www.morvijewels.com/cdn/shop/files/il_fullxfull.4875923218_4bi6.jpg?v=1750155452&width=1946",
    name: "Premium Crystal Bracelet",
    price: 3299
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTml_KUB_vnOYL1h4Xty3ynx1sBEfV-9ODo6OtsE-sNqj8fEUP6yE0F796eHCr1Edo_k&usqp=CAU",
    name: "Adjustable Designer Bracelet",
    price: 1599
  }
];


 chains = [
  {
    image: "https://www.everestgoldcovering.com/image/cache/catalog/Chain/chn092-latest-kerala-chain-box-with-golden-ball-design-daily-wear-collection-for-men-1-850x1000.jpg.webp",
    name: "Kerala Gold Chain",
    price: 8999
  },
  {
    image: "https://www.kasturidiamond.com/public/product_images/3256.jpg",
    name: "Diamond Cut Gold Chain",
    price: 11999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEGfv8e9_JSMDTyBZvP0M4xvDZ1Ehtf7O77jtqA1GFP7xUp3PiCm33q7m8wRiDySRXfc&usqp=CAU",
    name: "Traditional Daily Wear Chain",
    price: 7499
  }
];


rings = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOaf2TfnYiqE97UNVdgh_EGIieQyUL07SgA&s",
    name: "Classic Gold Ring",
    price: 4999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8FDP_vrhn1lnD6NMlaXWJTgWoApV0QL7i1O_TyU62vhrR15KVofBlQ6pbgyFBgtndyAw&usqp=CAU",
    name: "Heart Stone Ring",
    price: 3999
  },
  {
    image: "https://i.ebayimg.com/images/g/an4AAOSwlNFmYuEE/s-l400.jpg",
    name: "Rose Gold Designer Ring",
    price: 5599
  }
];


 kidsCollections = [
  {
    image: "https://images.bhimagold.com/products/bracelets/images/01fc2cdc-b4eb-4b5a-9779-31d5669fa8e5-NGO-BGBR-B-P-K-P-23413741.webp",
    name: "Kids Cute Bracelet",
    price: 1299
  },
  {
    image: "https://images.bhimagold.com/products/bracelets/images/abdf466a-5ec9-48bb-b25e-b957ad7cb068-NGO-BGBR-KAB-P-K-P-24524135.webp",
    name: "Cartoon Charm Bracelet",
    price: 999
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTyGRo_wClgH8Wzha-Ibip6rvmrSHV8_zUiA&s",
    name: "Kids Gold Style Bangle",
    price: 1499
  },
  {
    image: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/35e64ddb4d7712d39b0a6cf34b1ef253/image/294762aeb/contemporary-charm-kids-gold-ring-93mhoib25914.jpg",
    name: "Kids Golden Ring",
    price: 899
  },
  {
    image: "https://www.chidambaramgoldcovering.com/image/cache/catalog/ChidambaramGoldCovering/bracelets/brac415-trendy-very-fashion-style-heart-design-one-gram-gold-braclet-jewelry-for-marriage-use-buy-online-PSH-2-1a-221x260.jpg",
    name: "Kids Glam Bracelet",
    price: 1199
  },
  {
    image: "https://images.bhimagold.com/products/bracelets/images/a4c4bf18-e200-48f0-a351-9892590f2b6a-NGO-BGBR-B-P-K-P-24329003.webp",
    name: "Heart Charm Kids Bracelet",
    price: 1399
  }
];

 

}
