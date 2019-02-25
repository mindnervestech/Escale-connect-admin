import { Component } from '@angular/core';

import { MENU_ITEMS } from './login-menu';

@Component({
  selector: 'ngx-login',
  styleUrls: ['login.component.scss'],
 /* templateUrl: 'login.component.html',*/
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class LoginComponent {

  menu = MENU_ITEMS;
}
