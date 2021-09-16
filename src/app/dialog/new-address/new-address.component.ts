import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocationComponent} from '../location/location.component';
import {HttpErrorResponse} from '@angular/common/http';
import { AddressModel} from '../../../models/address.model';
import {DataService} from '../../../services/data.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {
  data: AddressModel;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder,
              public appService: AppService,
              private dialog: MatDialog,
              private matDialogRef: MatDialogRef<NewAddressComponent>,
              private restService: DataService,
              private toastr: ToastrService
  ) {
    // this.matDialogRef.disableClose = true;
  }

  get f() {
    return this.addressForm.controls;
  }

  prepareForm() {
    this.addressForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      city: ['', Validators.required],
      area: ['', Validators.required],
      street: ['', Validators.required],
      floor: ['', Validators.required],
      additional: [''],
      _id: [''],
      building: ['', Validators.required],
      apartment: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      lng: ['', Validators.required],
      lat: ['', Validators.required],
      locationText: ['', Validators.required]
    });
  }

  openMap() {
    const dialogRef = this.dialog.open(LocationComponent);
    dialogRef.componentInstance.data = this.data;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.f.lng.setValue(result.longitude);
        this.f.lat.setValue(result.latitude);
        this.f.locationText.setValue(result.locationText);
      }

    });
  }

  addAddress() {
    const address: AddressModel = this.addressForm.value as AddressModel;
    this.restService.addAddress(address).then((res) => {
      this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(res.data));
      this.dialog.closeAll();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
        if(err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  EditAddress() {
    const address: AddressModel = this.addressForm.value as AddressModel;
    this.restService.updateAddress(address).then((res) => {
      this.toastr.success('Updated successfully' , '');
      this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(res.data));
      this.dialog.closeAll();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
        if(err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  ngOnInit(): void {
    this.prepareForm();
    this.f.type.setValue(1);
    if (this.data) {
       this.addressForm.patchValue(this.data);
       this.f.city.setValue(this.data.cityObj._id);
    }
  }


}
