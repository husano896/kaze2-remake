import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'separateText',
  standalone: true,
})
export class SeparateTextPipe implements PipeTransform {
  
  constructor (private translateServ: TranslateService) {

  }
  transform(value: string): string {
    // 如果為非日文或中文時不做分隔, 改用大寫
    const currentLang = this.translateServ.currentLang;
    if (!currentLang.includes('ja') && !currentLang.includes('zh')) {
      return value.toLocaleUpperCase();
    }
    return [...value].join(' ');
  }

}
