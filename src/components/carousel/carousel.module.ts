import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CarouselComponent} from './carousel.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";



@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    NgxShimmerLoadingModule
  ],
  exports: [
    CarouselComponent
  ]
})

export class CarouselModule { }
