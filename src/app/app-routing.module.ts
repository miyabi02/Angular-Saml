import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CallbackAuthComponent } from './callback-auth/callback-auth.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'callback/api/auth', component: CallbackAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
