import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {ShipmentDetailsModel} from '../../../models/Shipment.model';
import {ToastrService} from 'ngx-toastr';
import {FuseSplashScreenService} from "../../../services/fuse-splash-screen.service";
import {PaginationModel} from "../../../modules/pagination.model";

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipments: ShipmentDetailsModel[] = [];
  allShipments: ShipmentDetailsModel[] = [];
  isEmpty = false;
  isplaceholder = true;
  pagination = new PaginationModel();
  noData = false;

  constructor(private restService: DataService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private toastr: ToastrService) {
    this.pagination.limit = 8;
    this.pagination.page = 0;

  }

  getShipments() {
    this.restService.getShipments(this.pagination).then((res) => {
      this.shipments = res.results;
      this.isplaceholder = false;
      if (res.results.length === 0) {
        this.isEmpty = true;
      }
      if (this.pagination.page === 0) {
        this.allShipments = res.results;
        if (this.allShipments.length === 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      } else {
        this.shipments.forEach(item => {
          this.allShipments.push(item);
        });
      }
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  ngOnInit(): void {
    this.getShipments();
  }

}
