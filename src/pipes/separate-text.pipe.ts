import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateText',
  standalone: true
})
export class SeparateTextPipe implements PipeTransform {

  transform(value: string): string {
    return [...value].join(' ');
  }

}
