import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewShipmentComponent} from '../app/new-shipment/new-shipment.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AgmCoreModule} from '@agm/core';
import {LocationComponent} from '../app/dialog/location/location.component';
import {AddressListComponent} from '../app/dialog/address-list/address-list.component';
import {MatIconModule} from "@angular/material/icon";
import {GuestComponent} from "../app/dialog/guest/guest.component";
import {VerificationGuestComponent} from "../app/dialog/verification-guest/verification-guest.component";

const routes: Routes = [
  {
    path: 'new-shipment2', component: NewShipmentComponent,
  }
];

@NgModule({
  declarations: [NewShipmentComponent, LocationComponent, AddressListComponent],
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
      libraries: ['places']
    }),
    MatIconModule

  ]
})
export class NewShipmentModule {
}
