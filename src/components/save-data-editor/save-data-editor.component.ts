import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-save-data-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './save-data-editor.component.html',
  styleUrl: './save-data-editor.component.scss'
})
export class SaveDataEditorComponent {
  opened?: boolean;

  dragonChips = _.range(22).map(i => i > 0 ? (0x1 << i - 1) : 0);

  magics = _.range(19).map(i => i > 0 ? (0x1 << i) : 1);
  constructor(private readonly appServ: AppService, private readonly router: Router, private readonly route: ActivatedRoute) {

  }

  close() {
    this.opened = false;
    this.router.navigate(['.'], { relativeTo: this.route, onSameUrlNavigation: 'reload' });
  }
  getEventActive(eventIndex: number) {
    return this.appServ.saveData.ivent & (0x1 << (eventIndex));
  }
  onEventChange(index: number, checked: any) {
    if (checked) {
      this.appServ.saveData.ivent |= (0x1 << (index));
    } else {
      this.appServ.saveData.ivent ^= (0x1 << (index));
    }
  }


  getBioActive(bio: number) {
    return this.appServ.saveData.bio & (0x1 << (bio - 1));
  }

  getBioText(bioIndex: number) {
    return this.appServ.t(`Data.Bio.${0x1 << (bioIndex - 1)}`)
  }

  onBioChange(index: number, checked: any) {
    if (checked) {
      this.appServ.saveData.bio |= (0x1 << (index - 1));
    } else {
      this.appServ.saveData.bio ^= (0x1 << (index - 1));
    }
  }
  getDragonChip1Active(dragonChip: number) {
    return this.appServ.saveData.DragonChip1 & dragonChip;
  }

  onDragonChip1Change(chip: number, checked: any) {
    if (checked) {
      this.appServ.saveData.DragonChip1 |= chip;
    } else {
      this.appServ.saveData.DragonChip1 ^= chip;
    }
  }

  getMagicActive(magic: number) {
    return this.appServ.saveData.magic & magic;
  }

  onMagicChange(magic: number, checked: any) {
    console.log(magic, checked)
    if (checked) {
      this.appServ.saveData.magic |= magic;
    } else {
      this.appServ.saveData.magic ^= magic;
    }
  }


  getMagicSActive(magicS: number) {
    return this.appServ.saveData.magicS & magicS;
  }

  onMagicSChange(magicS: number, checked: any) {
    if (checked) {
      this.appServ.saveData.magicS |= magicS;
    } else {
      this.appServ.saveData.magicS ^= magicS;
    }
  }

  get data() {
    return this.appServ.saveData;
  }

  get stBioText() {
    return (this.data?.bioText || []).map(bio => this.appServ.t(bio)).join(',');
  }
}
