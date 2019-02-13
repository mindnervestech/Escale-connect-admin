import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { dataInTableRoutingModule, routedComponents } from './dataInTable-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    dataInTableRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class dataInTableModule { }
