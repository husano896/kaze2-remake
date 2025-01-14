import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AppService } from '@/app/app.service';
import { IBattleData } from '@/data/battle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-battle-list',
  standalone: true,
  imports: [TranslateModule, RouterModule, SeparateTextPipe, CommonModule, FormsModule],
  templateUrl: './battle-list.component.html',
  styleUrl: './battle-list.component.scss'
})
export class BattleListComponent implements OnInit {
  list?: IBattleData[] = [];

  selectedBattleID?: string;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appServ: AppService,
    private readonly translateServ: TranslateService) {
  }

  async ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log(data)
      this.list = data.data;
      this.appServ.setBGM('music31')
    })
  }

  Reload() {
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, onSameUrlNavigation: 'reload' })
  }

  getBattleDataElementText(d: IBattleData) {
    const elements = [];
    if (d.element1 > 50) {
      elements.push(this.translateServ.instant('Data.Element.Fire'))
    }
    if (d.element1 < 50) {
      elements.push(this.translateServ.instant('Data.Element.Water'))
    }
    if (d.element2 > 50) {
      elements.push(this.translateServ.instant('Data.Element.Earth'))
    }
    if (d.element2 < 50) {
      elements.push(this.translateServ.instant('Data.Element.Wind'))
    }
    if (!elements.length) {
      elements.push(this.translateServ.instant('Data.Element.None'))
    }
    return elements.join('/')
  }
  get leagueName() {
    return this.translateServ.instant(`Game.Battle.Cup.${Math.floor(this.appServ.saveData.numVisits / 10)}`);
  }
}
