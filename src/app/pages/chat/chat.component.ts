import { AppService } from '@/app/app.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IChatData {
  color: string;
  text: string;
  time: number;
  name: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent implements OnInit {

  colors = [
    { name: 'Blue', color: '#0D47A1' },
    { name: 'Red', color: '#B71C1C' },
    { name: 'Green', color: '#1B5E20' },
    { name: 'Brown', color: '#3E2723' },
    { name: 'Black', color: '#000000' },
  ]

  selectedColor: string = this.colors[0].color;

  chatText: string = '';
  chatData: Array<IChatData> = [];

  error: any;

  constructor(private readonly router: Router, private readonly appServ: AppService, private readonly http: HttpClient) {

  }
  ngOnInit(): void {
    this.Refresh();
  }

  async Back() {
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }

  async Refresh() {
    this.appServ.loading = true;
    try {
      const resp = await firstValueFrom(
        this.http.get<{ data: Array<IChatData> }>('/chat')
      )
      this.chatData = resp.data;
      this.chatData.sort((a, b) => b.time - a.time);
      this.error = null;
    } catch (err) {
      console.warn(err)
      this.error = err;
    }
    finally {
      this.appServ.loading = false;
    }
  }

  async Submit() {
    if (!this.ableToChat) {
      return;
    }

    this.appServ.loading = true;
    try {
      await firstValueFrom(
        this.http.post<{ data: Array<{ color: string, text: string }> }>('/chat', {
          name: this.playerName,
          text: this.chatText,
          color: this.selectedColor
        })
      )
      await this.Refresh();
      this.error = null;
    } catch (err) {
      console.warn(err)
      this.error = err;
    }
    finally {
      this.appServ.loading = false;
    }
  }
  get playerName() {
    return this.appServ.saveData?.yourName;
  }

  get ableToChat() {
    return this.appServ.saveData?.newGamePlusTimes > 0;
  }
}
