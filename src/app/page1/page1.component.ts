import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  sessionID: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('ssid') ?? '';
  }

  logout(): void {
    this.apiService.logout().subscribe((e) => {
      // ローカルストレージのセッションIDを破棄
      localStorage.clear();
      // 処理の成否に関わらず、トップ(メニュー想定)に戻る
      this.router.navigateByUrl('');
    });
  }
}
