import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { SaveData } from '@/entities/SaveData';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-save',
  standalone: true,
  imports: [RouterModule, TranslateModule, FormsModule, ReactiveFormsModule, SeparateTextPipe],
  templateUrl: './new-save.component.html',
  styleUrl: './new-save.component.scss'
})
export class NewSaveComponent implements AfterViewInit, OnInit {
  registerForm = new FormGroup({
    ID: new FormControl('', [Validators.required]),
    yourName: new FormControl('', [Validators.required]),
    dragonName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  })

  constructor(private appServ: AppService, private router: Router, private location: Location, private http: HttpClient) {  }

  ngOnInit(): void {
      if (this.newGamePlus) {
        // 將畫面上的隱藏欄位確認移除
        this.registerForm.controls.ID.clearValidators();
        this.registerForm.controls.yourName.clearValidators();
        this.registerForm.controls.password.clearValidators();
        this.registerForm.controls.yourName.setValue(this.appServ.saveData.yourName);
      }
  }
  ngAfterViewInit(): void {
    console.log(this.registerForm)
  }

  async onSubmit(local?: boolean) {
    if (!this.newGamePlus) {
      if (Boolean(this.appServ.saveData.yourName)) {
        if (!(await this.appServ.Confirm(('Scripts.Confirm.Title.Warning'), '目前的裝置內已有進度，是否繼續？'))) {
          return;
        }
      } else {
        this.appServ.saveData = new SaveData();
      }
    }
    const newSaveData = this.appServ.saveData;
    newSaveData.yourName = this.registerForm.value.yourName as string;
    newSaveData.dragonName = this.registerForm.value.dragonName as string;

    if (this.registerForm.value.gender === 'F') {
      newSaveData.ivent |= EventFlag.性別;
    }

    try {
      // 二週目處理
      //#region 將存檔存至線上
      if (!local) {
        if (this.newGamePlus) {
          await firstValueFrom(this.http.put('/save', {
            saveData: newSaveData.ToOnlineSave(),
            guid: newSaveData.guid,
            btlid: newSaveData.btlid
          }))
        } else {
          const resp = (
            await firstValueFrom(this.http.post('/save', {
              password: this.registerForm.value.password,
              email: this.registerForm.value.ID,
              saveData: newSaveData.ToOnlineSave()
            }))) as {
              btlid: string, guid: string
            };
          newSaveData.btlid = resp.btlid;
          newSaveData.guid = resp.guid;
        }
        await this.appServ.Confirm('登 録 完 了', 'IDをメモしたら進んで下さい')
      }
      // 二週目處理
      if (this.newGamePlus) {
        newSaveData.numVisits = 1;
        this.appServ.setLastLogin();
        this.router.navigate(['/game/dialogue'], { replaceUrl: true, state: { event: 'Opening' } });
      } else {
        this.router.navigate(['/welcome'], { replaceUrl: true })
      }
    } catch (err) {
      this.appServ.Confirm('Register', JSON.stringify(err));
    }
    finally {
    }
  }

  get newGamePlus() {
    const state = this.location.getState() as { newGamePlus: boolean };
    return state?.newGamePlus;
  }
}
