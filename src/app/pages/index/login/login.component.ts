import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, SeparateTextPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private appServ: AppService, private router: Router) {

  }
  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  Login() {
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
}
