import { Pipe, PipeTransform } from '@angular/core';
import { strict } from 'assert';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, q?: string,colName?: string): any {
      if(!value) return null;
      if(!q) return value;
      q = q.toLowerCase();
      return value.filter((item)=> {
          return item[colName].toLowerCase().includes(q);
      });
  }
}
