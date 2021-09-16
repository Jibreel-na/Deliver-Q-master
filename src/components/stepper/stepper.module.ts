import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepperComponent} from './stepper.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [StepperComponent],
  exports: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatStepperModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class StepperModule { }
