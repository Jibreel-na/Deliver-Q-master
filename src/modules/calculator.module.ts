import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../app/calculator/calculator.component';
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {
    path: 'calculator', component: CalculatorComponent,
  }
];

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ]
})
export class CalculatorModule { }
