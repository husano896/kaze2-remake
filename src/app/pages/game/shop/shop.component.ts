import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  tab: 'item' | 'food' = 'item';

  items = [
    { cost: 10, id: 20 },	//varid[20]// 魔法のクジ
    { cost: 25, id: 9 },	//varid[9] // 精霊根
    { cost: 70, id: 14 },	//varid[14]// 光りキノコ
    { cost: 100, id: 10 },	//varid[10]// 召喚の杖
    { cost: 120, id: 24 },	//varid[24]// 催酔薬
    { cost: 200, id: 23 },	//varid[23]// 抗生薬
    { cost: 1500, id: 11 },//varid[11]// 精霊の眼鏡
    { cost: 2500, id: 12 },//varid[12]// ＤＮＡ種
    { cost: 3000, id: 19 },//varid[12]// 虚無の塊
  ]
  foodsCosts = [3, 3, 4, 5, 25, 28, 30, 50, 55, 85, 90, 95, 100, 130, 140, 180, 200, 300, 300]

  selectedItem: any;
  constructor(private router: Router, private appServ: AppService) {

  }
  async onSubmit() {
    await this.appServ.Confirm('商店', '功能尚未實作完成，之後再回來看看吧！')
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }
  // 能力上昇率を表示
  PS_Mark(varUp: number) {
    switch (varUp) {
      case 1: return "○";
      case 0: return "－";
      case -1: return "△";
      default:
        if (varUp >= 10) return "★";
        if (varUp >= 5) return "☆";
        if (varUp >= 2) return "◎";
        if (varUp <= -2) return "×";
        return ''
    }
  }
  get totalCost() {
    return 0;
  }

  get money() {
    return this.appServ.saveData?.food || 0;
  }
}


