import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  sessionID: string = "";

  constructor() { }

  ngOnInit(): void {
    // TODO: ログアウトAPI、およびローカルストレージクリア処理の実装
    // localStorage.clear();

    this.sessionID = localStorage.getItem('ssid') ?? '';
  }

}
