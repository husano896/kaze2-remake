import { AppService } from '@/app/app.service';
import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-debug-dungeon',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SaveDataEditorComponent],
  templateUrl: './debug-dungeon.component.html',
  styleUrl: './debug-dungeon.component.scss'
})
export class DebugDungeonComponent implements AfterViewInit, OnDestroy {
  waiting?: boolean;
  constructor(private readonly router: Router, private readonly appServ: AppService) {

  }
  
  ngAfterViewInit(): void {
    this.appServ.setBGM();
    this.appServ.setAmbient();
    this.appServ.setSE();
  }

  ngOnDestroy(): void {
    this.appServ.setBGM();
    this.appServ.setAmbient();
    this.appServ.setSE();
  }

  goDungeon(dungeonName: string) {
    this.router.navigate(['/game/dungeon'], { state: { lv: dungeonName, debugMenu: true } });
    this.waiting = true;
  }

  get debug() {
    return this.appServ.debug;
  }
}
