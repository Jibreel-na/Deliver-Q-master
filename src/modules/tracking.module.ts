import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from '../app/tracking/tracking.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {AgmCoreModule} from "@agm/core";
import { TrackingMapComponent } from '../app/tracking-map/tracking-map.component';
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";

const routes: Routes = [
  {
    path: 'tracking/:id', component: TrackingComponent,
  }
];


@NgModule({
  declarations: [TrackingComponent, TrackingMapComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    AgmCoreModule,
    NgxShimmerLoadingModule
  ]
})
export class TrackingModule { }
