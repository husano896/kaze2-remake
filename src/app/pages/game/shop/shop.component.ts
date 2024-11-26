import { AppService } from '@/app/app.service';
import { BioFlag } from '@/data/BioFlag';
import { EventFlag } from '@/data/EventFlag';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import _ from 'lodash-es';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SeparateTextPipe, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, AfterContentChecked {

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

  selectedItems: Array<number> = [];
  selectedFood: number = -1;

  moneyWhenEntered: number = 0;
  constructor(private router: Router, private appServ: AppService) {

  }
  ngOnInit(): void {
    this.moneyWhenEntered = this.appServ.saveData.food;
  }
  ngAfterContentChecked(): void {
    console.log(this.selectedItems)
  }
  async onSubmit() {
    if (this.totalCost <= 0) {
      return;
    }
    this.appServ.saveData.turn--;
    if (this.tab === 'item') {
      this.selectedItems.forEach((_, index) => {
        const itemId = this.items[index].id;
        this.appServ.saveData.item[itemId]++;
      })
      this.appServ.saveData.food -= this.totalCost;
      this.selectedItems = [];
      return;
    }
    else if (this.tab === 'food') {
      console.log(this.selectedFood)
      let varbuff: string[] = [];
      var varMaxHpFlg = 0;
      var varHpFlg = 0;
      var varAtFlg = 0;
      var varDfFlg = 0;
      var varSpeedFlg = 0;
      var varLoveFlg = 0;
      switch (this.selectedFood) {
        case 0:	// 初級えさ(平均30回程度)
          varMaxHpFlg += 1; varLoveFlg += 1;
          break;
        case 1:
          varDfFlg += 1; varLoveFlg += 1;
          break;
        case 2:// 海流の巻貝
          varAtFlg += 1; varLoveFlg += 1;
          break;
        case 3:// 海辺のキノコ
          varHpFlg += 1; varSpeedFlg += 1; varLoveFlg += 1;
          break;

        case 4:	// アツアツふかし芋		中級えさ(平均3回程度)
          varHpFlg += 5; varMaxHpFlg += 6; varLoveFlg += 1; varSpeedFlg -= 2;
          break;
        case 5:	// 厚焼きの卵
          varHpFlg += 5; varAtFlg += 6; varLoveFlg += 1; varDfFlg -= 2;
          break;
        case 6:	// 微癒の亀酒
          varHpFlg += Math.round((Math.random() * 20) + (this.appServ.saveData.Maxhp / 3) * 1.25);
          break;
        case 7:	// ソテツの実
          varHpFlg += 5; varDfFlg += 6; varLoveFlg += 1; varAtFlg -= 1;
          break;
        case 8:	// サンドラの実
          varHpFlg += 5; varSpeedFlg += 6; varLoveFlg += 1; varMaxHpFlg -= 1;
          break;

        case 9:	// 磯苔のまんま		 上級えさ(平均1.7回程度)
          varHpFlg += 15; varAtFlg += 9; varLoveFlg += 2; varSpeedFlg -= 1;
          break;
        case 10:	// 海草のサラダ
          varHpFlg += 15; varSpeedFlg += 9; varLoveFlg += 2; varDfFlg -= 1;
          break;
        case 11:// 山羊のチーズフォンデュ
          varHpFlg += 15; varMaxHpFlg += 9; varLoveFlg += 4;
          break;
        case 12:// 磯貝のクラムチャウダー
          varHpFlg += 15; varDfFlg += 9; varLoveFlg += 4;
          break;

        case 13:// 風魚のミルフィーユ仕立て	// 最高級えさ
          varHpFlg += 20; varAtFlg += 8; varLoveFlg += 4; varMaxHpFlg += 6; varDfFlg -= 1;
          break;
        case 14:// ドラコッコのクリーム煮
          varHpFlg += 30; varSpeedFlg += 8; varLoveFlg += 4; varDfFlg += 6; varMaxHpFlg -= 1;
          break;
        case 15:// 旅人草と巻貝のグラチネ
          varHpFlg += 40; varMaxHpFlg += 8; varLoveFlg += 5; varAtFlg += 6;
          break;
        case 16:// 風魚のチーズ焼きピストー
          varHpFlg += 50; varDfFlg += 8; varLoveFlg += 5; varSpeedFlg += 6;
          break;

        case 17:	// スペシャル
          varHpFlg += 100; varMaxHpFlg += 4; varAtFlg += 4; varDfFlg += 4; varSpeedFlg += 4; varLoveFlg += 5;
          break;

        case 18:	// 超癒の龍酒
          varHpFlg += 99999; varMaxHpFlg += 2; varLoveFlg += 1;
          break;
      }
      if (varMaxHpFlg) {
        this.appServ.saveData.Maxhp += varMaxHpFlg;
        varbuff.push("生命力:" + this.PS_Mark(varMaxHpFlg))
      }
      if (varHpFlg) {
        this.appServ.saveData.hp += varHpFlg;
        varbuff.push("傷治癒:" + this.PS_Mark(varHpFlg))
      }
      if (varDfFlg) {
        this.appServ.saveData.df += varDfFlg;
        varbuff.push("体格:" + this.PS_Mark(varDfFlg));
      }
      if (varAtFlg) {
        this.appServ.saveData.at += varAtFlg;
        varbuff.push("筋力:" + this.PS_Mark(varAtFlg));
      }
      if (varSpeedFlg) {
        this.appServ.saveData.speed += varSpeedFlg;
        varbuff.push("瞬力:" + this.PS_Mark(varSpeedFlg));
      }
      if (varLoveFlg) {
        this.appServ.saveData.love += varLoveFlg;
        varbuff.push("愛情度:" + this.PS_Mark(varLoveFlg));
      }
      // DataSave();
      await this.appServ.Confirm(`${this.appServ.saveData.dragonName}は、餌をおいしそうにほおばった。`, varbuff.join('\r\n'))
      this.router.navigate(['/game/dragongame'], { replaceUrl: true })
      this.appServ.saveData.turn--;
      this.appServ.saveData.food -= this.foodsCosts[this.selectedFood];
    }
  }

  onTabClick(tab: string) {
    // 若為進食時須確認是否可進行
    if (tab === 'food') {
      if ((this.saveData.numVisits == 96) || (this.saveData.numVisits >= 98)) {
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Fatal'))
        return;
      }
      if (this.saveData.bio & BioFlag.眠酔) {
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Food.64'))
        return;
      }
      if (this.saveData.bio & BioFlag.発作) {
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Food.128'))
        return;
      }
      if (this.saveData.bio & BioFlag.衰弱) {
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Food.1'))
        return;
      }
      if (this.saveData.turn <= 0) {
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'), this.appServ.t('Scripts.Confirm.Action.NoTurn'))
        return;
      }
      if ((this.saveData.overLv > this.saveData.numVisits) && !(this.saveData.ivent & EventFlag.周目通關)) { // 2週目の時は問題なし
        this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Food.OverLv'))
        return;
      }
    }
    this.tab = tab as any;

    this.selectedItems = [];
    this.selectedFood = -1;
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
    if (this.tab === 'item') {
      return _.sum(this.items.map((i, index) => i.cost * (this.selectedItems[index] ? 1 : 0))) || 0;
    }
    else if (this.tab === 'food') {
      return this.selectedFood >= 0 ? this.foodsCosts[this.selectedFood] : 0;
    }
    return 0;
  }

  get money() {
    return this.appServ.saveData?.food || 0;
  }

  get turn() {
    return this.appServ.saveData?.turn || 0;
  }
  get remainingMoney() {
    return this.money - this.totalCost;
  }

  get debug() {
    return this.appServ.debug;
  }

  get ownItems() {
    return this.appServ.saveData?.item;
  }

  get readyToEat() {
    return this.appServ.saveData?.readyToEat;
  }

  get saveData() {
    return this.appServ.saveData;
  }
}


