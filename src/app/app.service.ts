import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CategoryModel} from '../models/category.model';
import {environment} from '../environments/environment';
import {ShipmentModel} from '../models/Shipment.model';
import {CityModel} from '../models/city.model';
import {TypeModel} from '../models/type.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import {DataService} from "../services/data.service";
import {CounterModel, HomeAboutModel, PartnerModel, TestimonialModel} from "../models/home.model";
import {BannerModel} from "../models/banner.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public language = new BehaviorSubject<string>(null);
  currentLanguage: string;
  categories: CategoryModel[] = [];
  fileUrl = environment.fileUrl;
  shipment: ShipmentModel;
  cities: CityModel[] = [];
  types: TypeModel[] = [];

  counter: CounterModel[] = [];
  calculate: HomeAboutModel;
  about: HomeAboutModel;
  values: HomeAboutModel [] = [];
  partners: PartnerModel[] = [];
  testimonials: TestimonialModel[] = [];
  banner: BannerModel[] = [];

  message;


  public isUserLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  lang: string;

  constructor(private translate: TranslateService ,
              public jwtHelper: JwtHelperService,
              private restService: DataService,) {

    /*** Language Configurations **/
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    const browserLang = localStorage.getItem('language');
    translate.setDefaultLang(browserLang.match(/en|ar/) ? browserLang : 'en');
    this.language.next(browserLang);

    const token = localStorage.getItem('auth_token_deliver') ? this.jwtHelper.decodeToken(localStorage.getItem('auth_token_deliver')).sub : '';
    this.isUserLoggedIn.next(token);
    this.lang = browserLang === 'en' ? 'ltr' : 'rtl';

  }



  /* Switch Language */
  switchLanguage(language: string) {
    location.reload();
    localStorage.setItem('language', language);
    this.language.next(language);
    this.translate.use(language);
  }

}
