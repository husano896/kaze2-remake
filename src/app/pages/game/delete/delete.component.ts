import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {

}
