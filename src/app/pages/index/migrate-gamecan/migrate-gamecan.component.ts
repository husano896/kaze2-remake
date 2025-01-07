import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { SaveData } from '@/entities/SaveData';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-migrate-gamecan',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, SeparateTextPipe, DatePipe],
  templateUrl: './migrate-gamecan.component.html',
  styleUrl: './migrate-gamecan.component.scss'
})
export class MigrateGamecanComponent implements OnDestroy {
  newSaveData?: SaveData;
  countDown: number = 0;
  countDownInterval: any;
  constructor(private readonly appServ: AppService,
    private readonly router: Router,
    private readonly http: HttpClient) {
  }

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  migrateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  ngOnDestroy(): void {
    if (this.countDownInterval) {
      clearInterval(this.countDownInterval)
    }
  }
  async Login() {
    try {
      const resp = (await firstValueFrom(this.http.post('/migrate-gamecan', {
        id: this.loginForm.value.id,
        password: this.loginForm.value.password
      }))) as { newSave: any }

      this.newSaveData = SaveData.Load(resp.newSave);
      if (this.countDownInterval) {
        clearInterval(this.countDownInterval)
        this.countDown = 10;
      }
      this.countDownInterval = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(this.countDownInterval)
        }
      })
      this.migrateForm.reset();
    } catch (err) {
      console.warn(err)
      this.appServ.Confirm('Error', 'Login failed');
    }
  }

  async Migrate(local?: boolean) {
    if (!this.newSaveData) {
      return;
    }
    // 本地已存在存檔
    if (this.appServ.saveData.yourName) {
      if (!(await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'),
        this.appServ.t('Register.Ovewrite.Confirm'), true))) {
        return;
      }
    }

    try {
      if (!local) {
        const resp = (
          await firstValueFrom(this.http.post('/save', {
            password: this.migrateForm.value.password,
            email: this.migrateForm.value.id,
            saveData: this.newSaveData?.ToOnlineSave()
          }))) as {
            btlid: string, guid: string
          };

        this.newSaveData.btlid = resp.btlid;
        this.newSaveData.guid = resp.guid;
        await this.appServ.Confirm('Game Canから 登 録 完 了', 'IDをメモしたら進んで下さい')
      }
      this.appServ.saveData = this.newSaveData;
      this.appServ.saveData.Save();
      // 二週目處理
      if ((this.newSaveData.ivent & EventFlag.周目通關) && this.newSaveData.numVisits === -1) {
        this.appServ.saveData.numVisits = 1;
        this.appServ.setLastLogin();
        this.router.navigate(['/game/dialogue'], { replaceUrl: true, state: { event: 'Opening' } });
      } else {
        this.router.navigate(['/game'], { replaceUrl: true })
      }
    }
    catch (err) {
      console.log(err);
      this.appServ.Confirm('Migrate from Game Can', JSON.stringify(err));
    }
  }

  sameIDPW() {
    this.migrateForm.patchValue(this.loginForm.value);
  }

  toDate(v: number) {
    return new Date(v).toLocaleString()
  }
}