import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(private router: Router) { }
  Delete() {
    localStorage.removeItem(LocalStorageKey.save);
    location.href = '/'
  }
}
