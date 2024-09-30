import { AppService } from '@/app/app.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  constructor(private appServ: AppService) {

  }
  
  ngAfterViewInit(): void {
      this.appServ.setBGM('music13')
  }
}
