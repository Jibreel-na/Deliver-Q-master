import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {Meta} from '@angular/platform-browser';
import {AppTitleService} from './app.title.service';
import {DOCUMENT} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../services/data.service';
import {MessagingService} from "../services/messaging.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public appService: AppService,
              private restService: DataService,
              // public metaService: MetaHandlerService,
              @Inject(DOCUMENT) private document: Document,
              private messagingService: MessagingService,
              private metaTagService: Meta,
              public jwtHelper: JwtHelperService,
              private appTitle: AppTitleService) {

    /*** App Title */
    this.appTitle.init();

  }

  getCategories() {
    this.restService.getCategories().then((res) => {
      this.appService.categories = res.results;

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  getTypes() {
    this.restService.getType().then((res) => {
      this.appService.types = res.results;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  getCities() {
    this.restService.getCities().then((res) => {
      this.appService.cities = res.results;

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }





  ngOnInit() {
    // this.metaService.setDefaultMeta();
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage;
    const token = localStorage.getItem('auth_token_deliver') ? this.jwtHelper.decodeToken(localStorage.getItem('auth_token_deliver')).sub : '';
    if (token) {
      this.restService.getNotifications(0);
    }
    /*** Language Subscription **/
    this.appService.language.subscribe(language => {
      this.appService.currentLanguage = language === 'en' ? 'en' : 'ar';
      switch (language) {
        case ('en') :
          this.document.documentElement.setAttribute('lang', 'en');
          break;
        case ('ar') :
          this.document.documentElement.setAttribute('lang', 'ar');
          break;
      }
    });

    this.getCategories();
    this.getTypes();
    this.getCities();

    /*** Meta Tags **/
    this.metaTagService.addTags([
      {name: 'keywords', content: ''},
      {name: 'author', content: ''},
      {name: 'image', content: ''},
      {
        name: 'description',
        content: ''
      },
      {name: 'date', content: new Date().toString(), scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'}
    ]);
  }
}
