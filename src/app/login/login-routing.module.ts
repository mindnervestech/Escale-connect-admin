import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
/*import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AdsComponent } from './ads/ads.component';*/

const routes: Routes = [

{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
{
  path: '',
  component: LoginComponent,
  children: [{
    path: 'signin',
    component: SigninComponent,
  },{
    path: 'register',
    component: RegisterComponent,
  },/*{
    path: 'groupChat',
    component: GroupChatComponent,
  },{
    path: 'userChat',
    component: UserChatComponent,
  },{
    path: 'ads',
    component: AdsComponent,
  },*/
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
  },*/ /*{
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },*//*{
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },*//*{
    path: 'dataInTable',
    loadChildren: './dataInTable/dataInTable.module#dataInTableModule',
  },*/ /*{
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },*/ {
    path: '',
    redirectTo: 'signin',
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
export class LoginRoutingModule {
}
