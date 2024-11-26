import { AppService } from '@/app/app.service';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent extends DialogueSystem {

  PlayerBuffFlags = [

  ]
  EnemyBuffFlags = [

  ]
  constructor(injector: Injector) {
    super(injector)
  }

  Phase_Wait() {

  }
  Phase_Player() {

  }

  Phase_Enemy() {

  }

  Phase_Result() {
    // 復活判定
  }
  Result_Win() {

  }

  Result_Lose() {

  }

  Result_Escape() {

  }

  onEscapeClick() {
    
  }
}
