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
  sessionID: string = '';

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('ssid') ?? '';
  }

  login(): void {
    // * Angularアプリ(ダイアログ)のリダイレクト先を個別に用意。
    authWindow.showAuthWindow({
      url: 'http://localhost:3000/api/auth',
      callback: (result) => {
        // 結果を保存し、画面遷移
        for (const key of Object.keys(result.data)) {
          localStorage.setItem(key, result.data[key]);
        }
        this.router.navigateByUrl('page1');
      },
    });
  }

  navigateNext(): void {
    this.router.navigateByUrl('page1');
  }
}
