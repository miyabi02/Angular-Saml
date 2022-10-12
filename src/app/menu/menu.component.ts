import { Component, OnInit } from '@angular/core';
// import { ApiService, AuthInfo } from '../services/api.service';
import * as authWindow from '../auth/auth-window';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  // info: AuthInfo | undefined;

  sessionID: string = "";

  // constructor(private api: ApiService) {}
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('ssid') ?? "";
  }

  login(): void {
    // 認証済みチェックAPIをコール
    // this.api.isAuthenticatedbyUser().subscribe(i => this.info = i);

    // * Angularアプリ(ダイアログ)のリダイレクト先を個別に用意。
    authWindow.showAuthWindow({
      url: 'http://localhost:3000/api/auth',
      callback: this.termLogin,
    });
  }

  termLogin(result: authWindow.AuthResult): void {
    // 結果を保存
    for (const key of Object.keys(result.data)) {
      console.log(`key=${key}, value=${result.data[key]}`);
      localStorage.setItem(key, result.data[key]);
    }

    this.sessionID = localStorage.getItem('ssid') ?? "";

    // TODO: 認証が必要なページ(想定)に遷移
    //this.router.navigate(['/page1']);
  }
}
