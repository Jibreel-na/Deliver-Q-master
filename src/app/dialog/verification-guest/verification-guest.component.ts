import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ShipmentGuestModel} from "../../../models/Shipment.model";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-verification-guest',
  templateUrl: './verification-guest.component.html',
  styleUrls: ['./verification-guest.component.scss']
})


export class VerificationGuestComponent implements OnInit {
  userForm: FormGroup;
  data = new ShipmentGuestModel();

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private restService: DataService,
              private translate: TranslateService,
              private matDialogRef: MatDialogRef<VerificationGuestComponent>) {
    this.matDialogRef.disableClose = true;

  }

  get f() {
    return this.userForm.controls;
  }

  prepareForm() {
    this.userForm = this.fb.group({
      otp: ['', [Validators.required]],
    });
  }

  createShipment() {
    this.data.otp = this.f.otp.value;
    this.restService.createShipmentGuest(this.data).then((res) => {
      // this.toastr.success(this.translate.instant('_CreateShipmentSuccessfully'), '');
      // this.toastr.success('Thank you for using deliverQ.com, You order will be process soon.' , '');

      this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(res));
      this.matDialogRef.close();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  ngOnInit(): void {
    this.prepareForm();
  }

}
