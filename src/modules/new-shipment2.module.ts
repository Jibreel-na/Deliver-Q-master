import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewShipment2Component} from '../app/new-shipment2/new-shipment2.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AgmCoreModule} from '@agm/core';
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { MatButtonModule } from '@angular/material/button';
import {GuestComponent} from "../app/dialog/guest/guest.component";
import {VerificationGuestComponent} from "../app/dialog/verification-guest/verification-guest.component";

const routes: Routes = [
  {
    path: 'new-shipment', component: NewShipment2Component,
  }
];

@NgModule({
  declarations: [NewShipment2Component, GuestComponent, VerificationGuestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
      libraries: ['places']
    }),
    MatIconModule

  ]
})
export class NewShipment2Module {
}
