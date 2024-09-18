import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AppService } from '@/app/app.service';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  tab: 'item' | 'skin' = 'item';

  items = new Array(34).fill(0).map((_, index) => index + 1)

  skins = new Array(22).fill(0).map((_, index) => index)
  selectedItem: any;
  constructor(private router: Router, private appServ: AppService) {

  }
  useItem() {
    this.router.navigate(['..', 'dragongame'])
  }

  get turn() {
    return this.appServ.saveData.turn;
  }
}
