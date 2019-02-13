import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AdsComponent } from './ads/ads.component';
//import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  },{
    path: 'groupChat',
    component: GroupChatComponent,
  },{
    path: 'userChat',
    component: UserChatComponent,
  },{
    path: 'ads',
    component: AdsComponent,
  },
  /* {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },*/ /*{
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  },*/ /*{
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  },*/ /*{
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  },*//* {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  },*/ /*{
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  },*/ /*{
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  },*/ /*{
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },*/ {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },/*{
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },*/{
    path: 'dataInTable',
    loadChildren: './dataInTable/dataInTable.module#dataInTableModule',
  }, /*{
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },*/ {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, /*{
    path: '**',
    component: NotFoundComponent,
  }*/],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
