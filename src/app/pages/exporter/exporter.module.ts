import { CloseAccountDialogComponent } from './component/profile/close-account-dialog/close-account-dialog.component';
import { AddBankComponent } from './component/profile/add-bank/add-bank.component';
import { ChangeBankComponent } from './component/profile/change-bank/change-bank.component';
import { ChangeAddress2Component } from './component/profile/change-address2/change-address2.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonAppModule } from '@common/common.module';
import { LayoutModule } from '@layout/layout.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExporterComponent } from './exporter.component';
import { ExporterRoutingModule } from './exporter-routing.module';
import { NotificationComponent } from './component/notification/notification.component';
import { ProfileComponent } from './component/profile/profile.component';
import { OrderComponent } from './component/order/order.component';
import { ChangePhoneComponent } from './component/profile/change-phone/change-phone.component';
import { ChangeAddressComponent } from './component/profile/change-address/change-address.component';
import { ChangeNameComponent } from './component/profile/change-name/change-name.component';
import { ChangeEmailComponent } from './component/profile/change-email/change-email.component';
import { ProductComponent } from './component/product/product.component';
import { AddEditProductComponent } from './component/product/add-edit-product/add-edit-product.component';
import { CategoryComponent } from './component/product/category/category.component';
import { PostComponent } from './component/post/post.component';
import { PitchComponent } from './component/pitch/pitch.component';
import { PostDetailComponent } from './component/post/post-detail/post-detail.component';
import { PitchDetailComponent } from './component/pitch/pitch-detail/pitch-detail.component';
import { HistoryComponent } from './component/history/history.component';
import { PromotionComponent } from './component/promotion/promotion.component';
import { DetailPromotionComponent } from './component/promotion/detail-promotion/detail-promotion.component';
import { HistoryPitchComponent } from './component/history-pitch/history-pitch.component';

const Components = [
  DashboardComponent,
  NotificationComponent,
  ProfileComponent,
  OrderComponent
];

@NgModule({
  declarations: [
    ExporterComponent,
    ...Components,
    ChangeEmailComponent,
    ChangePhoneComponent,
    ChangeAddressComponent,
    ChangeNameComponent,
    ChangeAddress2Component,
    ChangeBankComponent,
    AddBankComponent,
    CloseAccountDialogComponent,
    ProductComponent,
    AddEditProductComponent,
    CategoryComponent,
    PostComponent,
    PitchComponent,
    PostDetailComponent,
    PitchDetailComponent,
    HistoryComponent,
    PromotionComponent,
    DetailPromotionComponent,
    HistoryPitchComponent
  ],
  imports: [
    CommonModule,
    ExporterRoutingModule,
    CommonAppModule.forRoot(),
    LayoutModule
  ]
})
export class ExporterModule { }
