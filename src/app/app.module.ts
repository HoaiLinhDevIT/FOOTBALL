import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { AngularFireModule } from '@angular/fire/compat';
import { CommonAppModule } from '@common/common.module';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TroubleLoggingComponent } from './pages/trouble-logging/trouble-logging.component';
import { DialogEmailUsComponent } from './pages/trouble-logging/dialog-help/dialog-email-us/dialog-email-us.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DialogConfirmComponent } from './pages/trouble-logging/dialog-help/dialog-confirm/dialog-confirm.component';
import { EmailVertificationComponent } from './pages/trouble-logging/dialog-help/email-vertification/email-vertification.component';
import { TestChatboxComponent } from './pages/test-chatbox/test-chatbox.component';
import { ProductDetailComponent } from './pages/homepage/product-detail/product-detail.component';
import { PaymentComponent } from './pages/homepage/payment/payment.component';
import { ProductComponent } from './pages/homepage/product/product.component';
import { TutorialSizeComponent } from './pages/homepage/tutorial-size/tutorial-size.component';
import { NewsComponent } from './pages/homepage/news/news.component';
import { PitchComponent } from './pages/homepage/pitch/pitch.component';
import { PitchDetailComponent } from './pages/homepage/pitch/pitch-detail/pitch-detail.component';
import { CartComponent } from './pages/homepage/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TroubleLoggingComponent,
    DialogEmailUsComponent,
    DialogConfirmComponent,
    EmailVertificationComponent,
    TestChatboxComponent,
    ProductDetailComponent,
    PaymentComponent,
    ProductComponent,
    TutorialSizeComponent,
    NewsComponent,
    PitchComponent,
    PitchDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxCaptchaModule,
    AuthModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // App core, common & dependency modules
    CoreModule.forRoot(),
    CommonAppModule.forRoot(),
    LayoutModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('904322117554-75io6l47m4b8d5vfn3ep2ps72n9eg3lc.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2199606013539210')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
