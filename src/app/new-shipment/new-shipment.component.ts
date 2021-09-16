import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationComponent} from '../dialog/location/location.component';
import {MatDialog} from '@angular/material/dialog';
import {AppService} from '../app.service';
import {ShipmentGuestModel, ShipmentModel} from '../../models/Shipment.model';
import {CityModel} from '../../models/city.model';
import {AddressListComponent} from "../dialog/address-list/address-list.component";
import {AddressModel} from "../../models/address.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../services/data.service";
import {GuestComponent} from "../dialog/guest/guest.component";
import {UserModel} from "../../models/user.model";
import {VerificationGuestComponent} from "../dialog/verification-guest/verification-guest.component";
import {TranslateService} from "@ngx-translate/core";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";


@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss']
})
export class NewShipmentComponent implements OnInit {
  calculatorForm: FormGroup;
  StartAddress: FormGroup;
  endAddress: FormGroup;
  userForm: FormGroup;
  costForm: FormGroup;
  isDone = false;
  isNewAddress = false;
  isToAddress = false;
  selectedCategory: string;
  from: string;
  to: string;
  fromAddress: AddressModel;
  targetAddress: AddressModel;
  isLogin: boolean;
  cost: number;
  guest = false;
  isCalculate = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public appService: AppService,
    private toastr: ToastrService,
    private restService: DataService,
    private translate: TranslateService,
    private fuseSplashScreenService: FuseSplashScreenService,
  ) {
  }

  get f() {
    return this.calculatorForm.controls;
  }

  get startAddress() {
    return this.StartAddress.controls;
  }

  get toAddress() {
    return this.endAddress.controls;
  }

  get c() {
    return this.costForm.controls;
  }

  get u() {
    return this.userForm.controls;
  }


  prepareForm() {
    this.calculatorForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      subCategory: ['', Validators.required],
      weight: [''],
      comments: [''],
      cost: [''],
      other: [''],
      type: [''],
    });


    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
    });

    this.costForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      category: [''],
    });

    this.StartAddress = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      city: ['', Validators.required],
      area: ['', Validators.required],
      street: ['', Validators.required],
      floor: ['', Validators.required],
      building: ['', Validators.required],
      locationText: ['', Validators.required],
      apartment: ['', Validators.required],
      additional: [''],
      type: ['', Validators.required],
      name: ['', Validators.required],
      lng: ['', Validators.required],
      lat: ['', Validators.required]
    });

    this.endAddress = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      city: ['', Validators.required],
      area: ['', Validators.required],
      street: ['', Validators.required],
      floor: ['', Validators.required],
      building: ['', Validators.required],
      locationText: ['', Validators.required],
      apartment: ['', Validators.required],
      additional: [''],
      type: ['', Validators.required],
      lng: ['', Validators.required],
      lat: ['', Validators.required],
      name: ['', Validators.required],

    });
  }

  selectCity() {
    const from: CityModel[] = this.appService.cities.filter(item => item._id === this.startAddress.city.value);
    if (from.length) {
      this.from = from[0].title;
    }

    const to: CityModel[] = this.appService.cities.filter(item => item._id === this.toAddress.city.value);
    if (to.length) {
      this.to = to[0].title;
    }
  }


  ngOnInit(): void {
    scrollTo(0, 0);
    let shipment: ShipmentModel;
    this.fuseSplashScreenService.hide();
    this.prepareForm();

    {
      window.scroll(0, 0);
      if (this.appService.shipment) {
        shipment = this.appService.shipment;
        console.log(shipment);
        this.startAddress.city.setValue(shipment.from);
        this.toAddress.city.setValue(shipment.to);
        this.f.subCategory.setValue(shipment.subCategory);
        this.f.comments.setValue(shipment.comments);
        this.f.weight.setValue(shipment.weight);
        this.f.type.setValue(shipment.type);
        this.f.other.setValue(shipment.other);
        this.f.cost.setValue(shipment.cost);
        this.c.from.setValue(shipment.from);
        this.c.to.setValue(shipment.to);
        this.c.category.setValue(shipment.category);

        this.selectedCategory = (shipment.selectedCategory);
        this.selectCity();
      }
      this.startAddress.type.setValue(1);
      this.toAddress.type.setValue(1);

      this.appService.isUserLoggedIn.subscribe(value => {
        if (value) {
          this.isLogin = true;
        } else {
          this.isNewAddress = true;
          this.isToAddress = true;
          this.guestDialog();

        }
      });
    }
  }

  listAddress(direction) {
    const dialogRef = this.dialog.open(AddressListComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (direction === 'from') {
          this.f.from.setValue(result._id);
          this.c.from.setValue(result.cityObj._id);
          this.fromAddress = result;
          this.from = result.cityObj.title;
        } else {
          this.f.to.setValue(result._id);
          this.c.to.setValue(result.cityObj._id);
          this.targetAddress = result;
          this.to = result.cityObj.title;
        }

        this.f.cost.setValue('');
      }
    });
  }

  calculator() {
    this.isDone = true;
    let cost: ShipmentModel = this.costForm.value as ShipmentModel;
    this.restService.calculateCost(cost).then((res) => {
      if (res.category) {
        this.f.cost.setValue(+res.cost);
        this.isCalculate = true;
        setTimeout(() => {
          this.scroll("shipment");
        }, 20);
      } else {
        this.toastr.error('We are not offer delivery for this area');
      }

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  openMap(address: string) {
    const dialogRef = this.dialog.open(LocationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (address === 'from') {
          this.startAddress.lng.setValue(result.longitude);
          this.startAddress.lat.setValue(result.latitude);
          this.startAddress.locationText.setValue(result.locationText);
        } else {
          this.toAddress.lng.setValue(result.longitude);
          this.toAddress.lat.setValue(result.latitude);
          this.toAddress.locationText.setValue(result.locationText);
        }
      }
    });
  }

  addAddress(direction: string) {
    let address: AddressModel;
    if (direction === 'from') {
      address = this.StartAddress.value as AddressModel;
    } else {
      address = this.endAddress.value as AddressModel;
    }
    this.restService.addAddress(address).then((res) => {
      this.isNewAddress = false;
      this.isToAddress = false;

      if (direction === 'from') {
        this.fromAddress = res.data;
        this.f.from.setValue(res.data._id);
      } else {
        this.targetAddress = res.data;
        this.f.to.setValue(res.data._id);

      }
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  scroll(id) {
    var el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});

  }


  createShipment() {
    const shipment: ShipmentModel = this.calculatorForm.value as ShipmentModel;
    this.restService.createShipment(shipment).then((res) => {
      this.calculatorForm.reset();
      this.StartAddress.reset();
      this.endAddress.reset();
      this.costForm.reset();
      this.fromAddress = null;
      this.targetAddress = null;
      this.f.weight.setValue('');
      this.f.comments.setValue('');
      // this.toastr.success(this.translate.instant('_CreateShipmentSuccessfully') , '');
      this.toastr.success('Thank you for using deliverQ.com, You order will be process soon.', '');
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }


  guestDialog() {
    let dialog = this.dialog.open(GuestComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.guest = true;
        this.f.from.setValue('111');
        this.f.to.setValue('111');
        window.scroll(0, 0);

      }
    });
  }

  sendOTPGuest() {

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
          window.scroll(0, 0);
          // this.toastr.success(this.translate.instant('_CreateShipmentSuccessfully'), '');
          this.toastr.success('Thank you for using deliverQ.com, You order will be process soon.', '');

          this.calculatorForm.reset();
          this.StartAddress.reset();
          this.endAddress.reset();
          this.costForm.reset();
          this.userForm.reset();
        }
      });

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.status === 400) {
          this.toastr.error(this.translate.instant('_SendMessageError'), '');
        } else {
          this.toastr.error(err.error.message, '');
        }
      }
    });
  }
}

