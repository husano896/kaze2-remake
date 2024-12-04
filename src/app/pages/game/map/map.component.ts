import { AppService } from '@/app/app.service';
import { BioFlag } from '@/data/BioFlag';
import { ItemID } from '@/data/ItemID';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  constructor(private appServ: AppService) {

  }

  ngAfterViewInit(): void {
    this.appServ.setBGM('music13')
  }

  /** 是否為發作 */
  get bio() {
    return this.appServ.saveData.bio & BioFlag.発作;
  }

  get numVisits() {
    return this.appServ.saveData.numVisits;
  }

  async GoTo(title: string, turn: number, url: string, bioCheck?: boolean, state?: { lv?: number }) {
    this.appServ.setSE('snd10')

    if (turn > this.appServ.saveData.turn) {
      this.appServ.Confirm(this.appServ.t(title), this.appServ.t('Game.Map.NotEnoughTurn'))
      return
    }

    if (bioCheck && this.appServ.saveData.bio) {
      // 針對不同地方有不同的禁止進入提示文字
      switch (state?.lv) {

      }
    }
    // 針對不同地方有不同的禁止進入提示文字

    switch (url) {

    }

    // 最後確認
    if (!(await this.appServ.Confirm(
      this.appServ.t(title),
      this.appServ.t('Game.Map.GoToConfirm', { turn }), true))) {
      return;
    }

    this.appServ.Confirm(this.appServ.t(title), '尚未實作')
  }
  /** 是否可點選 忌まわしき地 */
  get game07ON() {
    return this.appServ.saveData.item[ItemID.忌地への道標]
  }
}
