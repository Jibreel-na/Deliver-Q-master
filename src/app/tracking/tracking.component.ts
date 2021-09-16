import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TrackingService} from '../../services/tracking.service';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import {AppService} from "../app.service";
import {ShipmentModel} from "../../models/Shipment.model";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {


  status = 0;
  isLogin = false;
  id: string;
  data: ShipmentModel;
  isplaceholder = true;

  constructor(private placesService: TrackingService,
              private activatedRouter: ActivatedRoute,
              private appService: AppService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private restService: DataService) {
  }



  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getShipment(params.id);
    });

    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.isLogin = true;
      }
    });
  }

  getShipment(id: string) {
    this.fuseSplashScreenService.hide();
    window.scroll(0 ,0);
    this.restService.getShipmentByTag(id).then((res) => {
      this.data = res;
      this.status = res.status;
      this.id = res._id;
      this.isplaceholder = false;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});

  }


}
