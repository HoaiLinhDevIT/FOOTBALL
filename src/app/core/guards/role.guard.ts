/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RolesModel } from '@common/models';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Localization } from '..';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  public defaultLanguage: string = environment.localization.defaultLanguage;
  public supportedLanguages: Array<string> = [];
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    if (route.data?.['roles'].filter((x: string) => x === userLogin.roles[0].role).length < 1) {
      switch (userLogin.roles[0].role) {
        case RolesModel.SYSTEM:
          this.setLanguage('en');
          this.router.navigate(['system/operator']);
          break;
        case RolesModel.ADMIN:
          this.setLanguage('en');
          this.router.navigate(['admin/buyer']);
          break;
        case RolesModel.USER:
          this.setLanguage('en');
          this.router.navigate(['/customer/order']);
          break;
        case RolesModel.EXPORTER:
          this.setLanguage('en');
          this.router.navigate(['exporter/order']);
          break;
      }
      return false;
    }
    // check languagle
    switch (userLogin.roles[0].role) {
      case RolesModel.SYSTEM:
        this.setLanguage('en');
        break;
      case RolesModel.ADMIN:
        this.setLanguage('en');
        break;
      case RolesModel.USER:
        this.setLanguage('en');
        break;
      case RolesModel.EXPORTER:
        this.setLanguage('en');
        break;
    }

    return true;
  }

  private setLanguage(lang: string): void {
    const localization: Localization = environment.localization;
    const languages: Array<string> = localization.languages.map((lang) => lang.code);
    this.supportedLanguages = languages;
    this.defaultLanguage = localization.defaultLanguage;
    this.translateService.addLangs(languages);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }
}
