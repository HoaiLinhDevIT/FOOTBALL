import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonAppModule } from '@common/common.module';
import { LayoutModule } from '@layout/layout.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NotificationComponent } from './component/notification/notification.component';
import { CloseAccountDialogComponent } from './component/profile/close-account-dialog/close-account-dialog.component';
import { ChangeEmailComponent } from './component/profile/change-email/change-email.component';
import { ChangePhoneComponent } from './component/profile/change-phone/change-phone.component';
import { ChangeNameComponent } from './component/profile/change-name/change-name.component';
import { ChangeAddressComponent } from './component/profile/change-address/change-address.component';

const Components = [
  DashboardComponent,
  OrderComponent,
  ProfileComponent,
  NotificationComponent
];

@NgModule({
  declarations: [
    CustomerComponent,
    ...Components,
    OrderComponent,
    ProfileComponent,
    NotificationComponent,
    CloseAccountDialogComponent,
    ChangeEmailComponent,
    ChangePhoneComponent,
    ChangeNameComponent,
    ChangeAddressComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CommonAppModule.forRoot(),
    LayoutModule
  ]
})
export class CustomerModule { }
