import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService ) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token_deliver') ?  this.jwtHelper.decodeToken(localStorage.getItem('auth_token_deliver')).sub : '' ;
    if (token){
      return true;
    }
    return false;
  }
}
