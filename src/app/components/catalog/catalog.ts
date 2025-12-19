import { Component } from '@angular/core';
import { ProductList } from '../product-list/product-list';
import { Search } from '../search/search';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductList,Search,CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
searchTerm: string = '';

  onSearch(term: string) {
    console.log('Received from Search component:', term);
    this.searchTerm = term; 
  }
}
