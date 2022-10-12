import { Component, OnInit } from '@angular/core';
import * as authWindow from '../auth/auth-window';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-callback-auth',
  templateUrl: './callback-auth.component.html',
  styleUrls: ['./callback-auth.component.css']
})
export class CallbackAuthComponent implements OnInit {

  ssid: string = "";
  result: authWindow.ResultType = 'failed';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ssid = params['ssid'];
      this.result = params['result'];
    });

    this.exeProcess();
  }

  exeProcess(): void {
    console.log("exeProcess begin");
    const ssid = this.ssid;
    // セッションIDと結果を認証ウィンドウに渡す。
    authWindow.sendResult({result: this.result, data: { ssid : this.ssid}});
  }
}
