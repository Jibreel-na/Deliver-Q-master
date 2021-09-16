import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment';
import {TokenModel, UserModel} from '../models/user.model';
import {AddressModel} from '../models/address.model';
import {ContactModel} from '../models/contact.model';
import {ShipmentGuestModel, ShipmentModel} from "../models/Shipment.model";
import {PaginationModel} from "../modules/pagination.model";
import {BehaviorSubject} from "rxjs";
import {NotificationModel} from "../models/notification.model";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  baseUrl = '';
  progressCount = 0;
  data: any[];
  notifications: NotificationModel[] = [];
  allNotifications: NotificationModel[] = [];
  public notificationCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  notifyCount = 0;

  constructor(public httpClient: HttpClient,
              private ngZone: NgZone,
              private toastr: ToastrService
  ) {
    super(httpClient);

    this.baseUrl = environment.apiURI;
    this.currentProgress.subscribe((progress: string) => {
      this.ngZone.run(() => {
        this.progressCount = Number(progress);
      });
    });
  }
  getTypes() {
    return this.restRequest(null, `${this.baseUrl}/type?isPagination=false`, null, 'GET');
  }

  logout() {
    localStorage.removeItem('auth_token_deliver');
    localStorage.removeItem('refresh_token');
    window.location.href = '/auth/login';
  }

  login(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/login`, null, type);
  }

  register(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/register`, null, type);
  }

  addAddress(model: AddressModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/address`, null, type);
  }

  refreshToken(model: TokenModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/refresh-tokens`, null, type);
  }

  createShipment(model: ShipmentModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/shipments`, null, type);
  }

  createShipmentGuest(model: ShipmentGuestModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/shipments/guest`, null, type);
  }

  sendOTPGuest(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/shipments/guest/otpSend`, null, type);
  }

  sendMessage(model: ContactModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/request`, null, type);
  }

  sendOTP(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/otpSend`, null, type);
  }

  sendOTPWithOutCheck(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/otpSendWithoutCheck`, null, type);
  }

  getAdvantage() {
    return this.restRequest(null, `${this.baseUrl}/advantage`, null, 'GET');
  }

  calculateCost(model: ShipmentModel) {
    return this.restRequest(null, `${this.baseUrl}/cost?from=${model.from}&to=${model.to}&category=${model.category}`, null, 'GET');
  }

  getCities() {
    return this.restRequest(null, `${this.baseUrl}/city`, null, 'GET');
  }

  getCategories() {
    return this.restRequest(null, `${this.baseUrl}/category`, null, 'GET');
  }

  getBanner() {
    return this.restRequest(null, `${this.baseUrl}/banners`, null, 'GET');
  }

  getHomeContent() {
    return this.restRequest(null, `${this.baseUrl}/deliveryq/website/home`, null, 'GET');
  }

  getShipmentByID(id: string) {
    return this.restRequest(null, `${this.baseUrl}/shipments/${id}`, null, 'GET');
  }

  getShipmentByTag(id: string) {
    return this.restRequest(null, `${this.baseUrl}/shipments/tag/${id}`, null, 'GET');
  }

  getShipments(model: PaginationModel) {
    return this.restRequest(null, `${this.baseUrl}/shipments?isPagination=true&limit=${model.limit}&page=${model.page}`, null, 'GET');
  }

  getType() {
    return this.restRequest(null, `${this.baseUrl}/type`, null, 'GET');
  }

  getAddress() {
    return this.restRequest(null, `${this.baseUrl}/address`, null, 'GET');
  }

  getProfile() {
    return this.restRequest(null, `${this.baseUrl}/users/profile`, null, 'GET');
  }

  getAddresses(model: PaginationModel) {
    return this.restRequest(model, `${this.baseUrl}/address?isPagination=true&limit=${model.limit}&page=${model.page}`, null, 'GET');
  }

  updateAddress(model: AddressModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/address/${model._id}`, null, type);
  }

  updateProfile(model: UserModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/users/profile`, null, type);
  }

  updateFCM(model: PaginationModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/users/fcm`, null, type);
  }

  uploadFile(formData: FormData, type: string = 'POST') {
    return this.restRequest(null, `${this.baseUrl}/file/image`, null, type, false, formData);
  }

  updatePassword(model: UserModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/users/updatePassword`, null, type);
  }

  updateUserNotification(model: NotificationModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/notificaitons/read/${model._id}`, null, type);
  }

  resetPassword(model: UserModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/auth/change-password-otp`, null, type);
  }

  forgetPassword(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/otpSend`, null, type);
  }

  subscribe(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/subscribers`, null, type);
  }

  getNotificationsUser(page) {
    return this.restRequest(null, `${this.baseUrl}/notificaitons?isPagination=true&page=${page}&limit=20`, null, 'GET');
  }

  deleteAddress(id, type: string = 'DELETE') {
    return this.restRequest(null, `${this.baseUrl}/address/${id}`, null, type, null);
  }

  getContent(type) {
    return this.restRequest(null, `${this.baseUrl}/content/type/${type}`, null, 'GET');
  }

  uploadPDF(formdata: FormData, type: string = 'POST') {
    return this.restRequest(null, `${this.baseUrl}/file/pdf`, null, type, false, formdata);
  }


  refreshTokenUser() {
    const token = new TokenModel();
    token.refreshToken = localStorage.getItem('refresh_token');

    this.refreshToken(token).then((res) => {
      localStorage.setItem('auth_token_deliver', res.access.token);
      localStorage.setItem('refresh_token', res.refresh.token);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message, '');
      }
    });
  }


  getNotifications(page) {
    this.getNotificationsUser(page).then((res) => {
      this.notifications = res.results;
      if (page === 0) {
        this.allNotifications = res.results;
        this.notifications.forEach(item => {
          if (item.read === 0) {
            this.notifyCount += 1;
          }
        });
      } else {
        this.notifications.forEach(item => {
          this.allNotifications.push(item);
          if (item.read === 0) {
            this.notifyCount += 1;
          }
        });
      }
      this.notificationCount.next(this.notifyCount);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }


  updateNotification(data: NotificationModel) {
    let count: number;
    if (data.read === 0) {
      data.read = 1;
      this.notificationCount.subscribe(value => {
        count = value;
      });
      this.updateUserNotification(data).then((res) => {
        if (res.code === 200) {
          this.notificationCount.next(count - 1);
        } else {
          this.toastr.error(res.message, '');
        }
      }).catch((err: HttpErrorResponse) => {

      });
    }
  }


}
