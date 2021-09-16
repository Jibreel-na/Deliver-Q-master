import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {CityModel} from "../../models/city.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";
import {ShipmentModel} from "../../models/Shipment.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  from: string;
  to: string;
  calculatorForm: FormGroup;
  cost: number;
  isDone = false;


  constructor(private fb: FormBuilder,
              private restService: DataService,
              public appService: AppService,
              private toaster: ToastrService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private router: Router) {
  }


  get f() {
    return this.calculatorForm.controls;
  }

  prepareForm() {
    this.calculatorForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      subCategory: ['', Validators.required],
      weight: [''],
      other: [''],
      comments: [''],
      cost: [''],
      type: [''],
      category: [''],
      selectedCategory: [''],
    });
  }

  calculator() {
    let cost: ShipmentModel = this.calculatorForm.value as ShipmentModel;
    this.restService.calculateCost(cost).then((res) => {

      if (res.category) {
        this.f.cost.setValue(+res.cost);
        this.isDone = true;
        setTimeout(() => {
          this.scroll();
        }, 20);

      } else {
        this.toaster.error('We are not offer delivery for this area');
      }


    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  scroll() {
    var el = document.getElementById("shipment");
    el.scrollIntoView({behavior: 'smooth'});

  }

  proceed() {
    this.appService.shipment = this.calculatorForm.value as ShipmentModel;
    this.router.navigateByUrl('/new-shipment');
  }

  selectCity(city) {
    if (city === 'from') {
      const from: CityModel[] = this.appService.cities.filter(item => item._id === this.f.from.value);
      if (from.length) {
        this.from = from[0].title;
      }

    } else {
      const to: CityModel[] = this.appService.cities.filter(item => item._id === this.f.to.value);
      if (to.length) {
        this.to = to[0].title;
      }
    }
  }

  ngOnInit(): void {
    this.fuseSplashScreenService.hide();
    this.prepareForm();
    window.scroll(0, 0);
  }

}
