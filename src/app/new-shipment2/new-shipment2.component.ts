import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "../app.service";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CityModel} from "../../models/city.model";
import {LocationComponent} from "../dialog/location/location.component";
import {CategoryModel} from "../../models/category.model";
import {ShipmentGuestModel, ShipmentModel} from "../../models/Shipment.model";
import {TypeModel} from "../../models/type.model";
import {UserModel} from "../../models/user.model";
import {VerificationGuestComponent} from "../dialog/verification-guest/verification-guest.component";
import { ElementRef, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { AddressModel } from '../../models/address.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GuestComponent } from '../dialog/guest/guest.component';

export class LocationModel {
    latitude: string;
    longitude: string;
    locationText: string;
  }

@Component({
  selector: 'app-new-shipment2',
  templateUrl: './new-shipment2.component.html',
  styleUrls: ['./new-shipment2.component.scss']
})
export class NewShipment2Component implements OnInit {
  userForm: FormGroup;
  StartAddress: FormGroup;
  endAddress: FormGroup;
  costForm: FormGroup;
  calculatorForm: FormGroup;
  cities: CityModel[] = [];
  guest = false;
  categories: CategoryModel[] = [];
  displayedColumns: string[] = [ 'title' , 'title_ar', 'duration', 'price'];
  typesDataSource: any;
  types: TypeModel[] = [];
  times: any[] = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30",
                  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
                  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",];
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public location: string;
  public address: string;
  private geoCoder;
  fromFormFlag: boolean = false;
  toFormFlag: boolean = false;
  toAddresss: string;
  fromAddress: string;
  isCOD: boolean = false;
  DatePicker: Date;
  locationLngLat = new LocationModel();
  data: AddressModel;

  @ViewChild('search2', {static:false})
  public searchElementRef: ElementRef;

  @ViewChild('search', {static:false})
  public searchElementReff: ElementRef;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              public appService: AppService,
              private toastr: ToastrService,
              private restService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }


  get f() {
      return this.calculatorForm.controls;
  }

  get startAddress() {
      return this.StartAddress.controls;
  }

  get u() {
      return this.userForm.controls;
  }

  get c() {
      return this.costForm.controls;
  }


  get toAddress() {
      return this.endAddress.controls;
  }


  calculator() {
      // this.isDone = true;
      let cost: ShipmentModel = this.costForm.value as ShipmentModel;
      this.restService.calculateCost(cost).then((res) => {
          this.f.cost.setValue(+res.results[0].cost);
      }).catch((err: HttpErrorResponse) => {
          if (err.status) {
              this.toastr.error(err.error.message, '');

              if (err.error.code === 401) {
                  // this.restService.refreshTokenUser();
              }
          }
      });
  }

  @ViewChild(MatSort, {static:false}) sort: MatSort;

  getTypesDataset() {
      this.restService.getTypes().then((res) => {
          this.types = res.results;
          this.typesDataSource = new MatTableDataSource(this.types);
          this.typesDataSource.sort  = this.sort;
      }).catch((err: HttpErrorResponse) => {
      if (err.status) {
              if (err.error.code === 401) {
                  this.restService.logout();
              }
          }
      });
  }


  prepareForm() {
      this.calculatorForm = this.fb.group({
          weight: [''],
          cost: [''],  
          phone: [''], 
          category: ['', Validators.required],
          categoryTitle: ['', Validators.required],
          type: ['', Validators.required],
          typeTitle: ['', Validators.required],   
          duration: ['', Validators.required],     
          productPayment: ['', Validators.required],
          productPaymentAmount: ['', Validators.required],
          deliveryPayment: ['', Validators.required],
          // veichle: ['', Validators.required],
          // costTitle: ['', Validators.required],
          // mobile: ['', Validators.required],
          // productPayment: ['', Validators.required],
          // ppCost: [''],
          // deliveryPayment: ['', Validators.required],
          // dpCost: ['']
      });

      // this.costForm = this.fb.group({
      //     category: [''],
      //     categoryTitle: [''],
      //     type: [''],
      //     typeTitle: [''],
      // });

      this.userForm = this.fb.group({
          first_name: [''],
          last_name: [''],
          email: [''],
          phone: [''],
      });


      //
      this.StartAddress = this.fb.group({
          phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
          name: ['', Validators.required],
          city: ['', Validators.required],
          address: ['', Validators.required],
          landmark: [''],
          time: ['', Validators.required],
          date: ['', Validators.required],
          locationText: ['', Validators.required],
          type: ['', Validators.required],
          lng: ['', Validators.required],
          lat: ['', Validators.required]
      });
      //
      this.endAddress = this.fb.group({
          phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
          name: ['', Validators.required],
          city: ['', Validators.required],
          address: ['', Validators.required],
          landmark: [''],
          time: ['', Validators.required],
          date: ['', Validators.required],
          locationText: ['', Validators.required],
          type: ['', Validators.required],
          lng: ['', Validators.required],
          lat: ['', Validators.required]
      });
  }


  getCategories() {
      this.restService.getCategories().then((res) => {
          this.categories = res.results;

      }).catch((err: HttpErrorResponse) => {
          if (err.status) {
              this.toastr.error(err.error.message, '');

              if (err.error.code === 401) {
                  // this.restService.refreshTokenUser();
              }
          }
      });
  }

  getCities() {
      this.restService.getCities().then((res) => {
          this.cities = res.results;
      }).catch((err: HttpErrorResponse) => {
         if (err.status) {
              if (err.error.code === 401) {
                  this.restService.logout();
              }
          }
      });
  }

  getTypes() {
      this.restService.getTypes().then((res) => {
          this.types = res.results;
      }).catch((err: HttpErrorResponse) => {
         if (err.status) {
              if (err.error.code === 401) {
                  this.restService.logout();
              }
          }
      });
  }

  sendOTPGuest() {
      console.log(this.calculatorForm);
      this.StartAddress.controls['date'].setValue(new Date(this.DatePicker).toLocaleDateString());
      this.StartAddress.controls['time'].setValue(new Date(this.DatePicker).toLocaleTimeString());
      // console.log(this.calculatorForm.controls['duration'].value);
      // const days = parseInt(this.calculatorForm.controls['duration'].value.match(/\d+/)[0]);
      // console.log(days);
      // var newDate = new Date();
      // newDate.setDate(new Date(this.StartAddress.controls['date'].value).getDate() + days);
      // this.endAddress.controls['date'].setValue(newDate);
      // this.endAddress.controls['time'].setValue(this.StartAddress.controls['time'].value);
      let guest = new ShipmentGuestModel();
      guest.from = this.StartAddress.value;
      guest.to = this.endAddress.value;
      guest.shipment = this.calculatorForm.value;
      guest.user = this.userForm.value;
      const user: UserModel = this.userForm.value as UserModel;
      this.restService.sendOTPGuest(user).then((res) => {
          let dialog = this.dialog.open(VerificationGuestComponent);
          dialog.componentInstance.data = guest;
          dialog.afterClosed().subscribe(result => {
              if (result) {
                  window.scroll(0 ,0);
                  this.toastr.success('Your Shipment Sent Successfully', '');
                  this.calculatorForm.reset();
                  this.StartAddress.reset();
                  this.endAddress.reset();
              }
          });

      }).catch((err: HttpErrorResponse) => {
          if (err.status) {
              if (err.status === 400) {
                  this.toastr.error('You requested verification code many times in short time , please try again after 2 hours', '');
              } else {
                  this.toastr.error(err.error.message, '');
              }
          }
      });
  }

  markerDragEnd($event) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
  }
  
  
  setCurrentLocation() {
      if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
          });
      }
  }

  getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
          if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.startAddress.locationText.setValue(results[0].formatted_address);
          } else {
          window.alert('No results found');
          }
      } else {
          window.alert('Geocoder failed due to: ' + status);
      }
      })
  }

  getAddressFrom(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
          if (results[0]) {
          this.zoom = 12;
          this.startAddress.locationText.setValue(results[0].formatted_address);
          } else {
          window.alert('No results found');
          }
      } else {
          window.alert('Geocoder failed due to: ' + status);
      }
      })
  }

  getAddressTo(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
          if (results[0]) {
          this.zoom = 12;
          this.toAddress.locationText.setValue(results[0].formatted_address);
          } else {
          window.alert('No results found');
          }
      } else {
          window.alert('Geocoder failed due to: ' + status);
      }
      })
  }

  getProfile() {
      // tslint:disable-next-line:prefer-const
      this.restService.getProfile().then(res => {
          this.userForm.patchValue(res);
      }).catch((err: HttpErrorResponse) => {
         if (err.status) {
              if (err.error.code === 401) {
                  this.restService.logout();
              }
          }
      });
  }

  guestDialog() {
    let dialog = this.dialog.open(GuestComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.guest = true;
        window.scroll(0, 0);
      }
    });
  }

   async ngOnInit() {
    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.getProfile();
      } else {
         this.guestDialog();
      }
    });
    
    this.getTypesDataset();
    this.prepareForm();
    this.getCities();
    this.getCategories();
    this.getTypes();
    this.startAddress.type.setValue(2);
    this.toAddress.type.setValue(2);
    this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
        var InputOptions = {
            componentRestrictions: {'country': ['ae']} // I want multiple counteries here**
        };
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement , InputOptions);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            //set latitude, longitude and zoom
            this.toAddress.lng.setValue(place.geometry.location.lng());
            this.toAddress.lat.setValue(place.geometry.location.lat());
            this.getAddressTo(this.toAddress.lat.value, this.toAddress.lng.value);
            this.zoom = 12;
          });
        });
        
        let autocomplete2 = new google.maps.places.Autocomplete(this.searchElementReff.nativeElement , InputOptions);
        autocomplete2.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete2.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.startAddress.lng.setValue(place.geometry.location.lng());
            this.startAddress.lat.setValue(place.geometry.location.lat());
            this.getAddressFrom(this.startAddress.lat.value, this.startAddress.lng.value);
            this.zoom = 12;
          });
        });
        
    });
  }

}
