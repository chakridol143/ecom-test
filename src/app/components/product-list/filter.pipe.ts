
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    const lower = searchText.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(lower));
  }
}