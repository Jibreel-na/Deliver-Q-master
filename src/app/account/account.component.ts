import { Component, OnInit } from '@angular/core';
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor( private fuseSplashScreenService: FuseSplashScreenService,) { }

  ngOnInit(): void {
    window.scroll(0 ,0);
    this.fuseSplashScreenService.hide();
  }

}
