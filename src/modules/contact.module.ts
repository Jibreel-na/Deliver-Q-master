import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../app/contact/contact.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {
    path: 'contactus', component: ContactComponent,
  }
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class ContactModule { }
