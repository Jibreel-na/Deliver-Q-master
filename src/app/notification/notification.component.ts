import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormBuilder} from '@angular/forms';
import {AppService} from '../app.service';
import {ToastrService} from 'ngx-toastr';
import {PaginationModel} from "../../modules/pagination.model";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";
// import {PaginationModel} from '../../models/pagination.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
filter = new PaginationModel();
  notifications: any[] =[];
  constructor(public restService: DataService,
              private fb: FormBuilder,
              private fuseSplashScreenService: FuseSplashScreenService,
              private appService: AppService,
              private toastr: ToastrService) {

  }



  ngOnInit(): void {
    scrollTo(0,0);
    this.filter.page = 0;
    window.scroll(0 ,0);
    this.fuseSplashScreenService.hide();

  }

}
