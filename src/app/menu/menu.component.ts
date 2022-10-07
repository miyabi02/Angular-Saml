import { Component, OnInit } from '@angular/core';
import { ApiService, AuthInfo } from '../services/api.service';

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
    this.api.isAuthenticatedbyUser().subscribe(i => this.info = i);
  }

}
