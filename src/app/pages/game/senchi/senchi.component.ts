import { AppService } from '@/app/app.service';
import { DragonChipFlag } from '@/data/DragonChipFlag';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-senchi',
  standalone: true,
  imports: [TranslateModule, CommonModule, SeparateTextPipe, RouterModule],
  templateUrl: './senchi.component.html',
  styleUrl: './senchi.component.scss'
})
export class SenchiComponent implements OnInit {

  dragonTypes = [
    { cost: 50, id: 19, chip: DragonChipFlag.幼竜 },
    { cost: 300, id: 20, chip: DragonChipFlag.児竜 },
    { cost: 1500, id: 17, chip: DragonChipFlag.フィオレッティ },
    { cost: 10000, id: 18, chip: DragonChipFlag.ラジェスト },
  ]
  checkResult: string[] = [];
  constructor(private appServ: AppService) {

  }

  ngOnInit(): void {
    // 已畢業！
    const highestCostDragonType = _.maxBy(this.dragonTypes, d => d.cost);
    if (highestCostDragonType && this.appServ.saveData.DragonChip1 & highestCostDragonType?.chip) {
      this.checkResult = ['これ以上、贈呈されるものはありません。']
      return;
    }
    this.dragonTypes.forEach(t => {
      if (!(this.appServ.saveData.DragonChip1 & t.chip) && this.exp >= t.cost) {
        this.appServ.saveData.DragonChip1 |= t.chip;
        this.checkResult.push(
          this.appServ.t(`{{dragonName}}は、{{dragonTypeName}}の力を得た！`,
            { dragonName: this.appServ.saveData.dragonName, dragonTypeName: this.appServ.t(`Data.DragonType.${t.id}.Title`) }
          )
        );
      }
    })
    if (!this.checkResult.length) {
      this.checkResult.push(
        this.appServ.t(`まだ、贈呈されるほどの戦値を獲得していません。`)
      )
    }
  }

  hasChip(chip: DragonChipFlag) {
    return this.appServ.saveData.DragonChip1 & chip;
  }

  get exp() {
    return this.appServ.saveData.exp;
  }
}
