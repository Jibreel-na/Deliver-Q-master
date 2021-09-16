import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {AppService} from "../app.service";
import {ContentModel} from "../../models/content.model";
import {ToastrService} from "ngx-toastr";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  content: ContentModel;
  public dummyElem = document.createElement('DIV');

  constructor(private restService: DataService,
              private toastr: ToastrService,
              private fuseSplashScreenService: FuseSplashScreenService,
              public appService: AppService) {
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
    this.getContent(3);
  }


}
