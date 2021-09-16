import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PrivacyComponent} from "../app/privacy/privacy.component";

const routes: Routes = [
  {
    path: 'privacy-policy',
    component: PrivacyComponent
  }
];


@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class PrivacyModule { }
