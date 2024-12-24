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
export class LoginComponent implements OnInit {
  constructor(private appServ: AppService, private router: Router, private http: HttpClient) {

  }
  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  ngOnInit() {
    console.log(this.loginForm);
  }
  async Login() {
    try {
      const resp = (await firstValueFrom(this.http.post('/login', {
        email: this.loginForm.value.id,
        password: this.loginForm.value.password
      }))) as { saveData: any }

      this.appServ.saveData = SaveData.Load(resp.saveData);
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
