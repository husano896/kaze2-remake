import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe, CommonModule, TranslateModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent implements OnInit, OnDestroy {
  countDown: number = 20;
  interval: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.interval = setInterval(() => { this.countDown-- }, 1000)
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  Delete() {
    if (this.countDown > 0) {
      return;
    }
    localStorage.removeItem(LocalStorageKey.save);
    location.href = '/'
  }
}
