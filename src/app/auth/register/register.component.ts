import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import {DataService} from '../../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../../_helpers/must-match.validator';
import {Router} from '@angular/router';
import {AppService} from "../../app.service";
import {CategoryModel} from "../../../models/category.model";
import {MapsAPILoader} from "@agm/core";
import {LocationComponent} from "../../dialog/location/location.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  partnerForm: FormGroup;
  codeForm: FormGroup;
  isOTP = false;
  active = 1;
  fileName: string;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public location: string;
  public address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  data: UserModel;
  private geoCoder;
  urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;


  constructor(private fb: FormBuilder,
              private restService: DataService,
              private toastr: ToastrService,
              private ngZone: NgZone,
              private router: Router,
              private dialog: MatDialog,
              public appService: AppService,
              private mapsAPILoader: MapsAPILoader,
  ) {
  }

  get r() {
    return this.registerForm.controls;
  }

  get f() {
    return this.codeForm.controls;
  }

  get p() {
    return this.partnerForm.controls;
  }

  prepareForm() {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      ConfirmPassword: ['', [Validators.required]],
      otp: ['', [Validators.required]],
      role: [''],
      // acceptTerms: ['', Validators.requiredTrue],
    }, {
      validator: MustMatch('password', 'ConfirmPassword')
    });

    this.partnerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      ConfirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      trade_licence: ['', [Validators.required]],
      area: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      otp: ['', [Validators.required]],
      role: [''],


      categoryWithVechiles: [null],
      list_categories: [null, [Validators.required]],
      categories: [null],
      locationText: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
      website: [null, [Validators.required , Validators.pattern(this.urlRegex)]],
      designation: [null, [Validators.required]],
      date_issue_licences: [null, [Validators.required]],
      date_expired_licences: [null, [Validators.required]],
      _id: [null],

      // acceptTerms: ['', Validators.requiredTrue],
    }, {
      validator: MustMatch('password', 'ConfirmPassword')
    });

    this.codeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],

    });
  }

  openMap() {
    const dialogRef = this.dialog.open(LocationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.p.lng.setValue(result.longitude);
        this.p.lat.setValue(result.latitude);
        this.p.locationText.setValue(result.locationText);
        this.p.area.setValue(result.locationText);
      }

    });
  }


  addControl($event, category: CategoryModel) {
    if ($event.source._selected) {
      const fc = new FormControl(null, [Validators.required]);
      this.partnerForm.addControl(category.title, fc);
    } else {
      this.partnerForm.removeControl(category.title);
    }
  }


  selectCategory() {
    let selectedCategories: any[] = [];
    let categoriesIDs: any[] = [];
    let categories = this.p.list_categories.value;
    categories.forEach(cat => {
      let category = this.appService.categories.filter(item => item.title === cat);
      if (category.length) {
        categoriesIDs.push(category[0]._id);
        selectedCategories.push({
          category: category[0]._id,
          countOfVechiles: this.partnerForm.controls[cat].value
        });
      }
    });
    this.p.categoryWithVechiles.setValue(selectedCategories);
    this.p.categories.setValue(categoriesIDs);
  }


  register(roll: string) {
    let userModel: UserModel;
    if (roll === 'user') {
      this.r.role.setValue(roll);
      userModel = this.registerForm.value as UserModel;
    } else {
      this.selectCategory();
      this.p.role.setValue(roll);
      userModel = this.partnerForm.value as UserModel;
    }
    this.restService.register(userModel).then((res) => {
      if(roll === 'user'){
        localStorage.setItem('auth_token_deliver', res.tokens.access.token);
        localStorage.setItem('refresh_token', res.tokens.refresh.token);
        this.appService.isUserLoggedIn.next(res.tokens.access.token);
        this.toastr.success('The account has been created successfully', '');

      }else{
        this.toastr.success(res.message, '');

      }

      this.registerForm.reset();
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.controls[key].setErrors(null);
      });
      let url = localStorage.getItem('url') ? localStorage.getItem('url') : '';
      if (url) {
        this.router.navigateByUrl(url);
        localStorage.removeItem('url');

      } else {
        this.router.navigateByUrl('/');

      }



    }).catch((err: HttpErrorResponse) => {
      this.toastr.error(err.error.message);
      if (err.status) {
        this.toastr.error(err.error.message, '');

      }
    });
  }

  sendOTP() {
    const userModel: UserModel = this.codeForm.value as UserModel;
    this.restService.sendOTP(userModel).then((res) => {
      this.r.email.setValue(userModel.email);
      this.r.phone.setValue(userModel.phone);
      this.p.email.setValue(userModel.email);
      this.p.phone.setValue(userModel.phone);
      this.toastr.success('The verification code has been sent, Please check your mobile.', '');
      this.isOTP = true;

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }





  uploadFile(fileInput) {
    const fileData = <File>fileInput.target.files[0];
    this.fileName = fileData.name;

    const formData = new FormData();
    formData.append('pdf', fileData);
    this.restService.uploadPDF(formData).then((res) => {
      this.p.trade_licence.setValue(res.url);
    }).catch((err: HttpErrorResponse) => {
      if (err) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  ngOnInit(): void {
    this.prepareForm();
  }

}
