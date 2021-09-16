import { Component, OnInit } from '@angular/core';
import { AddressModel} from "../../../models/address.model";
import {DataService} from "../../../services/data.service";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppService} from "../../app.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  address: AddressModel[] = [];
  lang: string;
  isEmpty = false;

  constructor(private restService: DataService,
              private fb: FormBuilder,
              public matDialogRef: MatDialogRef<AddressListComponent>,
              private appService: AppService,
              public dialog: MatDialog,
              private toastr: ToastrService) {
    this.matDialogRef.disableClose = true;

  }

  getAddresses() {
    this.restService.getAddress().then((res) => {
        this.address = res.results;
    }).catch((err: HttpErrorResponse) => {
      if(err.error.code === 401) {
        this.restService.refreshTokenUser();
      }
    });
  }

  selectAddress(address){
    this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(address));
    this.dialog.closeAll();
  }



  ngOnInit() {
    this.getAddresses();
    this.lang = this.appService.currentLanguage === 'en' ? 'ltr' : 'rtl';

  }


}
