import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AppService } from '@/app/app.service';
import { FormsModule } from '@angular/forms';
import { BioFlag } from '@/data/BioFlag';


const varInc_hp = new Array(0, 30, 10, 10, 100, 50, 20, 50, 10, 50, 50, 200, 20, 0, 5, 50, 100, 100, 5, 10, 200);
const varInc_at = new Array(0, 15, 30, 0, 0, 50, 10, 0, 0, 50, 50, 60, 30, 100, 5, 50, 0, 80, 0, 3, 150);
const varInc_df = new Array(100, 15, 0, 30, 0, 50, 10, 0, 0, 50, 50, 60, 2, 0, 5, 50, 20, 80, 0, 2, 150);
const varInc_speed = new Array(0, 15, 0, 0, 0, 50, 10, 0, 30, 50, 50, 60, 2, 0, 5, 50, 0, 80, 0, 3, 150);
const varInc_element1 = new Array(0, 0, 0, 0, 0, 100, 0, 0, 0, -100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const varInc_element2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, -100, 0, 0, 0, 0, 0);

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
  skins = new Array(22).fill(0).map((_, index) => index > 0 ? (0x1 << (index - 1)) : 0)
  selectedItems: Array<boolean> = [];
  selectedSkin: number = -1;
  disabled?: boolean;
  constructor(private router: Router, private appServ: AppService) {

  }

  async onTabClick(tab: 'item' | 'skin') {
    if (this.tab === 'skin') {
      if (this.saveData.turn <= 0) {
        await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'), this.appServ.t('Scripts.Confirm.Action.NoTurn'))
        return;
      }
    }
    this.tab = tab;
    this.selectedItems = [];
    this.selectedSkin = -1;
  }

  async useItem() {
    if (this.tab === 'item') {
      this.disabled = true;
      var varMaxHpFlg = 0;
      var varHpFlg = 0;
      var varAtFlg = 0;
      var varDfFlg = 0;
      var varFoodFlg = 0;
      var varSpeedFlg = 0;
      var varLoveFlg = 0;
      var varElementFlg = 0;	// 属性増加付与
      var varBioFlg = 0;		// 病気治癒
      var varElement1 = 0;	// 属性増分率
      var varElement2 = 0;
      var varMegane = 0;		// 眼鏡をつかったか？
      var varKyomuFlg = 0;	// 虚無の塊を使ったか？
      var varFukatuFlg = 0;	// 復活の玉を使ったかどうか
      var varSleepFlg = 0;	// 催酔薬を使ったかどうか
      var varDNAFlg = 0;		// ＤＮＡ種を使ったかどうか
      var varMichisirube = 0;	// 忌まわしき地への道標を使ったかどうか
      var varHyousyou = 0;
      const varBuffs: Array<string> = []
      this.selectedItems.forEach((checked, index) => {
        console.log(checked, index)
        if (!checked) {
          return;
        }

        switch (index) {
          case 1:				// タリスマン
            varBioFlg += 4;
            if (this.appServ.saveData.element1 > 0) { varElement1 += 2; } else { varElement1 -= 2 }
            if (this.appServ.saveData.element2 > 0) { varElement2 += 2; } else { varElement2 -= 2 }
            this.appServ.saveData.item[index]--;
            break;
          case 2:				// 太陽の珠
            varElement1 -= 10;
            break;
          case 3:				// 銀峰の雫
            varElement1 += 10;
            break;
          case 4:				// 風の翼
            varElement2 -= 10;
            break;
          case 5:				// 大地の琥珀
            varElement2 += 10;
            break;
          case 6: 				// ナーガ草
            varElement1 += 5;
            varBioFlg += 32;
            varHpFlg = this.appServ.saveData.Maxhp;
            this.appServ.saveData.item[index]--;
            break;
          case 7:				// 復活の玉
            varElement2 += 1;
            varFukatuFlg = 1;
            break;
          case 8: 				// 友情の証
            varElement1 -= 5;
            varBioFlg += 16;
            this.appServ.saveData.item[index]--;
            break;
          case 9:				// 精霊根
            varElement1 += 1;
            varHpFlg = Math.round((Math.random() * 20) + (this.appServ.saveData.Maxhp / 3));
            this.appServ.saveData.item[index]--;
            break;
          case 10:				// 召喚の杖
            varElement2 -= 1;
            break;
          case 11:				// 精霊の眼鏡
            varElement1 += 1;
            varElement2 += 1;
            varMegane = 1;
            break;
          case 12:				// ＤＮＡ種
            varDNAFlg = 1;
            this.appServ.saveData.item[index]--;
            break;
          case 13: 				// ユニコーンの角
            varElement2 -= 5;
            varBioFlg = 262144;
            this.appServ.saveData.item[index]--;
            break;
          case 14:  				// 光きのこ
            varElement2 += 3;
            varMaxHpFlg += 1;
            varAtFlg += 1;
            this.appServ.saveData.item[index]--;
            break;
          case 15:				// 精竜水
            varElement1 += 1;
            break;
          case 16:				// 誇りの賞状
            varHyousyou = 1;
            this.appServ.saveData.item[index]--;
            break;
          case 17:				// 万物の素
            varElementFlg = 1;	// 属性増分ON
            this.appServ.saveData.item[index]--;
            break;
          case 18:				// ホイップケーキ
            varElement1 += 3;
            varElement2 += 3;
            varMaxHpFlg += 2;
            varDfFlg += 2;
            varAtFlg += 2;
            varLoveFlg += 40;
            this.appServ.saveData.item[index]--;
            break;
          case 19:				// 虚無の塊
            varKyomuFlg = 1;
            if (this.appServ.saveData.DragonChip2 == 0) {
              this.appServ.saveData.element1 = 50;
              this.appServ.saveData.element2 = 50;
              this.appServ.saveData.item[index]--;
            }
            break;
          case 20:				// 魔法のクジ
            varElement1 -= 2;
            if (Math.round(Math.random() * 450) == 1) {
              varFoodFlg += 5000;
            } else if (Math.round(Math.random() * 800) < 10) {
              varFoodFlg += (200 + Math.round(Math.random()));
            } else if (Math.round(Math.random() * 10) < 2) {
              varFoodFlg += (20 + Math.round(Math.random()));
            } else {
              varFoodFlg += (1 + Math.round(Math.random()));
            }
            this.appServ.saveData.item[index]--;
            break;
          case 21:				// 幻の秘石
            varLoveFlg += 100;
            varElement2 += 10;
            varLoveFlg += 10;
            this.appServ.saveData.item[index]--;
            break;
          case 23:				// 抗生薬
            varBioFlg += 2;
            varElement1 -= 3;
            this.appServ.saveData.item[index]--;
            break;
          case 24:				// 催酔薬
            varSleepFlg = 1;
            varElement2 -= 3;
            this.appServ.saveData.item[index]--;
            break;
          case 25:				// 忌まわしき地への道標
            varMichisirube = 1;
            break;

        }

      })

      if (varMegane) {		// 属性の解析
        varBuffs.push("＞現在の仔竜の内部因子を透かしてみた……");
        if (this.appServ.saveData.element1 < 50) { varBuffs.push("炎レベル：" + ((50 - this.appServ.saveData.element1) * 2) + "/ 目標:100"); }
        if (this.appServ.saveData.element1 > 50) { varBuffs.push("水レベル：" + ((this.appServ.saveData.element1 - 50) * 2) + "/ 目標:100"); }
        if (this.appServ.saveData.element1 == 50) { varBuffs.push("炎/水　　無属性"); }
        if (this.appServ.saveData.element2 < 50) { varBuffs.push("風レベル：" + ((50 - this.appServ.saveData.element2) * 2) + "/ 目標:100"); }
        if (this.appServ.saveData.element2 > 50) { varBuffs.push("地レベル：" + ((this.appServ.saveData.element2 - 50) * 2) + "/ 目標:100"); }
        if (this.appServ.saveData.element2 == 50) { varBuffs.push("風/地　　無属性"); }
      }

      if (varElementFlg) {		// 属性の増加(虚無の塊使用時は非表示)
        if (varKyomuFlg && this.appServ.saveData.DragonChip2 == 0) {
        } else {
          if (varHyousyou) {							// 誇りの賞状を使うと強化
            varElement1 = Math.round(varElement1 * 2);
            varElement2 = Math.round(varElement2 * 2);
          }
          this.appServ.saveData.element1 += varElement1;
          this.appServ.saveData.element2 += varElement2;
          if (varElement1 < 0) {
            varBuffs.push("＞炎属性:" + Math.abs(varElement1 * 2) + "ポイント増加");
            varBuffs.push("＞水属性:" + Math.abs(varElement1 * 2) + "ポイント低下");
          }
          if (varElement1 > 0) {
            varBuffs.push("＞水属性:" + Math.abs(varElement1 * 2) + "ポイント増加");
            varBuffs.push("＞炎属性:" + Math.abs(varElement1 * 2) + "ポイント低下");
          }
          if (varElement2 < 0) {
            varBuffs.push("＞風属性:" + Math.abs(varElement2 * 2) + "ポイント増加");
            varBuffs.push("＞地属性:" + Math.abs(varElement2 * 2) + "ポイント低下");
          }
          if (varElement2 > 0) {
            varBuffs.push("＞地属性:" + Math.abs(varElement2 * 2) + "ポイント増加");
            varBuffs.push("＞風属性:" + Math.abs(varElement2 * 2) + "ポイント低下");
            if (!varBuffs.length) varBuffs.push("属性変化なし");
          }
        }
      }

      if (varDNAFlg) {		// DNA種
        if (!(this.appServ.saveData.DragonChip1 & 128)) {
          this.appServ.saveData.DragonChip1 |= 128;
          varBuffs.push("＞体内に" + this.appServ.t('Data.DragonType.8.Title') + " の力が備わった。");
          this.appServ.setSE('snd15')
        } else if (!(this.appServ.saveData.DragonChip1 & 1)) {
          this.appServ.saveData.DragonChip1 |= 1;
          varBuffs.push("＞体内に" + this.appServ.t('Data.DragonType.1.Title') + " の力が備わった。");
          this.appServ.setSE('snd15')
        } else if (!(this.appServ.saveData.DragonChip1 & 8192)) {
          this.appServ.saveData.DragonChip1 |= 8192;
          varBuffs.push("＞体内に" + this.appServ.t('Data.DragonType.14.Title') + " の力が備わった。<BR>" + this.appServ.t('Data.Item.12.Title') + "による構成要素は全て発現し尽くした。");
          this.appServ.setSE('snd15')
        } else {
          varBuffs.push("＞DNAをこれ以上構成することはできなかった。");
        }
      }

      if (varBioFlg) {			// 病気回復
        if ((varBioFlg & 2) && (this.appServ.saveData.bio & 4) && varElementFlg) {
          this.appServ.saveData.bio ^= 4; varBuffs.push("＞育成障害が緩和してゆく…。");
        }
        if ((varBioFlg & 2) && (this.appServ.saveData.bio & 2)) {
          this.appServ.saveData.bio ^= 2;
          varBuffs.push("＞痙攣が治まってゆく…。");
        }
        if ((varBioFlg & 16) && (this.appServ.saveData.bio & 16)) {
          this.appServ.saveData.bio ^= 16;
          varBuffs.push("＞呪縛が解き放たれ、恐怖症が消え去った。");
        }
        if ((varBioFlg & 4) && (this.appServ.saveData.bio & 16) && (varBioFlg & 2)) {
          this.appServ.saveData.bio ^= 16;
          varBuffs.push("＞呪縛が解き放たれ、恐怖症が消え去った。");
        }
        if ((varBioFlg & 32) && (this.appServ.saveData.bio & 32) && (varBioFlg & 2)) {
          this.appServ.saveData.bio ^= 32;
          varBuffs.push("＞調合薬により、重症が治まってゆく…。");
        }
        if (varBioFlg & 262144) {
          if (this.appServ.saveData.bio & 128) {
            this.appServ.saveData.bio = 128;
          }
          else {
            this.appServ.saveData.bio = 0;
          }
          varBuffs.push("＞全てのステータスが浄化された！");
        }
        if (!varBuffs.length) {
          varBuffs.push("＞ステータスには特に問題はありません。");
        }
      }

      if ((this.appServ.saveData.overLv > this.appServ.saveData.numVisits) && (varMaxHpFlg || varDfFlg || varAtFlg || varSpeedFlg) && !(this.appServ.saveData.ivent & 256)) {	// 2週目は問題なし
        varBuffs.push("＞孤竜は満腹で、アイテムの効果が出なかった。");
      } else {
        if (varMaxHpFlg) { this.appServ.saveData.Maxhp += varMaxHpFlg; varBuffs.push("＞生命力:" + varMaxHpFlg + "ポイント増加"); }
        if (varDfFlg) { this.appServ.saveData.df += varDfFlg; varBuffs.push("＞体格:" + varDfFlg + "ポイント増加"); }
        if (varAtFlg) { this.appServ.saveData.at += varAtFlg; varBuffs.push("＞筋力:" + varAtFlg + "ポイント増加"); }
        if (varSpeedFlg) { this.appServ.saveData.speed += varSpeedFlg; varBuffs.push("＞瞬力:" + varSpeedFlg + "ポイント増加"); }
      }
      if (varHpFlg) { this.appServ.saveData.hp = Math.min(this.appServ.saveData.Maxhp, this.appServ.saveData.hp + varHpFlg); varBuffs.push("＞生命力:" + varHpFlg + "ポイント回復"); }
      this.appServ.setSE('snd08')
      if (varLoveFlg > 0) { this.appServ.saveData.love += varLoveFlg; varBuffs.push("＞愛情度がアップした。"); }
      if (varLoveFlg < 0) { this.appServ.saveData.love -= varLoveFlg; varBuffs.push("＞愛情度がダウンした。"); }
      if (varKyomuFlg) {
        if (this.appServ.saveData.DragonChip2 == 0) {
          varBuffs.push("＞全ての属性値は無へと帰した…");
        } else {
          varBuffs.push("＞虚無の塊は変身中は使えない。");
        }
      }
      if (varFoodFlg) {
        this.appServ.saveData.food += varFoodFlg; varBuffs.push("＞シェル:" + varFoodFlg + "シェル 生み出された。");
      }
      if (varFukatuFlg) {
        varBuffs.push("＞" + this.appServ.t('Data.Item.7.Title') + "は危険が迫らないと発動しません。");
      }
      if (varSleepFlg) {
        this.appServ.saveData.bio |= BioFlag.眠酔; varBuffs.push("＞孤竜は、深い眠りへと落ちていった…。");
      }

      if (varMichisirube) {
        if (varBuffs.length > 0) {
          varBuffs.push("＞" + this.appServ.t('Data.Item.25.Title') + "は、他のアイテムと同時には使えない。");
        } else {
          varBuffs.push("＞" + this.appServ.t('Data.Item.25.Title') + "には、こう記されている。<BR>");
          varBuffs.push(
            "<small>「竜と人の行く末に幸いあれ　辿り直されし道程が",
            "暗き帳に包まれし時　新たな道を示す者なり",
            "過ぎし日の過ちが　やがて時の流れを塞ぐ時",
            "祖を打ち破らんとする者なり",
            "尽きる事無き神獣の持つ灯火と",
            "島持つ岬より降りし知恵の滴りを携え",
            "南東の果てを尋ねよ",
            "されど　いかなる者も我らを称え給うな",
            "罪と咎を負う我らを」<BR></small>");
        }
      }
      if (varBuffs.length === 0) {
        varBuffs.push("＞特に何も起こらなかった。");
      }
      this.selectedItems = []
      await this.appServ.Confirm(`${this.appServ.saveData.dragonName}はアイテムを使用した。`, varBuffs.join('\r\n'))
      this.disabled = false;
    }

    else if (this.tab === 'skin') {
      if (this.selectedSkin === this.saveData.DragonChip2) {
        // 目前套用中的外表與選中的相同
        return;
      }
      // 若已有契約加護令，將先前套用的效果去除
      if (this.saveData.DragonChip2 != 0) {
        const OldDragonChipIndex = Math.log2(this.saveData.DragonChip2);
        console.log(OldDragonChipIndex)
        this.appServ.saveData.Maxhp -= varInc_hp[OldDragonChipIndex];
        this.appServ.saveData.at -= varInc_at[OldDragonChipIndex];
        this.appServ.saveData.df -= varInc_df[OldDragonChipIndex];
        this.appServ.saveData.speed -= varInc_speed[OldDragonChipIndex];
        this.appServ.saveData.element1 -= varInc_element1[OldDragonChipIndex];
        this.appServ.saveData.element2 -= varInc_element2[OldDragonChipIndex];
        this.appServ.saveData.lvOffset -= (varInc_hp[OldDragonChipIndex] + varInc_at[OldDragonChipIndex] + varInc_df[OldDragonChipIndex] + varInc_speed[OldDragonChipIndex]);
      }
      // 套用新的契約加護印效果
      const NewDragonChipIndex = Math.log2(this.selectedSkin);
      console.log(this.selectedSkin, NewDragonChipIndex);
      this.appServ.saveData.DragonChip2 = this.selectedSkin;
      this.appServ.saveData.Maxhp += varInc_hp[NewDragonChipIndex];
      this.appServ.saveData.at += varInc_at[NewDragonChipIndex];
      this.appServ.saveData.df += varInc_df[NewDragonChipIndex];
      this.appServ.saveData.speed += varInc_speed[NewDragonChipIndex];
      this.appServ.saveData.element1 += varInc_element1[NewDragonChipIndex];
      this.appServ.saveData.element2 += varInc_element2[NewDragonChipIndex];
      this.appServ.saveData.lvOffset += (varInc_hp[NewDragonChipIndex] + varInc_at[NewDragonChipIndex] + varInc_df[NewDragonChipIndex] + varInc_speed[NewDragonChipIndex]);
      this.disabled = true;
    }
    this.appServ.saveData.turn--;
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }


  getOwnDragonChip(chip: number) {
    return chip > 0 ? this.saveData.DragonChip1 & chip : true;
  }

  get selectedItemsCount() {
    if (this.tab === 'item') {
      return this.selectedItems.length;
    }
    return this.selectedSkin >= 0;
  }
  get turn() {
    return this.appServ.saveData.turn;
  }

  get isNoItem() {
    return !this.appServ.saveData.item.find(i => i > 0)
  }
  get items() {
    return this.appServ.saveData.item;
  }

  get saveData() {
    return this.appServ.saveData;
  }

  //#region 龍能力值

  get debug() {
    return this.appServ.debug
  }
  /** 親密度文字 */
  get loveText() {
    return `Data.Love.${Math.round((this.saveData?.love || 0) / 100)}`;
  }

  get dragonName() {
    return this.saveData?.dragonName || '孤竜';
  }

  get stLv() {
    return this.saveData?.nowLv || 0;
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

  get stBioText() {
    return (this.saveData?.bioText || []).map(bio => this.appServ.t(bio)).join(',');
  }

  // 是否於恐怖症
  get isInAfraidBio() {
    return this.saveData?.bio & BioFlag.恐怖;
  }

  get stBio() {
    return this.saveData?.bio || 0;
  }

  get stElement() {
    return this.saveData?.elementText || '';
  }

  get dragonChip1() {
    return this.saveData.DragonChip1;
  }
  get dragonChip2() {
    return this.saveData?.DragonChip2;
  }
  //#endregion


}
