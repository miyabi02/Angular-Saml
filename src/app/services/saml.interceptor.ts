import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class SamlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // ! レスポンス検証コード
      tap((res) => {
        if (res instanceof HttpResponse) {
          console.log(res.headers);
        }
      }),
      catchError((err, res) => {
        console.log(err);
        console.log(res);
        return of();
      })
    );
  }
}
