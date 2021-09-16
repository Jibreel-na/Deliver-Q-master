import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "../app/notification/notification.component";
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

const routes: Routes = [
  {
    path: 'notifications', component: NotificationComponent,
  }
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    InfiniteScrollModule,
  ]
})
export class NotificationsModule { }
