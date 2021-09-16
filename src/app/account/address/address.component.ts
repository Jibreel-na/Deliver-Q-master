import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {AddressModel} from '../../../models/address.model';
import {MatDialog} from '@angular/material/dialog';
import {NewAddressComponent} from '../../dialog/new-address/new-address.component';
import {PaginationModel} from "../../../modules/pagination.model";
import {FuseSplashScreenService} from "../../../services/fuse-splash-screen.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: AddressModel[] = [];
  allAddresses: AddressModel[] = [];
  pagination = new PaginationModel();
  noData = false;
  isplaceholder = true;
  isEmpty = false;
  constructor(private restService: DataService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
    this.pagination.limit = 8;
    this.pagination.page = 0;

  }

  getAddresses() {
    this.restService.getAddresses(this.pagination).then((res) => {
      this.addresses = res.results;
      this.isplaceholder = false;
      if(res.results.length === 0){
        this.isEmpty = true;
      }
      if (this.pagination.page === 0) {
        this.allAddresses = res.results;
        if (this.allAddresses.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      } else {
        this.addresses.forEach(item => {
          this.allAddresses.push(item);
        });
      }
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  openAddressDialog() {
    const dialogRef = this.dialog.open(NewAddressComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isEmpty  = false;
        this.addresses.push(result);
      }
    });
  }

  openEditAddress(data: AddressModel) {
    const dialogRef = this.dialog.open(NewAddressComponent);
    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.addresses.indexOf(data);
        this.addresses[index] = result;
      }
    });

  }

  deleteAddress(id) {
    this.restService.deleteAddress(id).then((res) => {
      this.allAddresses = this.allAddresses.filter(item => item._id != id);
      this.toastr.success(res.message , '');
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getAddresses();
  }

}
