import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { IBattleServiceResolveData } from '../battle/battle.service';
import { SaveData } from '@/entities/SaveData';
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
  leagueNames: string[] = [
    "ビ ギ ナ ー ズ カ ッ プ",
    "キ ッ ズ ド ラ ゴ ン カ ッ プ",
    "ポ イ ル ト ッ プ カ ッ プ",
    "ノ ー マ ル カ ッ プ",
    "ハ ー ド カ ッ プ",
    "エ キ ス パ ー ト カ ッ プ",
    "プ ロ フ ェ ッ シ ョ  ナ ル カ ッ プ",
    "マ ス タ ー ド ラ ゴ ン カ ッ プ",
    "レ ジ ェ ン ド ド ラ ゴ ン カ ッ プ",
    "フ ァ イ ナ ル カ ッ プ"
  ]
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appServ: AppService) {
  }

  async ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log(data)
      this.list = data.data;
    })

  }

  Reload() {
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, onSameUrlNavigation: 'reload' })
  }

  get leagueName() {
    return this.leagueNames[Math.floor(this.appServ.saveData.numVisits / 10)];
  }
}
