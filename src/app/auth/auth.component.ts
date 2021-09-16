import { Component, OnInit } from '@angular/core';
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private fuseSplashScreenService: FuseSplashScreenService,) { }

  ngOnInit(): void {
    scrollTo(0,0);

    this.fuseSplashScreenService.hide();
    window.scroll(0 ,0);
  }

}
