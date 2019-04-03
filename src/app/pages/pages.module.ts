import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
//import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { GroupChatModule } from './group-chat/group-chat.module';
import { UserChatModule } from './user-chat/user-chat.module';
import { AdsModule } from './ads/ads.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
//import { TestRoutingModule } from './test/test-routing.module';
import { GroupDetailsModule } from './group-details/group-details.module';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireStorageModule } from 'angularfire2/storage';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    //DashboardModule,
    ECommerceModule,
    GroupChatModule,
    UserChatModule,
    AdsModule,
    GroupDetailsModule,
    NgxUiLoaderModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    //TablesRoutingModule
    //MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
