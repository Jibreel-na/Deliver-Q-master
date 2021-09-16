import {Component, Input, OnInit} from '@angular/core';
import {ShipmentDetailsModel} from "../../models/Shipment.model";
import {AddressModel} from "../../models/address.model";
import {TrackingService} from "../../services/tracking.service";
import {AppService} from "../app.service";


@Component({
  selector: 'app-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrls: ['./tracking-map.component.scss']
})
export class TrackingMapComponent implements OnInit {
  @Input() data: ShipmentDetailsModel;
  lat: number;
  lng: number;
  map;
  place: any;
  from: AddressModel;
  to: AddressModel;


  constructor(private placesService: TrackingService,
              public appService: AppService) {

    this.lat = 24.3523893;
    this.lng = 55.0770667;
  }

  getPlaces(id) {
    this.placesService.tracking(id).subscribe(val => {
      this.place = val;
    });
  }

  ngOnInit(): void {
    this.getPlaces(this.data._id);
    this.from = this.data.fromObj;
    this.to = this.data.toObj;
    this.lat = +this.data.fromObj.lat;
    this.lng = +this.data.fromObj.lng;
  }

}
