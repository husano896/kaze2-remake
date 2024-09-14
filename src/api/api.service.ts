import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { AppService } from '@/app/app.service';

@Injectable({
  providedIn: 'root'
})
/** AppService內不應引用APIService, 而是由各元件/場景引用 */
export class ApiService implements HttpInterceptor {

  constructor(private http: HttpClient, private appServ: AppService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 開始打API時顯示讀取指示器
    this.appServ.loading = true;
    return next.handle(req).pipe(
      finalize(() => {
        this.appServ.loading = false;
      }),
    );
  }

  SaveGame() {

  }
}
