import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from '../app/account/account.component';
import { ProfileComponent } from '../app/account/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { PrivacyComponent } from '../app/account/privacy/privacy.component';
import { ShipmentsComponent } from '../app/account/shipments/shipments.component';
import { NewAddressComponent } from '../app/dialog/new-address/new-address.component';
import {AddressComponent} from '../app/account/address/address.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ShipmentDetailsComponent } from '../app/shipment-details/shipment-details.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";

const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: '_MyProfile'
        }
      },
      {
        path: 'my-shipments',
        component: ShipmentsComponent,
        data: {
          title: '_MyShipments'
        }
      },
      {
        path: 'addresses',
        component: AddressComponent,
        data: {
          title: '_MyAddresses'
        }
      },
      {
        path: 'shipment-details/:id',
        component: ShipmentDetailsComponent,
        data: {
          title: '_ShipmentDetails'
        }
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
          title: '_Privacy'
        }
      },
      {
        path: '',
        redirectTo: 'profile'
      },
    ]
  }
];


@NgModule({
  declarations: [AccountComponent, ProfileComponent, PrivacyComponent, ShipmentsComponent, NewAddressComponent , AddressComponent, ShipmentDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    InfiniteScrollModule,
    NgxShimmerLoadingModule

  ]
})
export class AccountModule { }
