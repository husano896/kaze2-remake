import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-re-register',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe, CommonModule, TranslateModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './re-register.component.html',
  styleUrl: './re-register.component.scss'
})
export class ReRegisterComponent implements OnInit {

  registerForm = new FormGroup({
    ID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private router: Router, private appServ: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    // 若已經註冊過，踢走
    if (this.appServ.saveData.guid) {
      this.router.navigate(['/game'], { replaceUrl: true })
    }
  }

  async Register() {
    try {
      const resp: { guid: string, btlid: string } = (await firstValueFrom(
        this.http.post('/save', {
          saveData: this.appServ.saveData.ToOnlineSave(),
          password: this.registerForm.value.password,
          email: this.registerForm.value.ID
        })
      )) as { guid: string, btlid: string }
      this.appServ.saveData.guid = resp.guid;
      this.appServ.saveData.btlid = resp.btlid;
      this.appServ.saveData.Save();

      await this.appServ.Confirm('登 録 完 了', 'IDをメモしたら進んで下さい')
      this.router.navigate(['/game'], { replaceUrl: true })
    }
    catch (err) {
      this.appServ.Confirm('ReRegister', JSON.stringify(err));
    }
  }

  get loading() {
    return this.appServ.loading;
  }
}
