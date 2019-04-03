import { NgModule } from '@angular/core';
// import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { GroupDetailsComponent } from './group-details.component';
// import { ChartModule } from 'angular2-chartjs';

// import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    ThemeModule,
    // ChartModule,
    // NgxEchartsModule,
    // NgxChartsModule,
    // LeafletModule,
  ],
  declarations: [
    GroupDetailsComponent
  ],
  providers: [

  ],
})
export class GroupDetailsModule { }
