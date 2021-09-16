import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatDialog} from '@angular/material/dialog';
import {AppService} from "../app.service";
import {ContentModel} from "../../models/content.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  content: ContentModel;
  public dummyElem = document.createElement('DIV');

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    private fuseSplashScreenService: FuseSplashScreenService,
    private toastr: ToastrService,
    private restService: DataService) {

  }

  decode(text: string): string {
    var ret:string = "";

    this.dummyElem.innerHTML = text;
    document.body.appendChild(this.dummyElem);
    ret = this.dummyElem.textContent; // just grap the decoded string which contains the desired HTML tags
    document.body.removeChild(this.dummyElem);

    return ret;
  }

  getContent(id) {
    this.restService.getContent(id).then((res) => {
      this.content = res;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  ngOnInit(): void {
    window.scroll(0, 0);
    this.fuseSplashScreenService.hide();
    this.getContent(2);
  }


}
