import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {CityModel} from '../../models/city.model';
import {AppService} from '../../app/app.service';
import {ShipmentModel} from '../../models/Shipment.model';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = true;
  isDone = false;
  secondStep: FormGroup;
  firstStep: FormGroup;
  calculatorForm: FormGroup;
  cost: number;
  from: string;
  to: string;

  constructor(private fb: FormBuilder,
              private restService: DataService,
              public appService: AppService,
              protected toastr: ToastrService,
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

    this.firstStep = this.fb.group({
      from: ['', Validators.required]
    });

    this.secondStep = this.fb.group({
      to: ['', Validators.required]
    });
  }

  reset(){
    this.isDone = false;
    this.calculatorForm.reset();
    this.firstStep.reset();
    this.secondStep.reset();

  }

  calculator() {
    let cost: ShipmentModel = this.calculatorForm.value as ShipmentModel;
    this.restService.calculateCost(cost).then((res) => {
      if (res.category) {
        this.isDone = true;
        this.f.cost.setValue(+res.cost);
      } else {
        this.toastr.error('We are not offer delivery for this area');
      }

      this.f.cost.setValue(+res.cost);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
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

  proceed() {
    this.appService.shipment = this.calculatorForm.value as ShipmentModel;
    this.router.navigateByUrl('/new-shipment');
  }

  ngOnInit(): void {
    this.prepareForm();

  }

}
