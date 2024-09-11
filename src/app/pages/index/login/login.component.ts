import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, SeparateTextPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  registerForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  })
}
