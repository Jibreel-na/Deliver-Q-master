import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../app/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {CarouselModule} from '../components/carousel/carousel.module';
import {StepperModule} from '../components/stepper/stepper.module';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {IvyCarouselModule} from "angular-responsive-carousel";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  }
];


@NgModule({
  declarations: [
    HomeComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    CarouselModule,
    StepperModule,
    SlickCarouselModule,
    IvyCarouselModule
  ]
})
export class HomepageModule {
}
