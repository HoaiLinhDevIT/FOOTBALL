import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  public init(): void {
    const domain = (isPlatformServer(this.platformId)) ? 'http://localhost:4200/' : '';

    this.iconRegistry.addSvgIcon('icon-team', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-team.svg'));
    this.iconRegistry.addSvgIcon('icon-help', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-help.svg'));
    this.iconRegistry.addSvgIcon('logo', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/images/logo.svg'));
    this.iconRegistry.addSvgIcon('icon-plus', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/plus.svg'));
    this.iconRegistry.addSvgIcon('icon-export', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/export.svg'));
    this.iconRegistry.addSvgIcon('icon-right', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/angle-right.svg'));
    this.iconRegistry.addSvgIcon('icon-left', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/angle-left.svg'));
    this.iconRegistry.addSvgIcon('icon-delete-red', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-delete-red.svg'));
    this.iconRegistry.addSvgIcon('icon-calendar', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/calendar.svg'));
    this.iconRegistry.addSvgIcon('icon-grid', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/grid.svg'));
    this.iconRegistry.addSvgIcon('icon-close', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/close.svg'));
    this.iconRegistry.addSvgIcon('icon-password', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/lock.svg'));
    this.iconRegistry.addSvgIcon('icon-hidden-password', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/eye-slash.svg'));
    this.iconRegistry.addSvgIcon('icon-show-password', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/eye.svg'));
    this.iconRegistry.addSvgIcon('icon-back', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-back.svg'));
    this.iconRegistry.addSvgIcon('icon-error', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-error.svg'));
    this.iconRegistry.addSvgIcon('icon-notification', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-notification.svg'));
    this.iconRegistry.addSvgIcon('icon-success', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-success.svg'));
    this.iconRegistry.addSvgIcon('icon-registering', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-registering.svg'));
    this.iconRegistry.addSvgIcon('icon-close-dialog', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/close-dialog.svg'));
    this.iconRegistry.addSvgIcon('icon-export-blue', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/export-blue.svg'));
    this.iconRegistry.addSvgIcon('icon-len', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-len.svg'));
    this.iconRegistry.addSvgIcon('icon-show-more', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/show-more.svg'));
    this.iconRegistry.addSvgIcon('icon-delete', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-delete.svg'));
    this.iconRegistry.addSvgIcon('icon-user', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/user.svg'));
    this.iconRegistry.addSvgIcon('icon-user-profile', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-user-profile.svg'));
    this.iconRegistry.addSvgIcon('icon-logout', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-logout.svg'));
    this.iconRegistry.addSvgIcon('icon-logout-hovert', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-logout-hover.svg'));

    this.iconRegistry.addSvgIcon('icon-facebook', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/facebook-f.svg'));
    this.iconRegistry.addSvgIcon('icon-twitter', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/twitter.svg'));
    this.iconRegistry.addSvgIcon('icon-google', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/Google.svg'));
    this.iconRegistry.addSvgIcon('icon-login-logo', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/login-logo.svg'));
    this.iconRegistry.addSvgIcon('icon-role-customer', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/role-customer.svg'));
    this.iconRegistry.addSvgIcon('icon-role-exporter', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/role-exporter.svg'));
    this.iconRegistry.addSvgIcon('homepage-logo', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/homepage-logo.svg'));
    this.iconRegistry.addSvgIcon('homepage-scroll-logo', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/homepage-scroll-logo.svg'));
    this.iconRegistry.addSvgIcon('caret-down-white', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/caret-down-white.svg'));
    this.iconRegistry.addSvgIcon('caret-down-black', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/caret-down-black.svg'));
    this.iconRegistry.addSvgIcon('caret-up', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/caret-up.svg'));
    this.iconRegistry.addSvgIcon('homepage-car', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/homepage-car.svg'));
    this.iconRegistry.addSvgIcon('icon-question', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-question.svg'));
    this.iconRegistry.addSvgIcon('icon-chevron-left', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/chevron-left.svg'));
    this.iconRegistry.addSvgIcon('check-circle', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/check-circle.svg'));
    this.iconRegistry.addSvgIcon('icon-close', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-close.svg'));
    this.iconRegistry.addSvgIcon('icon-down', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-down.svg'));
    this.iconRegistry.addSvgIcon('icon-down-gray', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/angle-down-gray.svg'));
    this.iconRegistry.addSvgIcon('icon-jpy', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-jpy.svg'));
    this.iconRegistry.addSvgIcon('minus-sub', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/minus-sub.svg'));
    this.iconRegistry.addSvgIcon('minus-div', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/minus-div.svg'));
    this.iconRegistry.addSvgIcon('angle-down', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/angle-down.svg'));
    this.iconRegistry.addSvgIcon('dashboard-icon', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/dashboard-icon.svg'));
    this.iconRegistry.addSvgIcon('order-icon', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/order-icon.svg'));
    this.iconRegistry.addSvgIcon('anonymous-logo', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/anonymous-logo.svg'));
    this.iconRegistry.addSvgIcon('icon-alert-success', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-alert-success.svg'));
    this.iconRegistry.addSvgIcon('icon-alert-error', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-alert-error.svg'));

    this.iconRegistry.addSvgIcon('icon-search', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-search.svg'));
    this.iconRegistry.addSvgIcon('icon-camera', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/camera.svg'));
    this.iconRegistry.addSvgIcon('icon-upload', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/cloud-upload-alt.svg'));
    this.iconRegistry.addSvgIcon('icon-alert-confirm', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-alert-confirm.svg'));
    this.iconRegistry.addSvgIcon('icon-setting', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-setting.svg'));
    this.iconRegistry.addSvgIcon('icon-setting-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-setting-hover.svg'));
    this.iconRegistry.addSvgIcon('angle-down_white', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/angle-down_white.svg'));
    this.iconRegistry.addSvgIcon('icon-usd', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-usd.svg'));
    this.iconRegistry.addSvgIcon('icon-kes', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-kes.svg'));
    this.iconRegistry.addSvgIcon('icon-vnd', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-vnd.svg'));
    this.iconRegistry.addSvgIcon('icon-jpy-dropdown', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-jpy-dropdown.svg'));
    this.iconRegistry.addSvgIcon('icon-minus', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-minus.svg'));
    this.iconRegistry.addSvgIcon('icon-div', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-div.svg'));
    this.iconRegistry.addSvgIcon('icon-btn-started', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-btn-started.svg'));
    this.iconRegistry.addSvgIcon('smart-phone', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/smart-phone.svg'));
    this.iconRegistry.addSvgIcon('ms-pesa-icon', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/ms-pesa-icon.svg'));
    this.iconRegistry.addSvgIcon('icon-edit', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-edit.svg'));
    this.iconRegistry.addSvgIcon('icon-delete-op', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-delete-op.svg'));



    this.iconRegistry.addSvgIcon('icon-search-op', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-search-op.svg'));
    this.iconRegistry.addSvgIcon('icon-delete-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-delete-hover'));
    this.iconRegistry.addSvgIcon('icon-edit-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-edit-hover'));
    this.iconRegistry.addSvgIcon('icon-change-pass', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-change-pass.svg'));
    this.iconRegistry.addSvgIcon('exporter-non-notification', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/exporter-non-notification.svg'));
    this.iconRegistry.addSvgIcon('icon-sort', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-sort.svg'));
    this.iconRegistry.addSvgIcon('toast-error', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/toast-error.svg'));
    this.iconRegistry.addSvgIcon('toast-success', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/toast-success.svg'));
    this.iconRegistry.addSvgIcon('icon-bell', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/bell.svg'));

    this.iconRegistry.addSvgIcon('icon-send-message', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-send-message.svg'));
    this.iconRegistry.addSvgIcon('icon-notification', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-notification.svg'));
    this.iconRegistry.addSvgIcon('icon-notification-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-notification-hover.svg'));
    this.iconRegistry.addSvgIcon('icon-menu-mobile', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-menu-mobile.svg'));
    this.iconRegistry.addSvgIcon('icon-reset', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-reset.svg'));
    this.iconRegistry.addSvgIcon('icon-confirmbell', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-confirmbell.svg'));
    this.iconRegistry.addSvgIcon('icon-payment-white', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-payment-white.svg'));
    this.iconRegistry.addSvgIcon('icon-payment-white-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-payment-white-hover.svg'));
    this.iconRegistry.addSvgIcon('icon-payment', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-payment.svg'));
    this.iconRegistry.addSvgIcon('icon-payment-hover', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-payment-hover.svg'));
    this.iconRegistry.addSvgIcon('icon-logo-football', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-logo-football.svg'));
    this.iconRegistry.addSvgIcon('icon-check', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-check.svg'));
    this.iconRegistry.addSvgIcon('icon-send', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-send.svg'));
    this.iconRegistry.addSvgIcon('icon-cart', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-cart.svg'));
    this.iconRegistry.addSvgIcon('icon-user-setting', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/icon-user-setting.svg'));
  }
}
