import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { AppService } from '@/app/app.service';
// const baseUrl = 'http://localhost:8787';
const baseUrl = 'https://api.re-kaze2.xflydragon.cc'
@Injectable({
  providedIn: 'root'
})
/** AppService內不應引用APIService, 而是由各元件/場景引用 */
export class ApiService implements HttpInterceptor {

  constructor(private http: HttpClient, private appServ: AppService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 開始打API時顯示讀取指示器
    this.appServ.loading = true;

    // 未有完整網址時預設打到API服
    if (req.url.startsWith('/')) {
      req = req.clone({
        url: baseUrl + req.url
      })
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.appServ.loading = false;
      }),
    );
  }

}
