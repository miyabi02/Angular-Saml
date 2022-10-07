import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authUrl = 'api/auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {}

  isAuthenticatedbyUser(): Observable<AuthInfo> {
    return this.http
      .post<AuthInfo>(this.authUrl, {}, this.httpOptions)
      .pipe(tap((_) => console.log(`Called: ${this.authUrl}`)));
  }
}

export interface AuthInfo {
  name: string;
}
