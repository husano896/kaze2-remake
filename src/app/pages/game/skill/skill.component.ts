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
  skillIds = _.range(19);
  selectedSkills: Array<boolean> = [];
  constructor(private appServ: AppService, private router: Router) {

  }

  ngOnInit(): void {
    this.skillIds.forEach(id => {
      const flag = (1 << id);
      this.selectedSkills[id] = Boolean(this.appServ.saveData.magicS & flag);
    })
  }
  getHasSkillID(skillID: number) {
    const flag = skillID > 0 ? (1 << skillID - 1) : 1;
    return Boolean(this.appServ.saveData.magic & flag);
  }

  Apply() {
    let newValue = 0;
    this.skillIds.forEach(id => {
      if (this.selectedSkills[id]) {
        newValue += (1 << id);
      }
    })
    this.appServ.saveData.magicS = newValue;
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }
}
