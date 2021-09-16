import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {AppService} from '../../app/app.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  trackingForm: FormGroup;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    focusOnSelect: true,
    autoplaySpeed: 2000,
    dots: true,
  };

  constructor(private restService: DataService,
              public appService: AppService,
              private fb: FormBuilder,
              private router: Router,
              private fuseSplashScreenService: FuseSplashScreenService,
              private toastr: ToastrService) {
  }


  get f() {
    return this.trackingForm.controls;
  }


  getShipment() {
    this.restService.getShipmentByTag(this.f.tag.value).then((res) => {
      this.router.navigateByUrl('/tracking/' + this.f.tag.value);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message)
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  getBanner() {
    this.restService.getBanner().then((res) => {
      this.appService.banner = res.results;
      setTimeout(() => {
        this.fuseSplashScreenService.hide();
      }, 1000);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  prepareForm() {
    this.trackingForm = this.fb.group({
      tag: ['']
    });

  }

  ngOnInit(): void {
    if (this.appService.banner.length === 0) {
      // this.fuseSplashScreenService.show();
    }
    this.prepareForm();
    this.getBanner();

  }


}
