import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
//import { DashboardModule } from './dashboard/dashboard.module';
//import { ECommerceModule } from './e-commerce/e-commerce.module';
//import { GroupChatModule } from './group-chat/group-chat.module';
//import { UserChatModule } from './user-chat/user-chat.module';
//import { AdsModule } from './ads/ads.module';
import { LoginRoutingModule } from './login-routing.module';
import { SigninModule } from './signin/signin.module';
import { RegisterModule } from './register/register.module';
import { ThemeModule } from '../@theme/theme.module';
//import { TestRoutingModule } from './test/test-routing.module';

const PAGES_COMPONENTS = [
  LoginComponent,
];

@NgModule({
  imports: [
    LoginRoutingModule,
    ThemeModule,
    //DashboardModule,
    /*ECommerceModule,
    GroupChatModule,
    UserChatModule,*/
    //AdsModule,
    //TablesRoutingModule
    //MiscellaneousModule,
    SigninModule,
    RegisterModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class LoginModule {
}
