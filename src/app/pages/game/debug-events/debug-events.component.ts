import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-debug-events',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './debug-events.component.html',
  styleUrl: './debug-events.component.scss'
})
export class DebugEventsComponent {
  constructor(private router: Router) {

  }
  goDialog(eventName: string) {
    this.router.navigate(['/game/dialogue'], { state: { event: eventName } });
  }
}
