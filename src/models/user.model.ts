import {CityModel} from "./city.model";
import {CategoryModel} from "./category.model";

export interface UserModel {
  email: string;
  mobile: string;
  password: string;
  ConfirmPassword: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  company_name?: string;
  city?: string;
  area?: string;
  trade_licence?: string;
  type?: number;
  lng: string;
  lat: string;
  locationText: string;
  website: string;
  designation: string;
  date_issue_licences: string;
  date_expired_licences: string;
  categoryWithVechiles: any[];
  active: number;
  cityObj?: CityModel;
  _id: string;
  currentPassword: string;
  categories: CategoryModel[];


}


export  class TokenModel{
  refreshToken: string;
}

