import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {AppService} from "../app.service";
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subscribeForm: FormGroup;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    focusOnSelect: true,
    autoplaySpeed: 2000,
    dots: true,
  };


  constructor(public restService: DataService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              public appService: AppService) {
  }


  get d() {
    return this.subscribeForm.controls;
  }


  prepareForm() {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  getHomeContent() {
    this.restService.getHomeContent().then((res) => {
      this.appService.counter = res.counters.results;
      this.appService.about = res.home_contents.results.filter(item => item.type === 1)[0];
      this.appService.values = res.home_contents.results.filter(item => item.type === 2);
      this.appService.calculate = res.home_contents.results.filter(item => item.type === 3)[0];

      this.appService.partners = res.partners.results;
      this.appService.testimonials = res.testimonials.results;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  subscribe() {
    let user: UserModel = this.subscribeForm.value as UserModel;
    this.restService.subscribe(user).then((res) => {

      this.toaster.success('Thank you for subscribing, we will email you our latest news.' , '');


    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  ngOnInit(): void {
    this.prepareForm();
    this.getHomeContent();
    window.scroll(0, 0);
  }

}
