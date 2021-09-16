import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import {ShipmentDetailsModel} from "../../models/Shipment.model";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../app.service";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {
  details: ShipmentDetailsModel;

  constructor(private restService: DataService,
              private ActivatedRouter: ActivatedRoute,
              private fuseSplashScreenService: FuseSplashScreenService,
              private appService: AppService) {
  }


  getShipment(id: string) {
    this.restService.getShipmentByID(id).then((res) => {
      this.details = res;

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  ngOnInit(): void {
    scrollTo(0,0);
    this.fuseSplashScreenService.hide();
    this.ActivatedRouter.params.subscribe(params => {
      this.getShipment(params.id);
    });
  }

}
