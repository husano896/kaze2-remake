import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component } from '@angular/core';
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
export class NewSaveComponent {
  registerForm = new FormGroup({
    yourName: new FormControl('', [Validators.required]),
    dragonName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  })
}
