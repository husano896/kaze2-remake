import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [TranslateModule, CommonModule, SeparateTextPipe, RouterModule, FormsModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit {
  skillIds = _.range(19).map(i => i > 0 ? (1 << i) : 1);
  selectedSkills: Array<boolean> = [];
  constructor(private readonly appServ: AppService, private readonly router: Router) {

  }

  ngOnInit(): void {
    console.log(this.skillIds)
    this.skillIds.forEach((id,index) => {

      // 先前存檔的修正
      if ((this.appServ.saveData.magicS & id) && !(this.appServ.saveData.magic & id)) {
        this.appServ.saveData.magicS ^= id;
      }
      // 勾選
      console.log('selected', id, Boolean(this.appServ.saveData.magicS & id))
      this.selectedSkills[index] = Boolean(this.appServ.saveData.magicS & id);
    })
    console.log(this.selectedSkills);
  }
  getHasSkillID(skillID: number) {
    return Boolean(this.appServ.saveData.magic & skillID);
  }

  Apply() {
    let newValue = 0;
    this.skillIds.forEach((id,index) => {
      if (this.selectedSkills[index]) {
        console.log('selected', id)
        newValue |= id;
      }
    })
    this.appServ.saveData.magicS = newValue;
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }
}
