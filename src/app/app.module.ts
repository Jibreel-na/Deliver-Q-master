import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppTitleService} from './app.title.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorDialogService} from '../providers/error-dialog/errordialog.service';
import {InterceptorProvider} from '../providers/interceptor';
import {MainRestService} from '../shared/services/main.rest';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {JWTService} from '../shared/utils/JWTtoken.service';
import {ConfigService} from '../shared/utils/config.service';
import {AuthGuard} from '../guards/auth.guard';
import {ErrorDialogComponent} from '../providers/error-dialog/errordialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {MessagingService} from "../services/messaging.service";
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { MatButtonModule } from '@angular/material/button';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('179359635059-97oc7uii7dn47i0vbkjt73c649n7lnl4.apps.googleusercontent.com')
  // },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('2566817463608959')
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorDialogComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxShimmerLoadingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule, 
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
      libraries: ['places']
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ErrorDialogService,
    ConfigService,
    AuthGuard,
    JWTService,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    MainRestService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
    AppTitleService,
    MessagingService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
