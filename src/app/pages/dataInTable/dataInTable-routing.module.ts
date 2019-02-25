import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { dataInTableComponent } from './dataInTable.component';
import { groupComponent } from './group/group.component';
import { userComponent } from './user/user.component';
import { AdsDetailComponent } from './ads-detail/ads-detail.component';

const routes: Routes = [{
  path: '',
  component: dataInTableComponent,
  children: [{
    path: 'group',
    component: groupComponent,
  },{
    path: 'user',
    component: userComponent,
  },{
    path: 'ads-detail',
    component: AdsDetailComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  dataInTableRoutingModule { }

export const routedComponents = [
  dataInTableComponent,
  groupComponent,
  userComponent,
  AdsDetailComponent,
];
