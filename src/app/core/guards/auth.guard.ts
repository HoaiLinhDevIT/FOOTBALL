import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '@auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = sessionStorage.getItem('id_token');
    const currentUserInfo = sessionStorage.getItem('user_login');
    if (!currentUser || !currentUserInfo) {
      this.router.navigate(['auth/login']);

      return false;
    }

    this.loginService.isLoginAsync$.next(true);

    return true;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
