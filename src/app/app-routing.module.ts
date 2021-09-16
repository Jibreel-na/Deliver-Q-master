import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from '../guards/login.guard';
import {AuthGuard} from '../guards/auth.guard';
import {MatTableModule} from "@angular/material/table";



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    }
  },
  {
    path: '',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () => import('../modules/about.module').then(m => m.AboutModule),
    data: {
      title: '_AboutUs'
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth.module').then(m => m.AuthModule),
    data: {
      title: '_Auth'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/contact.module').then(m => m.ContactModule),
    data: {
      title: '_ContactUs'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/tracking.module').then(m => m.TrackingModule),
    data: {
      title: '_Tracking'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/privacy.module').then(m => m.PrivacyModule),
    data: {
      title: '_PrivacyPolicy'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/terms-conditions.module').then(m => m.TermsConditionsModule),
    data: {
      title: '_TermsConditions'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/new-shipment2.module').then(m => m.NewShipment2Module),
    data: {
      title: '_NewShipment'
    },
  },
  {
    path: 'account',
    loadChildren: () => import('../modules/account.module').then(m => m.AccountModule),
    data: {
      title: '_MyAccount'
    },
    canActivate: [LoginGuard],

  },
  {
    path: '',
    loadChildren: () => import('../modules/calculator.module').then(m => m.CalculatorModule),
    data: {
      title: '_Calculator'
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/notifications.module').then(m => m.NotificationsModule),
    data: {
      title: '_Notifications'
    },
    canActivate: [LoginGuard],

  },
  {
    path: 'page-404',
    loadChildren: () => import('../modules/page-not-found.module').then(m => m.PageNotFoundModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-404',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled',
    relativeLinkResolution: 'corrected',
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',

  })],
  exports: [
    RouterModule,
    MatTableModule]
})
export class AppRoutingModule {
}
