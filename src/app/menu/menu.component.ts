import { Component, OnInit } from '@angular/core';
import { ApiService, AuthInfo } from '../services/api.service';
import * as authWindow from '../auth/auth-window';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  info: AuthInfo | undefined;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  login(): void {
    // 認証済みチェックAPIをコール
    // this.api.isAuthenticatedbyUser().subscribe(i => this.info = i);

    // * Angularアプリ(ダイアログ)のリダイレクト先を個別に用意。
    authWindow.showAuthWindow({url: 'http://localhost:3000/api/auth', callback: (ret) => console.log(ret)});
  }

  // TODO: 認証結果を保存＆画面の制御を実施
}
