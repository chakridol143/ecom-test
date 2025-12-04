import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  searchTerm = '';
  @Output() searchEvent = new EventEmitter<string>();
   @Output() filterEvent = new EventEmitter<void>();
  onSearch()   { this.searchEvent.emit(this.searchTerm.trim()); }
  onKeyUp()    { this.searchEvent.emit(this.searchTerm.trim()); }


onFilter() {
  this.filterEvent.emit();
}
}
