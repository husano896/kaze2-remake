import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-save',
  standalone: true,
  imports: [RouterModule, TranslateModule, FormsModule, ReactiveFormsModule, SeparateTextPipe],
  templateUrl: './new-save.component.html',
  styleUrl: './new-save.component.scss'
})
export class NewSaveComponent implements AfterViewInit {
  registerForm = new FormGroup({
    yourName: new FormControl('', [Validators.required]),
    dragonName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  })

  constructor (private appServ: AppService) {

  }
  ngAfterViewInit(): void {
      console.log(this.registerForm)
  }

  async onSubmit($event: any) {
    this.appServ.loading = true;
    try {
      this.appServ.Confirm('註冊', '功能還沒寫好，晚點再來吧。')
    }
    finally {
      this.appServ.loading = false;
    }
  }
}
