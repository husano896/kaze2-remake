import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { SaveData } from '@/entities/SaveData';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, SeparateTextPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private readonly appServ: AppService,
     private readonly router: Router, 
     private readonly http: HttpClient) {
  }
  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  async Login() {
    try {
      const resp = (await firstValueFrom(this.http.post('/login', {
        email: this.loginForm.value.id,
        password: this.loginForm.value.password
      }))) as { saveData: any }

      const newSaveData = SaveData.Load(resp.saveData);
      //#region 若跟本地存檔不同人的判定
      if (Boolean(this.appServ.saveData.yourName) && (
        newSaveData.yourName !== this.appServ.saveData.yourName ||
        newSaveData.dragonName !== this.appServ.saveData.dragonName ||
        newSaveData.numVisits !== this.appServ.saveData.numVisits ||
        newSaveData.newGamePlusTimes !== this.appServ.saveData.newGamePlusTimes
      )) {
        if (!(await this.appServ.Confirm(this.appServ.t(`Login.Continue.Confirm`),
          this.appServ.t(`Login.Continue.Status`, {
            numVisits2: newSaveData.numVisits,
            newGamePlus2: newSaveData.newGamePlusTimes,
            dragonName2: newSaveData.dragonName,
            yourName2: newSaveData.yourName,
            numVisits1: this.appServ.saveData.numVisits,
            newGamePlus1: this.appServ.saveData.newGamePlusTimes,
            dragonName1: this.appServ.saveData.dragonName,
            yourName1: this.appServ.saveData.yourName
          }), true))) {
          return;
        }
      }
      //#endregion
      this.appServ.saveData = newSaveData;
      console.log(resp);

      // newGamePlus判定
      if (this.appServ.saveData.ivent & EventFlag.周目通關 && this.appServ.saveData.numVisits === -1) {
        this.router.navigate(['/new_save'], { replaceUrl: true, state: { newGamePlus: true } })
        return;
      }
      this.router.navigate(['/game'], { replaceUrl: true })
    } catch (err) {
      console.warn(err)
      this.appServ.Confirm('Error', 'Login failed');
    }
  }
  LoginLocal() {
    if (this.loginForm.value.id?.toLocaleLowerCase().includes('test') ||
      this.loginForm.value.password?.toLocaleLowerCase().includes('test')) {
      this.appServ.debug = true;
    }

    // newGamePlus判定
    if (this.appServ.saveData.ivent & EventFlag.周目通關 && this.appServ.saveData.numVisits === -1) {
      this.router.navigate(['/new_save'], { replaceUrl: true, state: { newGamePlus: true } })
      return;
    }
    this.router.navigate(['/game'], { replaceUrl: true })
  }

  get localFileExist() {
    return Boolean(this.appServ.saveData.yourName);
  }
}
