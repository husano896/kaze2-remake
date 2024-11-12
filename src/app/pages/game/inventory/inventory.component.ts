import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AppService } from '@/app/app.service';
import { FormsModule } from '@angular/forms';
import { BioFlag } from '@/data/BioFlag';
import { EventFlag } from '@/data/EventFlag';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SeparateTextPipe, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  tab: 'item' | 'skin' = 'item';

  // items = new Array(34).fill(0).map((_, index) => index + 1)
  skins = new Array(22).fill(0).map((_, index) => index)
  selectedItem: number | null = null;

  constructor(private router: Router, private appServ: AppService) {

  }
  useItem() {
    if (!this.selectedItem) {
      return;
    }
  }
  onSelectedItemChange($event: any) {
    console.log($event);
  }
  get turn() {
    return this.appServ.saveData.turn;
  }

  get items() {
    return this.appServ.saveData.item;
  }

  get saveData() {
    return this.appServ.saveData;
  }

  //#region 龍能力值
  /** 親密度文字 */
  get loveText() {
    return `Data.Love.${Math.round((this.saveData?.love || 0) / 100)}`;
  }
  get dragonName() {
    return this.saveData?.dragonName || '孤竜';
  }

  get stLv() {
    return this.saveData?.lv || 0;
  }
  get stHp() {
    return this.saveData?.hp || 0;
  }
  get stMaxhp() {
    return this.saveData?.Maxhp || 0;
  }

  get stAt() {
    return this.saveData?.at || 0;
  }

  get stDf() {
    return this.saveData?.df || 0;
  }
  get stSpeed() {
    return this.saveData?.speed || 0;
  }

  get stExp() {
    return this.saveData?.exp || 0;
  }

  get stBio() {
    return this.saveData?.bio;
  }

  // 是否於恐怖症
  get isInAfraidBio() {
    return this.saveData?.bio & BioFlag.恐怖;
  }

  get stBioText() {
    return this.saveData?.bioText || '';
  }

  get stElement() {
    return this.saveData?.elementText || '';
  }
  get stGender() {
    return ((this.saveData?.ivent || 0) & EventFlag.性別) ? 'メス' : 'オス';
  }
  //#endregion


}
