import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})
export class DragongameComponent {
  HyoukaBuff = 1;
  LoveBuff = 1;
  DragonName = '';
  varNowLv = 1;
}
