import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ChangeMailComponent } from './components/change-mail/change-mail.component';
import { ChangePhoneComponent } from './components/change-phone/change-phone.component';
import { ForgotPaswordComponent } from './components/forgot-pasword/forgot-pasword.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterExporterComponent } from './components/register-exporter/register-exporter.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPaswordComponent },
      { path: 'activated/:userId', component: VerifyEmailComponent },
      { path: 'change-mail/:userId', component: ChangeMailComponent },
      { path: 'change-phone/:userId', component: ChangePhoneComponent },
      { path: 'RegisterExporterComponent', component: RegisterExporterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
