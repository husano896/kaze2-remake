import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-data-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './save-data-editor.component.html',
  styleUrl: './save-data-editor.component.scss'
})
export class SaveDataEditorComponent {
  opened?: boolean;
  constructor(private appServ: AppService, private router: Router, private route: ActivatedRoute) {

  }

  close() {
    this.opened = false;
    this.router.navigate(['.'], { relativeTo: this.route, onSameUrlNavigation: 'reload' });
  }

  get data() {
    return this.appServ.saveData;
  }
}
