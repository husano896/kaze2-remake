import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { SaveData } from '@/entities/SaveData';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private appServ: AppService, private router: Router) {

  }
  ngAfterViewInit(): void {
    console.log(this.registerForm)
  }

  async onSubmit($event: any) {
    // this.appServ.loading = true;
    const newSaveData = new SaveData();
    newSaveData.yourName = this.registerForm.value.yourName as string;
    newSaveData.dragonName = this.registerForm.value.dragonName as string;
    if (this.registerForm.value.gender === 'F') {
      newSaveData.ivent |= EventFlag.性別;
    }
    try {
      await this.appServ.Confirm('註冊', '功能尚未完成，以本機模式進行。')

      this.router.navigate(['/welcome'], { replaceUrl: true })
    }
    finally {
      this.appServ.loading = false;
    }
  }
}
