import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonAppModule } from '@common/common.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPaswordComponent } from './components/forgot-pasword/forgot-pasword.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterExporterComponent } from './components/register-exporter/register-exporter.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ChangeMailComponent } from './components/change-mail/change-mail.component';
import { ChangePhoneComponent } from './components/change-phone/change-phone.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPaswordComponent,
    LoginComponent,
    RegisterComponent,
    RegisterExporterComponent,
    RegisterExporterComponent,
    VerifyEmailComponent,
    RegisterExporterComponent,
    ChangeMailComponent,
    ChangePhoneComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonAppModule.forRoot(),
    NgxFileDropModule,
    NgOtpInputModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }
