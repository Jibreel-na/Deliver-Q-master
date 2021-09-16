import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from '../app/about/about.component';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'about-us', component: AboutComponent,
  }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class AboutModule { }
