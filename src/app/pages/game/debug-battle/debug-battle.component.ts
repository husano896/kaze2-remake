import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-debug-battle',
    imports: [RouterModule, TranslateModule],
    templateUrl: './debug-battle.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './debug-battle.component.scss'
})
export class DebugBattleComponent {
  constructor(private readonly router: Router) { }
  goToBattle(battleName: string) {
    this.router.navigate(['/game/battle'], {
      state: { battle: battleName, debugMenu: true },
      replaceUrl: true
    })
  }
}
