import { Component, OnInit } from '@angular/core';
import * as authWindow from '../auth/auth-window';

@Component({
  selector: 'app-callback-auth',
  templateUrl: './callback-auth.component.html',
  styleUrls: ['./callback-auth.component.css']
})
export class CallbackAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    // TODO: cookie or queryparamから結果とセッションIDを取得
    authWindow.sendResult('success');
  }
}
