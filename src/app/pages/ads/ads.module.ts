import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { AdsComponent } from './ads.component';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AutocompleteModule } from 'ng2-input-autocomplete';
@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    AutocompleteModule
  ],
  declarations: [
    AdsComponent
  ],
  providers: [

  ],
})
export class AdsModule { }
